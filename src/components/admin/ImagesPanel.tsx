import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  ImageIcon, 
  Check, 
  ExternalLink, 
  Copy, 
  Trash2, 
  Star,
  X,
  AlertCircle,
  GripVertical
} from "lucide-react";
import { imagesApi, LibraryItem, UploadedImage } from "@/lib/imagesApi";

interface ImagesPanelProps {
  selectedImages: string[];
  coverImage?: string;
  onImagesChange: (images: string[]) => void;
  onCoverImageChange: (coverImage: string) => void;
}

const ImagesPanel = ({ 
  selectedImages, 
  coverImage, 
  onImagesChange, 
  onCoverImageChange 
}: ImagesPanelProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [libraryImages, setLibraryImages] = useState<LibraryItem[]>([]);
  const [selectedLibraryItems, setSelectedLibraryItems] = useState<string[]>([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const hasApiKey = imagesApi.hasApiKey();

  useEffect(() => {
    loadLibraryImages();
  }, []);

  const loadLibraryImages = async () => {
    setIsLoadingLibrary(true);
    try {
      const images = await imagesApi.list();
      setLibraryImages(images);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load image library",
        variant: "destructive"
      });
    } finally {
      setIsLoadingLibrary(false);
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const fileArray = Array.from(files);
    uploadFiles(fileArray);
  };

  const uploadFiles = async (files: File[]) => {
    setIsUploading(true);
    
    // Initialize progress tracking
    const progressMap: { [key: string]: number } = {};
    files.forEach(file => {
      progressMap[file.name] = 0;
    });
    setUploadProgress(progressMap);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(fileName => {
            if (updated[fileName] < 90) {
              updated[fileName] = Math.min(90, updated[fileName] + Math.random() * 30);
            }
          });
          return updated;
        });
      }, 200);

      const uploadedImages = await imagesApi.upload(files);
      
      clearInterval(progressInterval);
      
      // Complete progress
      setUploadProgress(prev => {
        const completed = { ...prev };
        Object.keys(completed).forEach(key => {
          completed[key] = 100;
        });
        return completed;
      });

      toast({
        title: "Upload successful",
        description: `${uploadedImages.length} image(s) uploaded successfully`
      });

      // Refresh library
      await loadLibraryImages();
      
      // Clear progress after delay
      setTimeout(() => {
        setUploadProgress({});
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload images",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleLibraryItemClick = (imageId: string) => {
    setSelectedLibraryItems(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      }
      return [...prev, imageId];
    });
  };

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "URL copied",
        description: "Image URL copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy URL to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleDeleteImage = async (image: LibraryItem) => {
    try {
      await imagesApi.remove(image.folder, image.name);
      toast({
        title: "Image deleted",
        description: "Image removed from library"
      });
      await loadLibraryImages();
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete image",
        variant: "destructive"
      });
    }
  };

  const handleSetCover = () => {
    if (selectedLibraryItems.length === 1) {
      const selectedImage = libraryImages.find(img => img.id === selectedLibraryItems[0]);
      if (selectedImage) {
        onCoverImageChange(selectedImage.url);
        toast({
          title: "Cover image set",
          description: "Cover image updated successfully"
        });
      }
    }
  };

  const handleAddToListing = () => {
    const selectedUrls = selectedLibraryItems.map(id => {
      const image = libraryImages.find(img => img.id === id);
      return image?.url;
    }).filter(Boolean) as string[];
    
    const newImages = [...selectedImages];
    selectedUrls.forEach(url => {
      if (!newImages.includes(url)) {
        newImages.push(url);
      }
    });
    
    onImagesChange(newImages);
    setSelectedLibraryItems([]);
    
    toast({
      title: "Images added",
      description: `${selectedUrls.length} image(s) added to listing`
    });
  };

  const handleRemoveFromListing = (url: string) => {
    const newImages = selectedImages.filter(img => img !== url);
    onImagesChange(newImages);
    
    if (coverImage === url) {
      onCoverImageChange("");
    }
  };

  const handleSetAsCover = (url: string) => {
    onCoverImageChange(url);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Property Images
        </CardTitle>
        <CardDescription>
          Upload new images or select from your library
          {hasApiKey && (
            <span className="block text-xs text-muted-foreground mt-1">
              ✓ Using BP_API_KEY from localStorage
            </span>
          )}
          {!hasApiKey && (
            <span className="flex items-center gap-1 text-xs text-amber-600 mt-1">
              <AlertCircle className="h-3 w-3" />
              No API key set in localStorage
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="library">Select from Library</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver 
                  ? "border-primary bg-primary/10" 
                  : "border-muted-foreground/25 hover:border-muted-foreground/50"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">
                Drag & drop images here
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to select files
              </p>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                Choose Files
              </Button>
              <Input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
            </div>

            {/* Upload Progress */}
            {Object.keys(uploadProgress).length > 0 && (
              <div className="space-y-2">
                <Label>Upload Progress</Label>
                {Object.entries(uploadProgress).map(([fileName, progress]) => (
                  <div key={fileName} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="truncate">{fileName}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="library" className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Image Library</Label>
              <div className="flex gap-2">
                {selectedLibraryItems.length === 1 && (
                  <Button variant="outline" size="sm" onClick={handleSetCover}>
                    <Star className="h-4 w-4 mr-1" />
                    Set Cover
                  </Button>
                )}
                {selectedLibraryItems.length > 0 && (
                  <Button size="sm" onClick={handleAddToListing}>
                    Add Selected ({selectedLibraryItems.length})
                  </Button>
                )}
              </div>
            </div>
            
            {isLoadingLibrary ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-muted rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {libraryImages.map((image) => (
                  <div
                    key={image.id}
                    className={`relative group cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                      selectedLibraryItems.includes(image.id)
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleLibraryItemClick(image.id)}
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full aspect-square object-cover"
                    />
                    
                    {/* Selection indicator */}
                    {selectedLibraryItems.includes(image.id) && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      </div>
                    )}
                    
                    {/* Action buttons */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(image.url, '_blank');
                        }}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyUrl(image.url);
                        }}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(image);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    {/* Image name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                      {image.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Selected Images Strip */}
        {selectedImages.length > 0 && (
          <div className="mt-6 space-y-3">
            <Label>Selected Images for This Listing</Label>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {selectedImages.map((url, index) => (
                <div key={url} className="relative group">
                  <img
                    src={url}
                    alt={`Selected ${index + 1}`}
                    className="w-full aspect-square object-cover rounded border"
                  />
                  
                  {/* Cover indicator */}
                  {coverImage === url && (
                    <div className="absolute top-1 left-1 bg-yellow-500 text-white rounded p-1">
                      <Star className="h-3 w-3 fill-current" />
                    </div>
                  )}
                  
                  {/* Action buttons */}
                  <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {coverImage !== url && (
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleSetAsCover(url)}
                      >
                        <Star className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleRemoveFromListing(url)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  {/* Drag handle */}
                  <div className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="h-4 w-4 text-white drop-shadow" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImagesPanel;
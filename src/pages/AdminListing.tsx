import { ListingsAPI, type Listing } from "@/lib/listingsApi";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Minus, Loader2 } from "lucide-react";
import ImagesPanel from "@/components/admin/ImagesPanel";



const AdminListing = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [listingId, setListingId] = useState<string | undefined>(id);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [propertyType, setPropertyType] = useState("");
  const [propertyCategory, setPropertyCategory] = useState("");
  const [status, setStatus] = useState("for-sale");
  const [isFeatured, setIsFeatured] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  // Load existing listing data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      loadListing(id);
    }
  }, [id, isEditMode]);
  
  const loadListing = async (listingId: string) => {
    try {
      setIsLoading(true);
      // Get all listings and find the one we need
      const response = await ListingsAPI.getAll();
      const listing = response.listings.find(l => l.id === listingId);
      
      if (!listing) {
        toast({
          title: "Error",
          description: "Listing not found",
          variant: "destructive",
        });
        navigate('/admin/listings');
        return;
      }
      
      // Populate form fields
      setTitle(listing.title || "");
      setPrice(listing.price ? listing.price.toString() : "");
      setAddress(listing.address || "");
      setCity(listing.city || "");
      setState(listing.state || "");
      setBedrooms(listing.bedrooms || 1);
      setBathrooms(listing.bathrooms || 1);
      setPropertyType(listing.propertyType || "");
      setPropertyCategory(listing.propertyCategory || "");
      setStatus(listing.status || "for-sale");
      setIsFeatured(listing.isFeatured || false);
      setFeatures(listing.features || []);
      setCoverImageUrl(listing.coverImage || null);
      
      // Handle gallery images
      if (listing.gallery && Array.isArray(listing.gallery)) {
        const imageUrls = listing.gallery.map(img => 
          typeof img === 'string' ? img : img.url
        ).filter(Boolean);
        setSelectedImages(imageUrls);
      }
      
    } catch (error: any) {
      console.error("Error loading listing:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to load listing",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatPrice = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    if (numericValue) {
      return `RM ${parseInt(numericValue).toLocaleString()}`;
    }
    return value;
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
  };

  const handlePriceBlur = () => {
    setPrice(formatPrice(price));
  };

  const handleImagesChange = (images: string[]) => {
    setSelectedImages(images);
  };

  const handleCoverImageChange = (coverImage: string) => {
    setCoverImageUrl(coverImage);
  };

const handleSave = async () => {
  try {
    setIsSaving(true);

    // 1) basic validation
    if (!title.trim()) {
      toast({ title: "Validation Error", description: "Title is required", variant: "destructive" });
      return;
    }

    // 2) Use existing ID if editing, generate new one if creating
    const finalId = listingId || `ls_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    const slug = (title || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // 3) numeric cleanups
    const priceNum = Number(String(price ?? "").replace(/[^\d.]/g, "")) || 0;

    // 3.1) Make sure a cover image is set
    const coverUrl = coverImageUrl ?? selectedImages[0] ?? null;
    
    // 4) payload for database API
    const payload: Listing = {
      id: finalId, // Include ID for updates
      title: title.trim(),
      price: priceNum,
      currency: "RM",
      address,
      city,
      state,
      bedrooms,
      bathrooms,
      sizeSqft: null,
      propertyType,
      propertyCategory,
      status,
      listingStatus: "active",
      coverImage: coverUrl,
      gallery: selectedImages.map((url) => ({ url })),
      features,
      isFeatured: isFeatured,
    };
    
    // 5) call the database API
    const res = await ListingsAPI.save(payload);

    toast({
      title: isEditMode ? "Listing updated!" : "Listing created!",
      description: isEditMode 
        ? "Your property listing has been successfully updated."
        : "Your property listing has been successfully created.",
    });
    
    // Navigate back to listings page
    setTimeout(() => {
      navigate('/admin/listings');
    }, 1000);

  } catch (e: any) {
    console.error(e);
    toast({ title: "Save failed", description: e.message || String(e), variant: "destructive" });
  } finally {
    setIsSaving(false);
  }
};


  const canSave = title.trim().length > 0;

  // Show loading state while fetching listing data
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading listing...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? 'Edit Property Listing' : 'Create New Property Listing'}</CardTitle>
          <CardDescription>
            {isEditMode 
              ? 'Update the property details below.'
              : 'Fill in the property details below to create a new listing.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Beautiful 3-bedroom house in prime location"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="text"
                  value={price}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  onBlur={handlePriceBlur}
                  placeholder="850000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyCategory">Property Category</Label>
                <Select value={propertyCategory} onValueChange={setPropertyCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-story">Single Story</SelectItem>
                    <SelectItem value="double-story">Double Story</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="bungalow">Bungalow</SelectItem>
                    <SelectItem value="semi-d">Semi-Detached</SelectItem>
                    <SelectItem value="terrace">Terrace</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Kuala Lumpur"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Selangor"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <div className="flex items-center space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{bedrooms}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setBedrooms(bedrooms + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bathrooms</Label>
                <div className="flex items-center space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{bathrooms}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setBathrooms(bathrooms + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="for-sale">For Sale</SelectItem>
                    <SelectItem value="for-rent">For Rent</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
              <Checkbox 
                id="featured" 
                checked={isFeatured}
                onCheckedChange={(checked) => setIsFeatured(checked as boolean)}
              />
              <div className="flex-1">
                <Label 
                  htmlFor="featured" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Mark as Featured Property
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Featured properties will be displayed prominently on the homepage
                </p>
              </div>
            </div>

            {/* Images Panel */}
          <ImagesPanel
            selected={selectedImages}
            onChange={setSelectedImages}   // <-- pass the setter directly
            cover={coverImageUrl}
            onCoverChange={setCoverImageUrl}
          />



            <div className="pt-4">
              <Button onClick={handleSave} disabled={isSaving || !canSave}>
                {isSaving ? "Saving..." : isEditMode ? "Update Listing" : "Create Listing"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminListing;

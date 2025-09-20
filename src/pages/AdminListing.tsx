import { saveListing } from "@/lib/listingsApi";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Minus } from "lucide-react";
import ImagesPanel from "@/components/admin/ImagesPanel";



const AdminListing = () => {
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
  const [status, setStatus] = useState("");
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
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
    setIsSaving(true);  // use the isSaving flag you already have

    // 1) basic validation
    if (!title.trim()) {
      toast({ title: "Validation Error", description: "Title is required", variant: "destructive" });
      return;
    }

    // 2) id + slug
    const id = `ls_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    const slug = (title || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // 3) numeric cleanups
    const priceNum = Number(String(price ?? "").replace(/[^\d.]/g, "")) || 0;

    // 4) payload expected by PHP
    const payload = {
      id,
      slug,
      title: title.trim(),
      summary: "",
      status: "published",                // publish so it appears in index.json
      price: priceNum,
      currency: "RM",
      address,
      city,
      state,
      bedrooms,
      bathrooms,
      sizeSqft: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      cover: coverImageUrl ? { url: coverImageUrl } : undefined,
      gallery: selectedImages.map((url) => ({ url })),
    };

    // 5) call the real API
    const res = await saveListing(payload);

    toast({
      title: "Listing saved!",
      description: "Your property listing has been successfully saved.",
    });

  } catch (e: any) {
    console.error(e);
    toast({ title: "Save failed", description: e.message || String(e), variant: "destructive" });
  } finally {
    setIsSaving(false);
  }
};


  const canSave = title.trim().length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Property Listing</CardTitle>
          <CardDescription>
            Fill in the property details below to create a new listing.
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
                <Label htmlFor="propertyType">Property Type</Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
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

            {/* Images Panel */}
          <ImagesPanel
            selected={selectedImages}
            onChange={setSelectedImages}   // <-- pass the setter directly
            cover={coverImageUrl}
            onCoverChange={setCoverImageUrl}
          />



            <div className="pt-4">
              <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Listing"}
              </Button>

            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminListing;

import { useState, useEffect } from "react";
import { getPageSettings } from "@/lib/pageSettings";
import { ListingsAPI } from "@/lib/listingsApi";
import UnderConstruction from "@/components/UnderConstruction";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PropertyCard from "@/components/PropertyCard";
import { Search, Filter, Grid, List, Loader2 } from "lucide-react";

const Properties = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getPageSettings();
      setIsEnabled(settings.listings);
    };
    loadSettings();
  }, []);
  
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setIsLoading(true);
        console.log('[Properties] Fetching listings from API...');
        const response = await ListingsAPI.getPublic();
        console.log('[Properties] API Response:', response);
        console.log('[Properties] Total listings:', response.listings?.length);
        
        // Transform API data to match PropertyCard props
        const transformedProperties = response.listings.map((listing: any) => ({
          id: listing.id,
          title: listing.title,
          price: `${listing.currency || 'RM'} ${listing.price?.toLocaleString() || '0'}`,
          location: listing.city && listing.state ? `${listing.city}, ${listing.state}` : listing.city || listing.state || 'Location not specified',
          beds: listing.bedrooms || 0,
          baths: listing.bathrooms || 0,
          sqft: listing.sizeSqft || 0,
          image: listing.coverImage || '/placeholder-property.jpg',
          status: (listing.status === 'for-sale' ? 'For Sale' : listing.status === 'for-rent' ? 'For Rent' : 'Sold') as 'For Sale' | 'For Rent' | 'Sold',
          featured: listing.isFeatured || false,
        }));
        
        setProperties(transformedProperties);
      } catch (error) {
        console.error('Error loading properties:', error);
        setProperties([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isEnabled) {
      loadProperties();
    }
  }, [isEnabled]);

  if (!isEnabled) {
    return (
      <UnderConstruction
        pageName="Property Listings"
        description="We're currently updating our property portfolio. Our stunning collection of premium properties will be available soon!"
      />
    );
  }

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section - Standardized */}
      <PageHero
        badge="Property Listings"
        title="Hartanah Istimewa Menanti"
        description="Temui pilihan hartanah premium kami yang dipilih khas di lokasi-lokasi yang paling diingini."
      />

      {/* Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="500k-750k">$500K - $750K</SelectItem>
                  <SelectItem value="750k-1m">$750K - $1M</SelectItem>
                  <SelectItem value="1m-2m">$1M - $2M</SelectItem>
                  <SelectItem value="2m+">$2M+</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">
                {filteredProperties.length} properties found
              </span>
              <div className="flex border rounded-md">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading properties...</span>
            </div>
          ) : (
            <>
              <div className={`grid gap-8 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1 max-w-4xl mx-auto"
              }`}>
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>

              {filteredProperties.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria to find more properties.
                  </p>
                  <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Properties;

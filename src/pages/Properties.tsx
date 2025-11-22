import { useState, useEffect } from "react";
import { isPageEnabled } from "@/lib/pageSettings";
import UnderConstruction from "@/components/UnderConstruction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import PropertyCard from "@/components/PropertyCard";
import { Search, Filter, Grid, List } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import heroProperty from "@/assets/hero-property.jpg";

const Properties = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    setIsEnabled(isPageEnabled("listings"));
  }, []);

  if (!isEnabled) {
    return (
      <UnderConstruction
        pageName="Property Listings"
        description="We're currently updating our property portfolio. Our stunning collection of premium properties will be available soon!"
      />
    );
  }

  // Sample property data
  const properties = [
    {
      id: "1",
      title: "Modern Luxury Villa",
      price: "$1,250,000",
      location: "Beverly Hills, CA",
      beds: 4,
      baths: 3,
      sqft: 3200,
      image: property1,
      status: "For Sale" as const,
      featured: true,
    },
    {
      id: "2",
      title: "Contemporary Family Home",
      price: "$850,000",
      location: "Manhattan Beach, CA",
      beds: 3,
      baths: 2,
      sqft: 2400,
      image: property2,
      status: "For Sale" as const,
    },
    {
      id: "3",
      title: "Luxury Oceanfront Estate",
      price: "$2,100,000",
      location: "Malibu, CA",
      beds: 5,
      baths: 4,
      sqft: 4500,
      image: property3,
      status: "For Sale" as const,
      featured: true,
    },
    {
      id: "4",
      title: "Designer Modern Residence",
      price: "$1,680,000",
      location: "West Hollywood, CA",
      beds: 4,
      baths: 3,
      sqft: 3800,
      image: heroProperty,
      status: "For Sale" as const,
    },
  ];

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Property Listings</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Your Perfect Property
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Browse our curated collection of premium properties in the most desirable locations.
            </p>
          </div>
        </div>
      </section>

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
          <div className={`grid gap-8 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1 max-w-4xl mx-auto"
          }`}>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria to find more properties.
              </p>
              <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Properties;

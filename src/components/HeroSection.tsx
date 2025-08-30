import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-property.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury Property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Find Your Dream Home
            <span className="block text-secondary mt-2">with Brosham Properties</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow">
            Discover exceptional properties in prime locations. Your perfect home awaits with our expert guidance and personalized service.
          </p>

          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-hero max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Enter location, neighborhood, or ZIP code"
                    className="pl-10 h-12 border-border"
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
              <Button size="lg" className="h-12 bg-gradient-hero hover:opacity-90 transition-opacity">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              <Button variant="outline" size="sm">$500K - $750K</Button>
              <Button variant="outline" size="sm">$750K - $1M</Button>
              <Button variant="outline" size="sm">$1M+</Button>
              <Button variant="outline" size="sm">3+ Bedrooms</Button>
              <Button variant="outline" size="sm">Pool</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
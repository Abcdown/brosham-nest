import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Heart, 
  Share2, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail
} from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import heroProperty from "@/assets/hero-property.jpg";
import houseInterior1 from "@/assets/house-interior-1.jpg";
import houseInterior2 from "@/assets/house-interior-2.jpg";
import houseExterior1 from "@/assets/house-exterior-1.jpg";
import houseExterior2 from "@/assets/house-exterior-2.jpg";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Sample property data - in real app, this would come from API/database
  const properties = {
    "1": {
      id: "1",
      title: "Modern Luxury Villa",
      price: "$1,250,000",
      location: "Beverly Hills, CA",
      beds: 4,
      baths: 3,
      sqft: 3200,
      status: "For Sale" as const,
      featured: true,
      description: "This stunning modern luxury villa offers the perfect blend of contemporary design and sophisticated living. Located in the prestigious Beverly Hills area, this property features high-end finishes, an open floor plan, and breathtaking views. The home boasts a gourmet kitchen with premium appliances, spacious bedrooms with en-suite bathrooms, and a beautifully landscaped backyard perfect for entertaining.",
      features: [
        "Gourmet Kitchen with Premium Appliances",
        "Master Suite with Walk-in Closet",
        "Private Swimming Pool & Spa",
        "3-Car Garage",
        "Smart Home Technology",
        "Hardwood Floors Throughout",
        "Energy Efficient Windows",
        "Security System"
      ],
      images: [property1, houseInterior1, houseInterior2, houseExterior1, houseExterior2, heroProperty]
    },
    "2": {
      id: "2",
      title: "Contemporary Family Home",
      price: "$850,000",
      location: "Manhattan Beach, CA",
      beds: 3,
      baths: 2,
      sqft: 2400,
      status: "For Sale" as const,
      featured: false,
      description: "A beautiful contemporary family home perfect for modern living. This property features an open-concept design with plenty of natural light, updated kitchen and bathrooms, and a private backyard ideal for family gatherings.",
      features: [
        "Open Concept Living",
        "Updated Kitchen",
        "Private Backyard",
        "2-Car Garage",
        "Near Beach Access",
        "Modern Fixtures"
      ],
      images: [property2, houseInterior2, houseExterior2, houseInterior1, heroProperty]
    },
    "3": {
      id: "3",
      title: "Luxury Oceanfront Estate",
      price: "$2,100,000",
      location: "Malibu, CA",
      beds: 5,
      baths: 4,
      sqft: 4500,
      status: "For Sale" as const,
      featured: true,
      description: "An extraordinary oceanfront estate offering panoramic ocean views and direct beach access. This luxury property features high-end finishes throughout, multiple living areas, and extensive outdoor entertaining spaces.",
      features: [
        "Direct Beach Access",
        "Panoramic Ocean Views", 
        "Wine Cellar",
        "Home Theater",
        "Infinity Pool",
        "Guest House",
        "Private Beach Club Access"
      ],
      images: [property3, houseExterior1, houseInterior1, houseInterior2, houseExterior2, heroProperty]
    },
    "4": {
      id: "4",
      title: "Designer Modern Residence",
      price: "$1,680,000",
      location: "West Hollywood, CA",
      beds: 4,
      baths: 3,
      sqft: 3800,
      status: "For Sale" as const,
      featured: false,
      description: "A stunning designer modern residence featuring cutting-edge architecture and luxury finishes. This property offers spacious living areas, a chef's kitchen, and beautiful outdoor spaces perfect for California living.",
      features: [
        "Chef's Kitchen",
        "Floor-to-Ceiling Windows",
        "Rooftop Terrace",
        "Home Office",
        "Built-in Sound System",
        "Custom Lighting"
      ],
      images: [heroProperty, houseInterior2, houseExterior1, houseInterior1, property1]
    }
  };

  const property = properties[id as keyof typeof properties];

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
          <Button onClick={() => navigate("/properties")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/properties")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Properties
        </Button>
      </div>

      {/* Image Gallery */}
      <section className="mb-8">
        <div className="container mx-auto px-4">
          <div className="relative">
            {/* Main Image */}
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
                >
                  <Heart 
                    className={`w-5 h-5 ${
                      isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`} 
                  />
                </button>
                <button className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <Badge 
                  variant="default"
                  className="font-medium"
                >
                  {property.status}
                </Badge>
                {property.featured && (
                  <Badge variant="outline" className="ml-2 bg-accent text-accent-foreground border-accent">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${property.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{property.title}</h1>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{property.price}</div>
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Bed className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{property.beds}</div>
                    <div className="text-muted-foreground">Bedrooms</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Bath className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{property.baths}</div>
                    <div className="text-muted-foreground">Bathrooms</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Square className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{property.sqft.toLocaleString()}</div>
                    <div className="text-muted-foreground">Sq Ft</div>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Contact Agent</h3>
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">BS</span>
                    </div>
                    <h4 className="font-semibold">BroSham Properties</h4>
                    <p className="text-muted-foreground">Premium Real Estate Agent</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <Button className="w-full" size="lg">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Tour
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Interested in similar properties?
                    </p>
                    <Button variant="ghost" className="w-full">
                      View Similar Properties
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetails;
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, MapPin, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  status?: "For Sale" | "For Rent" | "Sold";
  featured?: boolean;
}

const PropertyCard = ({
  id,
  title,
  price,
  location,
  beds,
  baths,
  sqft,
  image,
  status = "For Sale",
  featured = false,
}: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-card h-full flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge 
            variant={status === "Sold" ? "destructive" : status === "For Rent" ? "secondary" : "default"}
            className="font-medium"
          >
            {status}
          </Badge>
          {featured && (
            <Badge variant="outline" className="bg-accent text-accent-foreground border-accent">
              Featured
            </Badge>
          )}
        </div>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors duration-200"
        >
          <Heart 
            className={`w-4 h-4 transition-colors duration-200 ${
              isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }`} 
          />
        </button>
      </div>
      
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2 flex-1 mr-3 min-h-[3.5rem]">{title}</h3>
          <span className="text-xl font-bold text-primary shrink-0">{price}</span>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-4 min-h-[1.5rem]">
          <MapPin className="w-4 h-4 mr-1 shrink-0" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6 text-sm text-muted-foreground">
          <div className="flex items-center justify-center p-2 bg-muted/30 rounded-md">
            <Bed className="w-4 h-4 mr-1" />
            <span>{beds} beds</span>
          </div>
          <div className="flex items-center justify-center p-2 bg-muted/30 rounded-md">
            <Bath className="w-4 h-4 mr-1" />
            <span>{baths} baths</span>
          </div>
          <div className="flex items-center justify-center p-2 bg-muted/30 rounded-md">
            <Square className="w-4 h-4 mr-1" />
            <span>{sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        <div className="flex gap-2 mt-auto">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            asChild
          >
            <Link to={`/properties/${id}`}>
              View Details
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Schedule Tour
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
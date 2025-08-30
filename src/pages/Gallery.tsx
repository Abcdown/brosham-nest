import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import heroProperty from "@/assets/hero-property.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sample gallery images
  const galleryImages = [
    {
      id: 1,
      src: heroProperty,
      title: "Luxury Modern Estate",
      category: "Exteriors",
      location: "Beverly Hills, CA",
      description: "Stunning contemporary architecture with panoramic views",
    },
    {
      id: 2,
      src: property1,
      title: "Designer Living Space",
      category: "Interiors",
      location: "Manhattan Beach, CA",
      description: "Open-concept living with premium finishes",
    },
    {
      id: 3,
      src: property2,
      title: "Contemporary Family Home",
      category: "Exteriors",
      location: "West Hollywood, CA",
      description: "Modern family residence with beautiful landscaping",
    },
    {
      id: 4,
      src: property3,
      title: "Oceanfront Paradise",
      category: "Exteriors",
      location: "Malibu, CA",
      description: "Luxury villa with direct ocean access",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      title: "Master Suite Elegance",
      category: "Interiors",
      location: "Beverly Hills, CA",
      description: "Luxurious master bedroom with walk-in closet",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      title: "Gourmet Kitchen",
      category: "Interiors",
      location: "Santa Monica, CA",
      description: "Chef's kitchen with premium appliances",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1600566753051-25756e7cfc7e?w=800&h=600&fit=crop",
      title: "Spa-Like Bathroom",
      category: "Interiors",
      location: "Manhattan Beach, CA",
      description: "Resort-style master bathroom with soaking tub",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&h=600&fit=crop",
      title: "Private Pool Oasis",
      category: "Exteriors",
      location: "Hollywood Hills, CA",
      description: "Infinity pool with city views",
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop",
      title: "Home Office Suite",
      category: "Interiors",
      location: "Brentwood, CA",
      description: "Professional home office with built-in storage",
    },
  ];

  const categories = ["All", "Exteriors", "Interiors"];

  const filteredImages = galleryImages.filter(image => 
    selectedCategory === "All" || image.category === selectedCategory
  );

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      const newIndex = selectedImage > 0 ? selectedImage - 1 : filteredImages.length - 1;
      setSelectedImage(newIndex);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      const newIndex = selectedImage < filteredImages.length - 1 ? selectedImage + 1 : 0;
      setSelectedImage(newIndex);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Property Gallery</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Showcase of Premium Properties
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore our collection of stunning properties featuring exceptional design and architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-4">
              {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'} found
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <Card key={image.id} className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
                  <div className="relative overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      onClick={() => openLightbox(index)}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => openLightbox(index)}
                        className="bg-white/90 hover:bg-white"
                      >
                        <ZoomIn className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm"
                    >
                      {image.category}
                    </Badge>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 line-clamp-1">{image.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{image.location}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{image.description}</p>
                  </div>
                </Card>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No images found</h3>
                <p className="text-muted-foreground mb-4">
                  Try selecting a different category.
                </p>
                <Button onClick={() => setSelectedCategory("All")}>Show All Images</Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-7xl w-full p-0 border-0 bg-black/95">
          {selectedImage !== null && (
            <div className="relative">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <img
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].title}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{filteredImages[selectedImage].title}</h3>
                <p className="text-sm opacity-90 mb-1">{filteredImages[selectedImage].location}</p>
                <p className="text-sm opacity-75">{filteredImages[selectedImage].description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Schedule a Viewing?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Experience these exceptional properties in person. Contact us to arrange a private tour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Schedule Tour
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact Agent
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
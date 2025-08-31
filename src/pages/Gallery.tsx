import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import houseExterior1 from "@/assets/house-exterior-1.jpg";
import houseExterior2 from "@/assets/house-exterior-2.jpg";
import houseInterior1 from "@/assets/house-interior-1.jpg";
import houseInterior2 from "@/assets/house-interior-2.jpg";
import houseFlip1 from "@/assets/house-flip-1.jpg";
import houseFlip2 from "@/assets/house-flip-2.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Automated slider images
  const sliderImages = [
    {
      id: 1,
      src: houseExterior1,
      title: "Modern House Exterior",
      description: "Beautiful landscaping and modern architecture"
    },
    {
      id: 2,
      src: houseExterior2,
      title: "Luxury House with Pool",
      description: "Premium exterior design with swimming pool"
    },
    {
      id: 3,
      src: houseInterior1,
      title: "Modern Living Room",
      description: "Elegant interior design with premium fixtures"
    },
    {
      id: 4,
      src: houseInterior2,
      title: "Contemporary Kitchen",
      description: "Modern kitchen with granite countertops"
    },
    {
      id: 5,
      src: houseFlip1,
      title: "House Flipping Project",
      description: "Before and after transformation"
    },
    {
      id: 6,
      src: houseFlip2,
      title: "Renovated Bathroom",
      description: "Complete bathroom renovation with modern fixtures"
    }
  ];

  // Sample gallery images for the grid
  const galleryImages = [
    {
      id: 1,
      src: houseExterior1,
      title: "Modern House Exterior",
      category: "Exteriors",
      location: "Johor Bahru, Johor",
      description: "Beautiful modern house with landscaping"
    },
    {
      id: 2,
      src: houseInterior1,
      title: "Modern Living Room",
      category: "Interiors", 
      location: "Johor Bahru, Johor",
      description: "Elegant living space with modern furnishing"
    },
    {
      id: 3,
      src: houseExterior2,
      title: "Luxury Villa with Pool",
      category: "Exteriors",
      location: "Johor Bahru, Johor", 
      description: "Premium villa with swimming pool and modern design"
    },
    {
      id: 4,
      src: houseInterior2,
      title: "Contemporary Kitchen",
      category: "Interiors",
      location: "Johor Bahru, Johor",
      description: "Modern kitchen with granite countertops and appliances"
    },
    {
      id: 5,
      src: houseFlip1,
      title: "House Renovation Project",
      category: "Flipping Projects", 
      location: "Johor Bahru, Johor",
      description: "Complete house transformation and renovation"
    },
    {
      id: 6,
      src: houseFlip2,
      title: "Bathroom Renovation",
      category: "Flipping Projects",
      location: "Johor Bahru, Johor", 
      description: "Modern bathroom renovation with premium fixtures"
    }
  ];

  const categories = ["All", "Exteriors", "Interiors", "Flipping Projects"];

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

      {/* Automated Slider */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Properties</h2>
            <Carousel
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {sliderImages.map((image) => (
                  <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden">
                        <div className="relative">
                          <img
                            src={image.src}
                            alt={image.title}
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                            <p className="text-sm opacity-90">{image.description}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
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
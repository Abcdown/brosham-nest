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
      const newIndex = selectedImage > 0 ? selectedImage - 1 : sliderImages.length - 1;
      setSelectedImage(newIndex);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      const newIndex = selectedImage < sliderImages.length - 1 ? selectedImage + 1 : 0;
      setSelectedImage(newIndex);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Property Gallery</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Showcase of Premium Properties
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Explore our collection of stunning properties featuring exceptional design and architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Main Slider */}
      <section className="py-8 bg-muted/30 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Featured Gallery</h2>
            <Carousel
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
              className="w-full"
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {sliderImages.map((image, index) => (
                  <CarouselItem key={image.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-2/3">
                    <div className="p-2">
                      <Card className="overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300">
                        <div className="relative">
                          <img
                            src={image.src}
                            alt={image.title}
                            className="w-full h-96 md:h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
                            onClick={() => openLightbox(index)}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Button
                              variant="secondary"
                              size="lg"
                              onClick={() => openLightbox(index)}
                              className="bg-white/90 hover:bg-white text-black"
                            >
                              <ZoomIn className="w-5 h-5 mr-2" />
                              View Larger
                            </Button>
                          </div>
                          <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="font-bold text-2xl mb-2">{image.title}</h3>
                            <p className="text-lg opacity-90">{image.description}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        </div>
      </section>


      {/* Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-[95vw] w-full p-0 border-0 bg-black/95 h-[95vh]">
          {selectedImage !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-3 bg-black/70 hover:bg-black/90 rounded-full text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/70 hover:bg-black/90 rounded-full text-white transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/70 hover:bg-black/90 rounded-full text-white transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <img
                src={sliderImages[selectedImage].src}
                alt={sliderImages[selectedImage].title}
                className="max-w-full max-h-full object-contain"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 text-white">
                <h3 className="text-3xl font-bold mb-3">{sliderImages[selectedImage].title}</h3>
                <p className="text-lg opacity-90">{sliderImages[selectedImage].description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Gallery;
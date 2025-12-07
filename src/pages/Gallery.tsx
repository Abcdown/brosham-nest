import { useState, useEffect } from "react";
import { GalleryAPI, GalleryImage } from "@/lib/galleryApi";
import { getPageSettings } from "@/lib/pageSettings";
import UnderConstruction from "@/components/UnderConstruction";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import PageHero from "@/components/PageHero";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isEnabled, setIsEnabled] = useState(true);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [featuredImages, setFeaturedImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getPageSettings();
      setIsEnabled(settings.gallery);
    };
    loadSettings();
  }, []);

  useEffect(() => {
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      setLoading(true);
      const response = await GalleryAPI.getAll({ status: 'active' });
      setImages(response.images);
      setFeaturedImages(response.images.filter(img => img.is_featured));
      setCategories(['All', ...response.categories]);
    } catch (error) {
      console.error('Failed to load gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isEnabled) {
    return (
      <UnderConstruction
        pageName="Property Gallery"
        description="We're curating an amazing collection of property photos and videos. Our stunning gallery will be available soon!"
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading gallery...</p>
        </div>
      </div>
    );
  }

  const filteredImages = images.filter(image => 
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
      const currentImages = featuredImages.length > 0 ? featuredImages : images;
      const newIndex = selectedImage > 0 ? selectedImage - 1 : currentImages.length - 1;
      setSelectedImage(newIndex);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      const currentImages = featuredImages.length > 0 ? featuredImages : images;
      const newIndex = selectedImage < currentImages.length - 1 ? selectedImage + 1 : 0;
      setSelectedImage(newIndex);
    }
  };

  const sliderImages = featuredImages.length > 0 ? featuredImages : images;

  return (
    <div className="min-h-screen">
	  {/* Hero Section */}
	        <PageHero
	          badge="Property Gallery"
	          title="Showcase of Premium Properties"
	          description="Explore our collection of stunning properties featuring exceptional design and architecture."
	        />

      {/* Main Slider */}
      {sliderImages.length > 0 && (
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
                              src={image.image_url}
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
                              {image.location && (
                                <p className="text-sm opacity-75 mt-1">{image.location}</p>
                              )}
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
      )}

      {/* Category Filter */}
      {categories.length > 1 && (
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
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
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">All Properties</h2>
          
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No images found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <Card 
                  key={image.id} 
                  className="overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary">{image.category}</Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                    {image.location && (
                      <p className="text-sm text-muted-foreground mb-2">{image.location}</p>
                    )}
                    {image.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {image.description}
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-[95vw] w-full p-0 border-0 bg-black/95 h-[95vh]">
          {selectedImage !== null && sliderImages[selectedImage] && (
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
                src={sliderImages[selectedImage].image_url}
                alt={sliderImages[selectedImage].title}
                className="max-w-full max-h-full object-contain"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 text-white">
                <h3 className="text-3xl font-bold mb-3">{sliderImages[selectedImage].title}</h3>
                {sliderImages[selectedImage].description && (
                  <p className="text-lg opacity-90 mb-2">{sliderImages[selectedImage].description}</p>
                )}
                {sliderImages[selectedImage].location && (
                  <p className="text-sm opacity-75">{sliderImages[selectedImage].location}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;

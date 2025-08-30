import HeroSection from "@/components/HeroSection";
import PropertyCard from "@/components/PropertyCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Users, 
  Award, 
  Star, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail,
  CheckCircle 
} from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import agentPortrait from "@/assets/agent-portrait.jpg";

const Index = () => {
  // Featured properties data
  const featuredProperties = [
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
      featured: true,
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
  ];

  const stats = [
    { icon: Home, label: "Properties Sold", value: "500+" },
    { icon: Users, label: "Happy Clients", value: "250+" },
    { icon: Award, label: "Years Experience", value: "15+" },
    { icon: Star, label: "Average Rating", value: "4.9" },
  ];

  const services = [
    "Residential Sales & Purchases",
    "Investment Property Consulting", 
    "Market Analysis & Valuations",
    "Property Management Services",
  ];

  const testimonials = [
    {
      name: "Jennifer Martinez",
      location: "Beverly Hills",
      text: "Sarah helped us find our dream home in just 3 weeks. Her knowledge of the market and attention to detail is exceptional.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      location: "Manhattan Beach",
      text: "Professional, responsive, and results-driven. Brosham Properties sold our home above asking price!",
      rating: 5,
    },
    {
      name: "Lisa Thompson",
      location: "Santa Monica",
      text: "As first-time buyers, we were nervous, but Sarah guided us through every step. Highly recommend!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Featured Properties</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Exceptional Properties Await
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover our handpicked selection of premium properties in the most desirable locations.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
            
            <div className="text-center">
              <Button size="lg" variant="outline">
                View All Properties
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Proven Track Record</h2>
              <p className="text-xl text-muted-foreground">
                Our results speak for themselves
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="text-center bg-gradient-card hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                      <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">About Brosham Properties</Badge>
                <h2 className="text-3xl font-bold mb-6">
                  Your Trusted Real Estate Partner
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  With over 15 years of experience in the real estate industry, we're committed to 
                  helping you find your perfect home and achieve your property goals. Our personalized 
                  approach ensures every client receives the attention they deserve.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button>
                    Learn More About Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    (555) 123-4567
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src={agentPortrait}
                  alt="Sarah Brosham - Real Estate Expert"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                />
                <Card className="absolute -bottom-6 -left-6 bg-gradient-card shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 mr-2" />
                      <div>
                        <div className="font-bold">4.9/5 Rating</div>
                        <div className="text-xs text-muted-foreground">250+ Reviews</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Client Reviews</Badge>
              <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Don't just take our word for it - hear from the families we've helped find their perfect homes.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-white/90 mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-white/70 text-sm">{testimonial.location}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Real Estate Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're buying, selling, or investing, we're here to make your real estate goals a reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8">
                Schedule Free Consultation
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Mail className="w-5 h-5 mr-2" />
                Get Market Analysis
              </Button>
            </div>
            
            <div className="flex items-center justify-center text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Serving Beverly Hills, Santa Monica, Manhattan Beach & Surrounding Areas</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
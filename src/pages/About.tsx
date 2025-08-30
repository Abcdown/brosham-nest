import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Home, Star, Phone, Mail, MapPin } from "lucide-react";
import agentPortrait from "@/assets/agent-portrait.jpg";

const About = () => {
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
    "First-Time Buyer Programs",
    "Luxury Home Specialists",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">About Brosham Properties</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Trusted Real Estate Partner
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              With over 15 years of experience in the real estate industry, we're committed to helping you find your perfect home and achieve your property goals.
            </p>
          </div>
        </div>
      </section>

      {/* Agent Profile */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src={agentPortrait}
                  alt="Brosham Properties Agent"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Meet Your Real Estate Expert</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Hello! I'm Sarah Brosham, founder of Brosham Properties. My passion for real estate began over 15 years ago, and since then, I've dedicated my career to helping families find their dream homes and investors build their portfolios.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  I believe that buying or selling a home is one of life's most important decisions. That's why I'm committed to providing personalized service, expert market knowledge, and unwavering support throughout your real estate journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    (555) 123-4567
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    sarah@broshamproperties.com
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Results That Speak</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="text-center bg-gradient-card hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                      <div className="text-2xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow bg-gradient-card">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-4"></div>
                      <span className="font-medium">{service}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              At Brosham Properties, our mission is to make your real estate dreams a reality. We combine deep market knowledge with personalized service to ensure every client receives the attention and expertise they deserve. Whether you're buying your first home, upgrading to your dream property, or making a strategic investment, we're here to guide you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss your real estate goals and create a plan to achieve them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Schedule Consultation</Button>
              <Button variant="outline" size="lg">
                <MapPin className="w-4 h-4 mr-2" />
                Visit Our Office
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "(555) 123-4567",
      description: "Call us anytime for immediate assistance",
    },
    {
      icon: Mail,
      title: "Email",
      details: "sarah@broshamproperties.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Office",
      details: "123 Real Estate Blvd, Suite 100\nBeverly Hills, CA 90210",
      description: "Visit us for in-person consultations",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "Mon-Fri: 9:00 AM - 7:00 PM\nSat-Sun: 10:00 AM - 5:00 PM",
      description: "Extended hours for your convenience",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Contact Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Start Your Real Estate Journey
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to buy, sell, or invest? We're here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Select value={formData.subject} onValueChange={(value) => handleChange("subject", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buying">I'm interested in buying</SelectItem>
                        <SelectItem value="selling">I want to sell my property</SelectItem>
                        <SelectItem value="investment">Investment opportunities</SelectItem>
                        <SelectItem value="valuation">Property valuation</SelectItem>
                        <SelectItem value="consultation">Schedule consultation</SelectItem>
                        <SelectItem value="other">Other inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <Textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell us about your real estate needs, preferred locations, budget, timeline, or any specific questions you have..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  We're committed to providing exceptional service and personalized attention to every client. 
                  Reach out to us through any of the channels below, and we'll respond promptly.
                </p>
              </div>

              <div className="grid gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow bg-gradient-card">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <div className="p-3 bg-primary/10 rounded-lg mr-4">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{info.title}</h3>
                            <p className="text-foreground font-medium mb-1 whitespace-pre-line">
                              {info.details}
                            </p>
                            <p className="text-sm text-muted-foreground">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Map Section */}
              <Card className="bg-gradient-card">
                <CardContent className="p-0">
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Interactive map would be displayed here</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        123 Real Estate Blvd, Beverly Hills, CA 90210
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">How quickly can you respond to inquiries?</h3>
                  <p className="text-muted-foreground text-sm">
                    We typically respond to all inquiries within 2-4 hours during business hours, 
                    and within 24 hours on weekends and holidays.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Do you offer virtual consultations?</h3>
                  <p className="text-muted-foreground text-sm">
                    Yes! We offer virtual consultations via video call for your convenience, 
                    as well as virtual property tours when needed.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">What areas do you serve?</h3>
                  <p className="text-muted-foreground text-sm">
                    We primarily serve the Greater Los Angeles area, including Beverly Hills, 
                    Santa Monica, Manhattan Beach, and surrounding communities.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Is there a cost for initial consultation?</h3>
                  <p className="text-muted-foreground text-sm">
                    No, all initial consultations are completely free. We'll discuss your needs 
                    and provide market insights at no charge.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Need Immediate Assistance?</h2>
            <p className="text-lg opacity-90 mb-8">
              For urgent real estate matters or time-sensitive opportunities, call our emergency line.
            </p>
            <Button variant="secondary" size="lg" className="text-lg px-8">
              <Phone className="w-5 h-5 mr-2" />
              Emergency Line: (555) 999-HELP
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      });
      return;
    }
    
    // Create mailto link for subscription
    const mailtoLink = `mailto:sham@broshamproperties.my,support@broshamproperties.my?subject=Newsletter Subscription&body=Please add ${email} to your newsletter subscription list.`;
    window.open(mailtoLink);
    
    toast({
      title: "Subscription Request Sent",
      description: "Your email client will open to send the subscription request.",
    });
    setEmail("");
  };

  return (
    <footer className="bg-[hsl(198,75%,35%)] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Market Insights
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Subscribe to our newsletter and get the latest real estate tips and market updates delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-black placeholder:text-gray-500 border-none"
            />
            <Button
              type="submit"
              className="bg-[hsl(45,85%,55%)] hover:bg-[hsl(45,85%,45%)] text-black font-semibold px-8"
            >
              Subscribe Now
            </Button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { Construction, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface UnderConstructionProps {
  pageName?: string;
  description?: string;
}

const UnderConstruction = ({ 
  pageName = "This Page",
  description = "We're working hard to bring you something amazing. Check back soon!"
}: UnderConstructionProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background px-4">
      <div className="max-w-2xl w-full text-center space-y-8 py-16">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
            <div className="relative bg-primary/10 p-8 rounded-full border-4 border-primary/20">
              <Construction className="w-24 h-24 text-primary animate-bounce" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            {pageName} is Under Construction
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            {description}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>Coming Soon</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: "60%" }} />
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link to="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="pt-8 border-t border-muted">
          <p className="text-sm text-muted-foreground">
            Have questions? Feel free to{" "}
            <Link to="/contact" className="text-primary hover:underline">
              reach out to us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;

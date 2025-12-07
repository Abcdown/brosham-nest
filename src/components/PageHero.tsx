import { Badge } from "@/components/ui/badge";

interface PageHeroProps {
  badge: string;
  title: string;
  description?: string;
}

const PageHero = ({ badge, title, description }: PageHeroProps) => {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-4 bg-white">{badge}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            {title}
          </h1>
          {description && (
            <p className="text-xl text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
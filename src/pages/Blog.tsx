import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, User, Search, ArrowRight } from "lucide-react";
import { useState } from "react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample blog posts
  const blogPosts = [
    {
      id: "1",
      title: "10 Tips for First-Time Home Buyers in 2024",
      excerpt: "Navigate the current real estate market with confidence using these essential tips for first-time buyers.",
      author: "Sarah Brosham",
      date: "March 15, 2024",
      category: "Buying Tips",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "Market Trends: What to Expect This Spring",
      excerpt: "Analyzing current market conditions and what they mean for buyers and sellers in the coming months.",
      author: "Sarah Brosham",
      date: "March 10, 2024",
      category: "Market Analysis",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=400&fit=crop",
      readTime: "7 min read",
    },
    {
      id: "3",
      title: "Staging Your Home for a Quick Sale",
      excerpt: "Professional staging tips that can help your property sell faster and for a better price.",
      author: "Sarah Brosham",
      date: "March 5, 2024",
      category: "Selling Tips",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop",
      readTime: "6 min read",
    },
    {
      id: "4",
      title: "Investment Properties: Building Your Portfolio",
      excerpt: "Strategic insights on selecting and managing investment properties for long-term wealth building.",
      author: "Sarah Brosham",
      date: "February 28, 2024",
      category: "Investment",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
      readTime: "8 min read",
    },
    {
      id: "5",
      title: "Understanding Mortgage Pre-Approval",
      excerpt: "Everything you need to know about getting pre-approved for a mortgage and why it matters.",
      author: "Sarah Brosham",
      date: "February 20, 2024",
      category: "Financing",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
      readTime: "4 min read",
    },
    {
      id: "6",
      title: "Neighborhood Guide: Finding Your Perfect Location",
      excerpt: "How to research and evaluate neighborhoods to find the perfect area for your lifestyle and budget.",
      author: "Sarah Brosham",
      date: "February 15, 2024",
      category: "Location Guide",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
      readTime: "6 min read",
    },
  ];

  const categories = ["All", "Buying Tips", "Selling Tips", "Market Analysis", "Investment", "Financing", "Location Guide"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Real Estate Blog</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Expert Insights & Market Updates
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Stay informed with the latest real estate trends, tips, and expert advice to make better property decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge 
                        variant="secondary" 
                        className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm"
                      >
                        {post.category}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{post.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                        <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          Read More
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria.
                </p>
                <Button onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Blog;
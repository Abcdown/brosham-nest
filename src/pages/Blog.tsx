import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, User, Search, ArrowRight } from "lucide-react";
import { useState } from "react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Blog posts from Brosham Properties
  const blogPosts = [
    {
      id: "1",
      title: "Malaysia Budget 2023 Property Analysis",
      excerpt: "100% stamp duty exemption provided specifically for homes priced below RM500,000. Understanding the complete impact on property buyers.",
      author: "Sarah Brosham",
      date: "October 12, 2022",
      category: "Property",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
      readTime: "6 min read",
    },
    {
      id: "2",
      title: "Importance of Rental Deposit",
      excerpt: "Understanding the critical role of rental deposits in property rental transactions and tenant protection.",
      author: "Sarah Brosham",
      date: "March 18, 2023",
      category: "Property",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop",
      readTime: "5 min read",
    },
    {
      id: "3",
      title: "How to Avoid Rental Scams",
      excerpt: "Essential tips and warning signs to help you identify and avoid property rental scammers.",
      author: "Sarah Brosham",
      date: "March 18, 2023",
      category: "Property",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
      readTime: "7 min read",
    },
    {
      id: "4",
      title: "What is a Rental Deposit",
      excerpt: "Complete explanation of rental deposits, their purpose, and how they work in property transactions.",
      author: "Sarah Brosham",
      date: "March 3, 2023",
      category: "Property",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=400&fit=crop",
      readTime: "5 min read",
    },
    {
      id: "5",
      title: "How to Identify Rental Scammers",
      excerpt: "Learn the warning signs and red flags that indicate potential rental property scams.",
      author: "Sarah Brosham",
      date: "March 3, 2023",
      category: "Property",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=400&fit=crop",
      readTime: "6 min read",
    },
    {
      id: "6",
      title: "Additional Costs When Buying Property",
      excerpt: "Know the additional costs involved during property purchase beyond the selling price.",
      author: "Sarah Brosham",
      date: "February 12, 2023",
      category: "Property",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
      readTime: "8 min read",
    },
    {
      id: "7",
      title: "Reasons Why Loan Applications Get Rejected",
      excerpt: "Understanding the common reasons behind loan application rejections and how to avoid them.",
      author: "Sarah Brosham",
      date: "February 12, 2023",
      category: "Loan",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
      readTime: "7 min read",
    },
    {
      id: "8",
      title: "What is Property Refinancing - Part 2",
      excerpt: "Advanced concepts and strategies in property refinancing for experienced investors.",
      author: "Sarah Brosham",
      date: "February 12, 2023",
      category: "Loan",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      readTime: "9 min read",
    },
    {
      id: "9",
      title: "What is Property Refinancing - Part 1",
      excerpt: "Introduction to property refinancing concepts and basic strategies for homeowners.",
      author: "Sarah Brosham",
      date: "January 21, 2023",
      category: "Loan",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop",
      readTime: "8 min read",
    },
    {
      id: "10",
      title: "One Stop Centre Service",
      excerpt: "Comprehensive property services under one roof for all your real estate needs.",
      author: "Sarah Brosham",
      date: "January 21, 2023",
      category: "Experience",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop",
      readTime: "6 min read",
    },
    {
      id: "11",
      title: "Thank You and Appreciation to Everyone",
      excerpt: "Expressing gratitude to clients, partners, and team members for their continued support.",
      author: "Sarah Brosham",
      date: "January 4, 2023",
      category: "Experience",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop",
      readTime: "4 min read",
    },
    {
      id: "12",
      title: "Everything You Need to Know About CTOS - Part 2",
      excerpt: "Advanced CTOS topics including credit report improvement and dispute resolution.",
      author: "Sarah Brosham",
      date: "January 2, 2023",
      category: "Loan",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=400&fit=crop",
      readTime: "10 min read",
    },
    {
      id: "13",
      title: "Everything You Need to Know About CTOS",
      excerpt: "Complete guide to understanding CTOS credit reporting and its impact on loan applications.",
      author: "Sarah Brosham",
      date: "December 22, 2022",
      category: "Loan",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
      readTime: "9 min read",
    },
    {
      id: "14",
      title: "How to Write a Tenancy Agreement",
      excerpt: "Step-by-step guide to creating comprehensive and legally sound tenancy agreements.",
      author: "Sarah Brosham",
      date: "December 22, 2022",
      category: "Property",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop",
      readTime: "8 min read",
    },
    {
      id: "15",
      title: "Banner Installation Services",
      excerpt: "Professional property marketing through strategic banner placement and installation.",
      author: "Sarah Brosham",
      date: "December 9, 2022",
      category: "Property",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop",
      readTime: "5 min read",
    },
    {
      id: "16",
      title: "Freehold or Leasehold: Which is Better?",
      excerpt: "Comparing the advantages and disadvantages of freehold versus leasehold properties.",
      author: "Sarah Brosham",
      date: "December 8, 2022",
      category: "Property",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
      readTime: "7 min read",
    },
    {
      id: "17",
      title: "Benefits of Renting Before Completing Purchase",
      excerpt: "Advantages of renting a property before finalizing the purchase transaction.",
      author: "Sarah Brosham",
      date: "December 8, 2022",
      category: "Property",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=400&fit=crop",
      readTime: "6 min read",
    },
    {
      id: "18",
      title: "Identifying Why Properties Don't Sell",
      excerpt: "Common factors that prevent properties from selling and how to address them.",
      author: "Sarah Brosham",
      date: "November 29, 2022",
      category: "Property",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=400&fit=crop",
      readTime: "8 min read",
    },
    {
      id: "19",
      title: "What is ROI in Property Investment?",
      excerpt: "Understanding Return on Investment calculations and metrics for property investments.",
      author: "Sarah Brosham",
      date: "November 26, 2022",
      category: "Investment",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
      readTime: "9 min read",
    },
    {
      id: "20",
      title: "Is Buying Distressed Properties Profitable?",
      excerpt: "Exploring the potential profits and risks of investing in distressed or 'problem' properties.",
      author: "Sarah Brosham",
      date: "November 13, 2022",
      category: "Property",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
      readTime: "10 min read",
    },
    {
      id: "21",
      title: "Sea View Condo - JB City Center",
      excerpt: "Spotlight on premium sea view condominium opportunities in Johor Bahru city center.",
      author: "Sarah Brosham",
      date: "November 13, 2022",
      category: "Property",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      readTime: "7 min read",
    },
    {
      id: "22",
      title: "OPR Rate Increases to 2.75%",
      excerpt: "Impact analysis of the Overnight Policy Rate increase to 2.75% on property loans and market.",
      author: "Sarah Brosham",
      date: "November 3, 2022",
      category: "Loan",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop",
      readTime: "6 min read",
    },
    {
      id: "23",
      title: "Benefits of Buying Sub-Sale Properties",
      excerpt: "Advantages of purchasing sub-sale properties compared to new developments.",
      author: "Sarah Brosham",
      date: "October 31, 2022",
      category: "Investment",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
      readTime: "8 min read",
    },
    {
      id: "24",
      title: "Why You Need a Real Estate Agent",
      excerpt: "The important role and benefits of appointing a professional real estate agent.",
      author: "Sarah Brosham",
      date: "October 31, 2022",
      category: "Experience",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop",
      readTime: "7 min read",
    },
  ];

  const categories = ["All", "Property", "Loan", "Investment", "Experience"];
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
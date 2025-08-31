
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar, User, Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Blog posts from Brosham Properties (only first 12 posts)
  const blogPosts = [
    {
      id: "1",
      title: "Mari Teliti Pembentangan Bajet 2023 Berkaitan Hartanah",
      excerpt: "Pengeculian bayaran duti setem 100% diberikan khas untuk rumah berharga kurang RM500,000. Sehingga akhir tahun 2025.",
      author: "Sarah Brosham",
      date: "October 12, 2022",
      category: "Property",
      image: "https://i0.wp.com/www.broshamproperties.my/wp-content/uploads/2022/10/Bajet-2023-Galakkan-Rumah-Pertama.jpeg?w=800&h=400&fit=crop",
      readTime: "6 min read",
    },
    {
      id: "2",
      title: "Kepentingan Deposit Rumah Sewa",
      excerpt: "Blog sebelum ini, Bro Sham ada ulas mengenai deposit rumah sewa. Deposit rumah sewa memang PENTING untuk kedua-dua belah pihak.",
      author: "Sarah Brosham",
      date: "March 18, 2023",
      category: "Property",
      image: "https://i0.wp.com/www.broshamproperties.my/wp-content/uploads/2023/03/Kepentingan-Deposit-Rumah-Sewa.jpeg?w=800&h=400&fit=crop",
      readTime: "5 min read",
    },
    {
      id: "3",
      title: "Cara Elak Di Tipu Scammer Rumah Sewa",
      excerpt: "Perkara yang boleh anda lakukan untuk memastikan anda tidak ditipu oleh scammer rumah sewa sama ada sebelum atau selepas perjanjian sewa.",
      author: "Sarah Brosham",
      date: "March 18, 2023",
      category: "Property",
      image: "https://i0.wp.com/www.broshamproperties.my/wp-content/uploads/2023/03/Cara-Elak-DiTipu-Scammer-Rumah-Sewa.jpeg?w=800&h=400&fit=crop",
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
      title: "Apa Kepentingan Deposit Kepada Developer?",
      excerpt: "Deposit dalam pembelian hartanah sangat penting untuk kedua-dua pihak - pembeli dan developer. Mari kita fahami kepentingannya.",
      author: "Sarah Brosham",
      date: "February 12, 2023",
      category: "Property",
      image: "https://i0.wp.com/www.broshamproperties.my/wp-content/uploads/2023/02/Kepentingan-Deposit-Developer.jpeg?w=800&h=400&fit=crop",
      readTime: "8 min read",
    },
    {
      id: "7",
      title: "Sebab Kenapa Loan Tak Approve",
      excerpt: "Faktor-faktor utama yang menyebabkan permohonan pinjaman hartanah ditolak dan bagaimana untuk mengelakkannya.",
      author: "Sarah Brosham",
      date: "February 12, 2023",
      category: "Loan",
      image: "https://i0.wp.com/www.broshamproperties.my/wp-content/uploads/2023/02/Sebab-Loan-Tak-Approve.jpeg?w=800&h=400&fit=crop",
      readTime: "7 min read",
    },
    {
      id: "8",
      title: "Apa Itu Refinance Part 2",
      excerpt: "Sambungan dari bahagian 1 - konsep lanjutan dan strategi refinancing hartanah untuk pelabur berpengalaman.",
      author: "Sarah Brosham",
      date: "February 12, 2023",
      category: "Loan",
      image: "https://i0.wp.com/www.broshamproperties.my/wp-content/uploads/2023/02/Refinance-Part-2.jpeg?w=800&h=400&fit=crop",
      readTime: "9 min read",
    },
    {
      id: "9",
      title: "Apa Itu Refinance Part 1",
      excerpt: "Pengenalan kepada konsep refinancing hartanah dan strategi asas untuk pemilik rumah.",
      author: "Sarah Brosham",
      date: "January 21, 2023",
      category: "Loan",
      image: "https://i0.wp.com/www.broshamproperties.my/wp-content/uploads/2023/01/Refinance-Part-1.jpeg?w=800&h=400&fit=crop",
      readTime: "8 min read",
    },
    {
      id: "10",
      title: "One Stop Centre Service",
      excerpt: "Perkhidmatan hartanah menyeluruh di bawah satu bumbung untuk semua keperluan hartanah anda.",
      author: "Sarah Brosham",
      date: "January 21, 2023",
      category: "Experience",
      image: "https://i0.wp.com/www.broshamproperties.my/wp-content/uploads/2023/01/One-Stop-Centre.jpeg?w=800&h=400&fit=crop",
      readTime: "6 min read",
    },
    {
      id: "11",
      title: "Thank You and Appreciation to Everyone",
      excerpt: "Expressing gratitude to clients, partners, and team members for their continued support.",
      author: "Sarah Brosham",
      date: "January 4, 2023",
      category: "Experience",
      image: "https://i0.wp.com/www.broshamproperties.my/wp-content/uploads/2023/01/Thank-You.jpeg?w=800&h=400&fit=crop",
      readTime: "4 min read",
    },
    {
      id: "12",
      title: "Everything You Need to Know About CTOS - Part 2",
      excerpt: "Advanced CTOS topics including credit report improvement and dispute resolution.",
      author: "Sarah Brosham",
      date: "January 2, 2023",
      category: "Loan",
      image: "https://i0.wp.com/www.broshamproperties.my/wp-content/uploads/2023/01/CTOS-Part-2.jpeg?w=800&h=400&fit=crop",
      readTime: "10 min read",
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

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to first page when search/filter changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

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
                  onChange={(e) => handleSearchChange(e.target.value)}
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
                  onClick={() => handleCategoryChange(category)}
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
            {currentPosts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {currentPosts.map((post) => (
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
                          <Link to={`/blog/${post.id}`}>
                            <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                              Read More
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage > 1) setCurrentPage(currentPage - 1);
                            }}
                            className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(page);
                              }}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                            }}
                            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria.
                </p>
                <Button onClick={() => { setSearchTerm(""); setSelectedCategory("All"); setCurrentPage(1); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with Market Insights</h2>
            <p className="text-muted-foreground mb-8">
              Get the latest property market updates, investment tips, and exclusive insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                type="email"
                className="flex-1"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;

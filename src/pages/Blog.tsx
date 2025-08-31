import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, User, Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const blogPosts = [
    {
      id: "1",
      title: "Mari teliti pembentangan 'Interest Rate' dalam carta amortization",
      excerpt: "Memahami bagaimana kadar faedah dan pembayaran bulanan dikira dalam jadual pelunasan pinjaman rumah.",
      author: "Brosham Properties",
      date: "2024-11-25",
      category: "Kewangan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Mari-teliti-pembentangan-Interest-Rate-dalam-carta-amortization.jpg",
      readTime: "6 min read",
    },
    {
      id: "2",
      title: "Kepentingan Deposit Rumah",
      excerpt: "Panduan lengkap mengenai kepentingan deposit dalam pembelian rumah dan cara mengurus kewangan dengan bijak.",
      author: "Brosham Properties", 
      date: "2024-11-24",
      category: "Kewangan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Kepentingan-Deposit-Rumah.jpg",
      readTime: "5 min read",
    },
    {
      id: "3",
      title: "Cara elak di tipu scammer",
      excerpt: "Tips penting untuk mengelakkan penipuan dalam transaksi hartanah dan melindungi diri dari scammer.",
      author: "Brosham Properties",
      date: "2024-11-23", 
      category: "Keselamatan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Cara-elak-di-tipu-scammer.jpg",
      readTime: "7 min read",
    },
    {
      id: "4",
      title: "Apa itu deposit rumah? Sewa beli?",
      excerpt: "Penjelasan terperinci mengenai konsep deposit rumah dan skim sewa beli dalam konteks hartanah Malaysia.",
      author: "Brosham Properties",
      date: "2024-11-22",
      category: "Kewangan", 
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Apa-itu-deposit-rumah-Sewa-beli.jpg",
      readTime: "5 min read",
    },
    {
      id: "5",
      title: "Cara kenalpasti scammer",
      excerpt: "Panduan untuk mengenal pasti ciri-ciri scammer dan melindungi diri dalam urusan hartanah.",
      author: "Brosham Properties",
      date: "2024-11-21",
      category: "Keselamatan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Cara-kenalpasti-scammer.jpg",
      readTime: "6 min read",
    },
    {
      id: "6",
      title: "Ketahui kos-kos tambahan yang perlu dibayar semasa beli rumah",
      excerpt: "Senarai lengkap kos tambahan yang perlu diambil kira semasa membeli rumah selain daripada harga pembelian.",
      author: "Brosham Properties",
      date: "2024-11-20",
      category: "Kewangan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Ketahui-kos-kos-tambahan-yang-perlu-dibayar-semasa-beli-rumah.jpg",
      readTime: "8 min read",
    },
    {
      id: "7",
      title: "Sebab-sebab permohonan loan ditolak oleh bank",
      excerpt: "Faktor-faktor yang menyebabkan permohonan pinjaman rumah ditolak dan cara mengatasinya.",
      author: "Brosham Properties",
      date: "2024-11-19",
      category: "Kewangan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Sebab-sebab-permohonan-loan-ditolak-oleh-bank.jpg",
      readTime: "6 min read",
    },
    {
      id: "8",
      title: "Apakah itu Refinance Rumah?",
      excerpt: "Penjelasan lengkap mengenai konsep refinance rumah, proses, dan kelebihan yang boleh diperoleh.",
      author: "Brosham Properties",
      date: "2024-11-18",
      category: "Kewangan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Apakah-itu-Refinance-Rumah.jpg",
      readTime: "7 min read",
    },
    {
      id: "9",
      title: "One Stop Centre",
      excerpt: "Kelebihan menggunakan perkhidmatan one stop centre untuk semua keperluan berkaitan hartanah.",
      author: "Brosham Properties",
      date: "2024-11-17",
      category: "Perkhidmatan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/One-Stop-Centre.jpg",
      readTime: "6 min read",
    },
    {
      id: "10",
      title: "Terima Kasih Dan Penghargaan",
      excerpt: "Ucapan penghargaan kepada semua klien dan rakan kongsi atas sokongan berterusan sepanjang tahun 2024.",
      author: "Brosham Properties",
      date: "2024-11-16",
      category: "Umum",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Terima-kasih-dan-penghargaan.jpg",
      readTime: "4 min read",
    },
    {
      id: "11",
      title: "Segala yang anda perlu tahu tentang Deposit Rumah - Developer",
      excerpt: "Panduan komprehensif mengenai deposit yang perlu dibayar kepada developer dan perlindungan yang ada.",
      author: "Brosham Properties",
      date: "2024-11-15",
      category: "Kewangan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Segala-yang-anda-perlu-tahu-tentang-Deposit-Rumah-Developer.jpg",
      readTime: "8 min read",
    },
    {
      id: "12",
      title: "Apa kepentingan deposit kepada developer",
      excerpt: "Memahami mengapa deposit kepada developer penting dan bagaimana ia melindungi kedua-dua pihak dalam transaksi.",
      author: "Brosham Properties",
      date: "2024-11-14",
      category: "Kewangan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Apa-kepentingan-deposit-kepada-developer.jpg",
      readTime: "7 min read",
    }
  ];

  const categories = ["All", "Kewangan", "Keselamatan", "Perkhidmatan", "Umum"];
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
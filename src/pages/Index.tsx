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
      title: "Vila Mewah Moden",
      price: "RM 1,250,000",
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
      title: "Rumah Keluarga Kontemporari",
      price: "RM 850,000",
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
      title: "Rumah Mewah Tepi Pantai",
      price: "RM 2,100,000",
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
    { icon: Home, label: "Hartanah Terjual", value: "500+" },
    { icon: Users, label: "Pelanggan Gembira", value: "250+" },
    { icon: Award, label: "Tahun Pengalaman", value: "15+" },
    { icon: Star, label: "Purata Penilaian", value: "4.9" },
  ];

  const services = [
    "Jualan & Pembelian Kediaman",
    "Perundingan Hartanah Pelaburan", 
    "Analisis Pasaran & Penilaian",
    "Perkhidmatan Pengurusan Hartanah",
  ];

  const testimonials = [
    {
      name: "Muhammad Sazwan Karim",
      location: "Home Buyer",
      text: "Process jual beli rumah yang mudah dan sangat cepat, dalam masa 5 hari sahaja telah mendapat keputusan, semua urusan dibuat secepat mungkin oleh BroSham Properties. Terima Kasih",
      rating: 5,
    },
    {
      name: "Mohamad Edad",
      location: "Home Buyer", 
      text: "TQ BroSham sebab bantu saya dapat rumah. Highly recommended untuk sesiapa yang nak cari rumah. Sangat membantu, kerja cepat dan mudah berurusan. Walaupun dah dapat kunci masih lagi tolong untuk process renovation. Saya bagi 10/10",
      rating: 5,
    },
    {
      name: "Minnie Arsad",
      location: "Home Owner",
      text: "Alhamdulilah. Berurusan dengan BroSham Properties memang terbaik... Saya suami isteri sudah 2 kali berurusan dengan Bro Sham, memang puas hati. Memang terbaik... Dari A-Z... TQ BroSham",
      rating: 5,
    },
    {
      name: "Syaza Rahman",
      location: "Home Buyer",
      text: "Saya client BroSham yang menetap di Selangor, dan beli property di Johor. Segala urusan memang diuruskan oleh BroSham. Tak payah pening-pening kepala dah. Sentiasa keep me updated tentang process jual beli dari mula hingga akhir dan tidak kedekut untuk beri tips tentang pelaburan hartanah. Pada saya BroSham adalah trusted consultant/agent dari syurga. Alhamdulillah syukur sangat dipertemukan dengan agent yang ikhlas dan ada passion dalam menjalankan tugasanya",
      rating: 5,
    },
    {
      name: "Suffrina Riena",
      location: "Home Owner",
      text: "Terbaikkk... Service bagus, tiada syarat terselindung... Senang sangat berurusan.",
      rating: 5,
    },
    {
      name: "Aimi Shahida Selamat",
      location: "Home Buyer",
      text: "Agen yang cepat buat kerja. Mudah berurusan dengan beliau. Senang di ajak berunding. Always Positive",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* CTA Buttons Section */}
      <section className="py-8 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => window.location.href = '/semak-nilai-hartanah'}
              >
                Semak Nilai Hartanah
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => window.location.href = '/semak-kelayakan-loan'}
              >
                Semak Kelayakan Loan
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Hartanah Pilihan</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hartanah Istimewa Menanti
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Temui pilihan hartanah premium kami yang dipilih khas di lokasi-lokasi yang paling diingini.
            </p>
          </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
            
            <div className="text-center">
              <Button size="lg" variant="outline">
                Lihat Semua Hartanah
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-300">
                KENAPA PERLU PILIH KAMI?
              </h2>
              <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed">
                Kepuasan pelanggan adalah keutamaan kami. Kami sentiasa memberikan 100% komitmen dan 
                konsistensi dalam melaksanakan tanggungjawab sebagai perunding hartanah. Sejajar dengan visi kami 
                iaitu Commitments, Consistency & Responsibility.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {/* Komitmen */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-yellow-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">KOMITMEN</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Kami sentiasa fokus dan komited dalam memberi perkhidmatan yang terbaik bagi 
                    mencapai matlamat membantu menyelesaikan masalah dan memenuhi kehendak pelanggan.
                  </p>
                </CardContent>
              </Card>

              {/* Konsisten */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-yellow-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">KONSISTEN</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Kami memastikan proses dan hasil kerja yang dilaksanakan sentiasa dalam keadaan yang 
                    konsisten supaya perkhidmatan kami dapat membantu setiap pelanggan mendapatkan rumah idaman mereka.
                  </p>
                </CardContent>
              </Card>

              {/* Tanggung Jawab */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-yellow-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">TANGGUNG JAWAB</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Kami bertanggungjawab melaksanakan segala tugas sebagai perunding hartanah yang telah 
                    dilantik oleh pelanggan dalam menguruskan proses Jual Beli Hartanah dari A to Z.
                  </p>
                </CardContent>
              </Card>

              {/* Ejen Berdaftar */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-yellow-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">EJEN BERDAFTAR</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Kami Perunding hartanah yang berdaftar dengan Lembaga Penilai, Pentaksir, Ejen Hartanah 
                    & Pengurus Harta (LPPEH) Malaysia. Berpengalaman lebih dari tiga tahun dalam bidang 
                    hartanah dan dipercayai ramai pelanggan.
                  </p>
                </CardContent>
              </Card>

              {/* Perkhidmatan Kami */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 md:col-span-2 lg:col-span-1">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Home className="w-8 h-8 text-yellow-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">PERKHIDMATAN KAMI</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Kami menyediakan perkhidmatan penuh daripada urusan jual beli hartanah, sewaan, pajakan, 
                    refinance, urusan pinjaman perumahan dan urusan guaman.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <Badge variant="outline" className="mb-6 px-4 py-2 text-lg bg-white/80 backdrop-blur-sm">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                Ulasan Pelanggan
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Apa Kata Pelanggan Kami
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Jangan hanya percaya kata-kata kami - dengar dari keluarga-keluarga yang telah kami bantu mencari rumah impian mereka.
              </p>
            </div>
            
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="overflow-hidden rounded-2xl">
                <div className="flex transition-transform duration-500 ease-in-out" id="testimonialSlider">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <Card className="bg-white dark:bg-slate-800 shadow-2xl border-0 mx-auto max-w-2xl">
                        <CardContent className="p-12 text-center">
                          <div className="flex justify-center mb-6">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400 mx-1" />
                            ))}
                          </div>
                          <div className="text-6xl text-primary/20 mb-4">"</div>
                          <p className="text-xl text-foreground/90 leading-relaxed italic mb-8">
                            {testimonial.text}
                          </p>
                          <div className="flex items-center justify-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4">
                              {testimonial.name.charAt(0)}
                            </div>
                            <div className="text-left">
                              <div className="font-bold text-lg">{testimonial.name}</div>
                              <div className="text-muted-foreground uppercase tracking-wide text-sm">
                                {testimonial.location}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className="w-3 h-3 rounded-full bg-primary/30 hover:bg-primary transition-all duration-300"
                    onClick={() => {
                      const slider = document.getElementById('testimonialSlider');
                      if (slider) {
                        slider.style.transform = `translateX(-${index * 100}%)`;
                      }
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-border/50">
                <div className="flex items-center text-muted-foreground">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-2" />
                  <span className="font-semibold">4.9/5 rating dari 250+ pelanggan</span>
                </div>
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300">
                  Baca Semua Ulasan
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bersedia untuk Memulakan Perjalanan Hartanah Anda?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sama ada anda ingin membeli, menjual, atau melabur, kami di sini untuk menjadikan matlamat hartanah anda kenyataan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-lg px-8">
                Jadual Perundingan Percuma
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Mail className="w-5 h-5 mr-2" />
                Dapatkan Analisis Pasaran
              </Button>
            </div>
            
            <div className="flex items-center justify-center text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Melayani Kuala Lumpur, Selangor, Putrajaya & Kawasan Sekitar</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
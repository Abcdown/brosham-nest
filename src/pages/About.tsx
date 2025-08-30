import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Home, Star, Phone, Mail, MapPin, Shield, Clock, TrendingUp } from "lucide-react";
import agentPortrait from "@/assets/agent-portrait.jpg";

const About = () => {
  const stats = [
    { icon: Home, label: "Hartanah Terjual", value: "500+" },
    { icon: Users, label: "Pelanggan Berpuas Hati", value: "250+" },
    { icon: Award, label: "Tahun Pengalaman", value: "15+" },
    { icon: Star, label: "Purata Rating", value: "4.9" },
  ];

  const services = [
    "Jual Beli Hartanah Kediaman",
    "Konsultasi Hartanah Pelaburan",
    "Analisis Pasaran & Penilaian",
    "Perkhidmatan Pengurusan Hartanah",
    "Program Pembeli Kali Pertama",
    "Pakar Rumah Mewah",
  ];

  const credentials = [
    { title: "Lesen Ejen", value: "REN 12345" },
    { title: "Kawasan Perkhidmatan", value: "Kuala Lumpur & Selangor" },
    { title: "Kepakaran", value: "Hartanah Mewah & Komersial" },
    { title: "Pensijilan", value: "CEA Certified" }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 bg-white">Tentang BroSham Properties</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Rakan Hartanah Terpercaya Anda
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Dengan lebih 15 tahun pengalaman dalam industri hartanah, kami komited membantu anda mencari rumah sempurna dan mencapai matlamat hartanah anda.
            </p>
          </div>
        </div>
      </section>

      {/* Agent Profile */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full"></div>
                <img
                  src={agentPortrait}
                  alt="Ejen BroSham Properties"
                  className="relative w-full max-w-lg mx-auto rounded-3xl shadow-hero"
                />
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-secondary/20 rounded-full"></div>
              </div>
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-6">Temui Pakar Hartanah Anda</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                    Halo! Saya Sarah Brosham, pengasas BroSham Properties. Minat saya terhadap hartanah bermula lebih 15 tahun lalu, dan sejak itu, saya telah mendedikasikan kerjaya saya untuk membantu keluarga mencari rumah impian mereka dan pelabur membina portfolio mereka.
                  </p>
                  <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                    Saya percaya bahawa membeli atau menjual rumah adalah salah satu keputusan terpenting dalam hidup. Itulah sebabnya saya komited menyediakan perkhidmatan peribadi, pengetahuan pasaran pakar, dan sokongan tanpa henti sepanjang perjalanan hartanah anda.
                  </p>
                </div>

                {/* Agent Credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {credentials.map((cred, index) => (
                    <div key={index} className="bg-muted/30 p-4 rounded-xl">
                      <div className="text-sm text-muted-foreground font-medium">{cred.title}</div>
                      <div className="text-lg font-bold text-primary">{cred.value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-gradient-hero hover:opacity-90 transition-opacity">
                    <Phone className="w-5 h-5 mr-2" />
                    019-703 4036
                  </Button>
                  <Button variant="outline" size="lg" className="border-2">
                    <Mail className="w-5 h-5 mr-2" />
                    sarah@broshamproperties.com
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Hasil Yang Membuktikan</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center group hover:transform hover:scale-105 transition-transform duration-300">
                    <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-white/80 font-medium text-lg">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 bg-white">Perkhidmatan Kami</Badge>
              <h2 className="text-4xl font-bold mb-6">Perkhidmatan Yang Kami Tawarkan</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0">
                  <CardContent className="p-8">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-hero rounded-full mr-6"></div>
                      <span className="font-semibold text-lg">{service}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Misi Kami</h2>
            <p className="text-xl opacity-90 leading-relaxed max-w-4xl mx-auto">
              Di BroSham Properties, misi kami adalah menjadikan impian hartanah anda menjadi kenyataan. Kami menggabungkan pengetahuan pasaran yang mendalam dengan perkhidmatan peribadi untuk memastikan setiap pelanggan menerima perhatian dan kepakaran yang mereka layak terima. Sama ada anda membeli rumah pertama, menaik taraf ke hartanah impian, atau membuat pelaburan strategik, kami di sini untuk membimbing anda setiap langkah.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Bersedia Untuk Bermula?</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Mari bincangkan matlamat hartanah anda dan cipta rancangan untuk mencapainya.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90 transition-opacity px-8 py-4 text-lg">
                Jadual Konsultasi
              </Button>
              <Button variant="outline" size="lg" className="border-2 px-8 py-4 text-lg">
                <MapPin className="w-5 h-5 mr-2" />
                Lawat Pejabat Kami
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Home, Star, Phone, Mail, CheckCircle2 } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Home, label: "Properties Sold", value: "6 Units" },
    { icon: Users, label: "in 24 Hours", value: "Record" },
    { icon: Award, label: "Years Experience", value: "10+" },
    { icon: Star, label: "Customer Rating", value: "4.9" },
  ];

  const credentials = [
    { title: "Agent License", value: "REN 41336" },
    { title: "Service Areas", value: "Johor, Selangor, Melaka, KL" },
    { title: "Specialties", value: "Property Management & Development" },
    { title: "Agency", value: "GPLEX ICONIC JB" }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 bg-white">About BroSham Properties</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              ABOUT ME
            </h1>
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
                  src="/lovable-uploads/92e54a24-50e7-422c-a376-9a09682f92ec.png"
                  alt="Mohd Noorhisham - Bro Sham"
                  className="relative w-full max-w-lg mx-auto rounded-3xl shadow-hero"
                />
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-secondary/20 rounded-full"></div>
              </div>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-primary">
                    ASSALAMMUALAIKUM DAN SALAM SEJAHTERA
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                    Nama saya <span className="font-semibold text-primary">Mohd Noorhisham</span> atau lebih mesra <span className="font-semibold text-primary">Bro Sham</span>. Saya merupakan perunding hartanah berdaftar <span className="font-semibold text-primary">REN 41336</span> dari agensi <span className="font-semibold text-primary">GPLEX ICONIC JB</span>. Dengan ilmu yang ada, Insya Allah saya akan terus membantu lebih ramai sahabat untuk memiliki rumah idaman dan menjual hartanah pada harga yang terbaik.
                  </p>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                    Saya ada banyak rumah projek baru di seluruh Malaysia dan juga rumah subsales sekitar negeri Johor khususnya di Johor Bahru.
                  </p>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                    Jika tuan puan, saudara mara atau kenalan yang berhajat nak menjual atau membeli hartanah boleh hubungi saya. Insya Allah saya akan cuba berikan servis yang lebih baik walaupun bukan yg terbaik.
                  </p>
                  <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                    Dengan kepakaran & sokongan dari team, saya berharap dapat membantu anda untuk menguruskan hal berkaitan jual, beli, sewa & pembiayaan semula hartanah anda dengan cara yang betul dan mudah.
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

              </div>
            </div>
            
            {/* Full Width Article Content */}
            <div className="max-w-6xl mx-auto mt-20">
              <div className="bg-gradient-card p-8 md:p-12 rounded-3xl shadow-elegant">
                <div className="prose prose-lg max-w-none text-foreground">
                  <p className="text-lg leading-relaxed mb-8">
                    Saya juga telah memecah rekod menjual sebanyak <span className="font-semibold text-primary">6 unit rumah dalam tempoh 24jam</span>. Seterusnya, terdapat situasi yang mencapai closing secara atas talian antara pembeli di Singapore dan hartanah di Johor. Di samping itu, saya membantu pelanggan yang mempunyai rekod tidak cantik dengan pihak bank dalam tempoh 6 bulan, Alhamdulillah pelanggan tersebut dapat memiliki rumah idamannya.
                  </p>

                  <h3 className="text-2xl font-bold text-primary mb-8">Antara kepakaran Bro Sham</h3>
                  
                  <div className="space-y-4 mb-8">
                    <p className="flex items-start text-lg leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      Semak kelayakan Loan dan harga pasaran rumah Terkini secara PERCUMA.
                    </p>
                    <p className="flex items-start text-lg leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      Semak rekod CRISS/CTOS secara PERCUMA.
                    </p>
                    <p className="flex items-start text-lg leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      Mendapatkan pembeli yang berpotensi dengan kadar segera.
                    </p>
                    <p className="flex items-start text-lg leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      Khidmat nasihat jual beli hartanah.
                    </p>
                    <p className="flex items-start text-lg leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      Khidmat urusan pinjaman perumahan LPPSA dan bank.
                    </p>
                    <p className="flex items-start text-lg leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      Menyediakan khidmat guaman.
                    </p>
                    <p className="flex items-start text-lg leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      Refinance dari LPPSA ke Bank atau bank ke bank.
                    </p>
                    <p className="flex items-start text-lg leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      Selain menguruskan proses jual beli hartanah, saya juga menyediakan khidmat mengubah suai dan membaik pulih hartanah.
                    </p>
                  </div>

                  <p className="text-lg leading-relaxed mb-8">
                    Perkhidmatan saya meliputi kawasan di <span className="font-semibold text-primary">Johor, Melaka dan Kuala Lumpur</span>. Sekiranya mempunyai permintaan di Pantai Timur atau Utara, usah risau saya ada team yg terbaik di sana.
                  </p>

                  <p className="text-lg leading-relaxed mb-8">
                    Kepada pelanggan yang berkeinginan membeli rumah atau mempunyai rekod kurang cantik jangan malu atau segan, kami sedia membantu sehingga anda memiliki rumah idaman!
                  </p>

                  <p className="text-lg leading-relaxed mb-8 font-semibold">
                    Introducer juga ada commission yg lumayan!
                  </p>

                  <div className="text-center mt-12">
                    <div className="text-xl font-bold text-primary mb-2">Bro Sham</div>
                    <div className="text-lg font-semibold tracking-wider text-muted-foreground">
                      COMMITMENTS, CONSISTENCY, RESPONSIBILITY
                    </div>
                  </div>
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


      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Property Journey?</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Let's discuss your property goals and create a plan to achieve them.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90 transition-opacity px-8 py-4 text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Call Bro Sham
              </Button>
              <Button variant="outline" size="lg" className="border-2 px-8 py-4 text-lg">
                <Mail className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MessageCircle, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import heroImage from "@/assets/hero-property.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Hartanah Mewah"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[60vh]">
          {/* Left Panel - Content */}
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              BROSHAM
              <span className="block text-secondary mt-2 text-2xl md:text-3xl font-normal">PERUNDING HARTANAH ANDA</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 drop-shadow">
              Temui hartanah istimewa di lokasi terbaik. Rumah impian anda menanti dengan bimbingan pakar dan perkhidmatan peribadi kami.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex flex-col gap-3 text-white">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-secondary" />
                  <span className="font-medium">Tel: 019-703 4036</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-3 text-secondary" />
                  <span className="font-medium">WhatsApp: 019-703 4036</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-4">
                <span className="text-white text-sm">FIND ME ON</span>
                <div className="flex gap-3">
                  <Button size="icon" variant="outline" className="w-10 h-10 rounded-full bg-white/10 border-white/20 hover:bg-white/20">
                    <Instagram className="w-4 h-4 text-white" />
                  </Button>
                  <Button size="icon" variant="outline" className="w-10 h-10 rounded-full bg-white/10 border-white/20 hover:bg-white/20">
                    <Facebook className="w-4 h-4 text-white" />
                  </Button>
                  <Button size="icon" variant="outline" className="w-10 h-10 rounded-full bg-white/10 border-white/20 hover:bg-white/20">
                    <Youtube className="w-4 h-4 text-white" />
                  </Button>
                  <Button size="icon" variant="outline" className="w-10 h-10 rounded-full bg-white/10 border-white/20 hover:bg-white/20">
                    <Twitter className="w-4 h-4 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Contact Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-hero w-full max-w-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Pilihan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beli">Saya hendak membeli</SelectItem>
                    <SelectItem value="jual">Saya hendak menjual</SelectItem>
                    <SelectItem value="sewa">Saya hendak menyewa</SelectItem>
                    <SelectItem value="sewakan">Saya hendak menyewakan</SelectItem>
                    <SelectItem value="nasihat">Saya perlukan nasihat</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Nama"
                  className="h-12 border-border"
                />
              </div>
              
              <div className="mb-4">
                <Textarea
                  placeholder="Maklumat"
                  className="min-h-[100px] border-border resize-none"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Input
                  placeholder="No Tel."
                  type="tel"
                  className="h-12 border-border"
                />
                <Input
                  placeholder="Email"
                  type="email"
                  className="h-12 border-border"
                />
              </div>
              
              <Button size="lg" className="w-full h-12 bg-gradient-hero hover:opacity-90 transition-opacity text-lg font-medium">
                HUBUNGI SAYA
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
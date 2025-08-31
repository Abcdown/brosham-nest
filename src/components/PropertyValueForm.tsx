import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PropertyValueForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      propertyAddress: formData.get('propertyAddress'),
      propertyType: formData.get('propertyType'),
      additionalInfo: formData.get('additionalInfo'),
      type: 'property-valuation'
    };

    try {
      // Send to both email addresses
      const emailData = {
        to: ['sham@broshamproperties.my', 'support@broshamproperties.my'],
        subject: 'Semakan Nilai Hartanah - ' + data.name,
        body: `
Nama: ${data.name}
Telefon: ${data.phone}
Email: ${data.email}
Alamat Hartanah: ${data.propertyAddress}
Jenis Hartanah: ${data.propertyType}
Maklumat Tambahan: ${data.additionalInfo}
        `
      };

      // Here you would integrate with your email service
      console.log('Sending property valuation request:', emailData);
      
      toast({
        title: "Permintaan Dihantar",
        description: "Kami akan menghubungi anda dalam masa 24 jam untuk semakan nilai hartanah.",
      });
      
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Ralat",
        description: "Terdapat masalah menghantar permintaan. Sila cuba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-lg">
          <Calculator className="w-5 h-5 text-primary" />
          Semak Nilai Hartanah
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <Input
              name="name"
              placeholder="Nama Penuh"
              required
              className="h-11"
            />
            <Input
              name="phone"
              placeholder="No. Telefon"
              type="tel"
              required
              className="h-11"
            />
            <Input
              name="email"
              placeholder="Email"
              type="email"
              required
              className="h-11"
            />
            <Input
              name="propertyAddress"
              placeholder="Alamat Hartanah"
              required
              className="h-11"
            />
            <Input
              name="propertyType"
              placeholder="Jenis Hartanah (Rumah/Apartment/dll)"
              required
              className="h-11"
            />
            <Textarea
              name="additionalInfo"
              placeholder="Maklumat Tambahan (opsional)"
              className="min-h-[80px] resize-none"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-11 bg-gradient-hero hover:opacity-90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Menghantar..." : "Hantar Permintaan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyValueForm;
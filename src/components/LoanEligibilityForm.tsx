import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LoanEligibilityForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employmentType, setEmploymentType] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      monthlyIncome: formData.get('monthlyIncome'),
      employmentType: employmentType,
      loanAmount: formData.get('loanAmount'),
      additionalInfo: formData.get('additionalInfo'),
      type: 'loan-eligibility'
    };

    try {
      // Send to both email addresses
      const emailData = {
        to: ['sham@broshamproperties.my', 'support@broshamproperties.my'],
        subject: 'Semakan Kelayakan Loan - ' + data.name,
        body: `
Nama: ${data.name}
Telefon: ${data.phone}
Email: ${data.email}
Pendapatan Bulanan: ${data.monthlyIncome}
Jenis Pekerjaan: ${data.employmentType}
Jumlah Loan Diperlukan: ${data.loanAmount}
Maklumat Tambahan: ${data.additionalInfo}
        `
      };

      // Here you would integrate with your email service
      console.log('Sending loan eligibility request:', emailData);
      
      toast({
        title: "Permintaan Dihantar",
        description: "Kami akan menghubungi anda dalam masa 24 jam untuk semakan kelayakan loan.",
      });
      
      (e.target as HTMLFormElement).reset();
      setEmploymentType("");
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
          <CreditCard className="w-5 h-5 text-primary" />
          Semak Kelayakan Loan
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
              name="monthlyIncome"
              placeholder="Pendapatan Bulanan (RM)"
              type="number"
              required
              className="h-11"
            />
            <Select value={employmentType} onValueChange={setEmploymentType} required>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Jenis Pekerjaan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="government">Kerajaan</SelectItem>
                <SelectItem value="private">Swasta</SelectItem>
                <SelectItem value="self-employed">Bekerja Sendiri</SelectItem>
                <SelectItem value="business">Perniagaan</SelectItem>
                <SelectItem value="retired">Pesara</SelectItem>
              </SelectContent>
            </Select>
            <Input
              name="loanAmount"
              placeholder="Jumlah Loan Diperlukan (RM)"
              type="number"
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

export default LoanEligibilityForm;
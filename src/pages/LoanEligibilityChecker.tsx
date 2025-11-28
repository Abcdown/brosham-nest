import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Shield, CheckCircle, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const LoanEligibilityChecker = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    nric: "",
    monthlyIncome: "",
    employmentType: "",
    employmentLength: "",
    existingLoans: "",
    creditCardDebt: "",
    propertyPrice: "",
    loanAmount: "",
    loanTenure: "",
    purposeOfLoan: "",
    maritalStatus: "",
    dependents: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would integrate with your email service
    console.log("Form data:", formData);
    
    toast({
      title: "Permohonan Berjaya!",
      description: "Kami akan semak kelayakan loan dan CTOS anda dalam masa 24 jam.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      nric: "",
      monthlyIncome: "",
      employmentType: "",
      employmentLength: "",
      existingLoans: "",
      creditCardDebt: "",
      propertyPrice: "",
      loanAmount: "",
      loanTenure: "",
      purposeOfLoan: "",
      maritalStatus: "",
      dependents: ""
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Shield className="w-4 h-4 mr-2" />
              Semakan Percuma
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Semak Kelayakan Loan & CTOS
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Semak kelayakan pinjaman perumahan dan status CTOS anda secara percuma. 
              Dapatkan nasihat pakar untuk meningkatkan peluang kelulusan loan.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 mr-2 text-primary" />
                  Maklumat Kelayakan Loan
                </CardTitle>
                <p className="text-muted-foreground">
                  Sila isi maklumat dengan tepat untuk mendapatkan analisis yang akurat
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nama Penuh *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="nric">No. KP / Pasport *</Label>
                      <Input
                        id="nric"
                        value={formData.nric}
                        onChange={(e) => handleInputChange("nric", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Emel *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">No. Telefon *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Employment Information */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="monthlyIncome">Pendapatan Bulanan (RM) *</Label>
                      <Input
                        id="monthlyIncome"
                        value={formData.monthlyIncome}
                        onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                        placeholder="cth: 5000"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="employmentType">Jenis Pekerjaan *</Label>
                      <Select value={formData.employmentType} onValueChange={(value) => handleInputChange("employmentType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis pekerjaan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="permanent">Pekerja Tetap</SelectItem>
                          <SelectItem value="contract">Kontrak</SelectItem>
                          <SelectItem value="self-employed">Bekerja Sendiri</SelectItem>
                          <SelectItem value="business-owner">Pemilik Perniagaan</SelectItem>
                          <SelectItem value="freelancer">Pekerja Bebas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="employmentLength">Tempoh Bekerja (tahun)</Label>
                      <Input
                        id="employmentLength"
                        value={formData.employmentLength}
                        onChange={(e) => handleInputChange("employmentLength", e.target.value)}
                        placeholder="cth: 3"
                      />
                    </div>
                  </div>

                  {/* Financial Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="existingLoans">Komitmen Loan Sedia Ada (RM/bulan)</Label>
                      <Input
                        id="existingLoans"
                        value={formData.existingLoans}
                        onChange={(e) => handleInputChange("existingLoans", e.target.value)}
                        placeholder="cth: 800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="creditCardDebt">Hutang Kad Kredit (RM)</Label>
                      <Input
                        id="creditCardDebt"
                        value={formData.creditCardDebt}
                        onChange={(e) => handleInputChange("creditCardDebt", e.target.value)}
                        placeholder="cth: 2000"
                      />
                    </div>
                  </div>

                  {/* Loan Details */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="propertyPrice">Harga Hartanah (RM)</Label>
                      <Input
                        id="propertyPrice"
                        value={formData.propertyPrice}
                        onChange={(e) => handleInputChange("propertyPrice", e.target.value)}
                        placeholder="cth: 500000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="loanAmount">Jumlah Loan Diperlukan (RM)</Label>
                      <Input
                        id="loanAmount"
                        value={formData.loanAmount}
                        onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                        placeholder="cth: 450000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="loanTenure">Tempoh Loan (tahun)</Label>
                      <Select value={formData.loanTenure} onValueChange={(value) => handleInputChange("loanTenure", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tempoh" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 tahun</SelectItem>
                          <SelectItem value="20">20 tahun</SelectItem>
                          <SelectItem value="25">25 tahun</SelectItem>
                          <SelectItem value="30">30 tahun</SelectItem>
                          <SelectItem value="35">35 tahun</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="purposeOfLoan">Tujuan Loan</Label>
                      <Select value={formData.purposeOfLoan} onValueChange={(value) => handleInputChange("purposeOfLoan", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tujuan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="first-home">Rumah Pertama</SelectItem>
                          <SelectItem value="second-home">Rumah Kedua</SelectItem>
                          <SelectItem value="investment">Pelaburan</SelectItem>
                          <SelectItem value="refinance">Refinance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="maritalStatus">Status Perkahwinan</Label>
                      <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange("maritalStatus", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Bujang</SelectItem>
                          <SelectItem value="married">Berkahwin</SelectItem>
                          <SelectItem value="divorced">Bercerai</SelectItem>
                          <SelectItem value="widowed">Janda/Duda</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dependents">Bilangan Tanggungan</Label>
                      <Input
                        id="dependents"
                        value={formData.dependents}
                        onChange={(e) => handleInputChange("dependents", e.target.value)}
                        placeholder="cth: 2"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button type="submit" size="lg" className="px-8">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Semak Kelayakan
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </div>
  );
};

export default LoanEligibilityChecker;
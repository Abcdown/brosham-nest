import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, MapPin, Calculator } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PropertyValueChecker = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    propertyAddress: "",
    propertyState: "",
    builtUpArea: "",
    landArea: "",
    bedrooms: "",
    bathrooms: "",
    age: "",
    condition: "",
    additionalInfo: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would integrate with your email service
    // For now, we'll just show a success message
    console.log("Form data:", formData);
    
    toast({
      title: "Permohonan Berjaya!",
      description: "Kami akan menghubungi anda dalam masa 24 jam untuk memberikan anggaran nilai hartanah.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      propertyType: "",
      propertyAddress: "",
      propertyState: "",
      builtUpArea: "",
      landArea: "",
      bedrooms: "",
      bathrooms: "",
      age: "",
      condition: "",
      additionalInfo: ""
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              <Calculator className="w-4 h-4 mr-2" />
              Penilaian Percuma
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Semak Nilai Hartanah
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Dapatkan anggaran nilai pasaran hartanah anda secara percuma dalam masa 24 jam. 
              Analisis komprehensif oleh pakar hartanah berpengalaman.
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
                  <Home className="w-6 h-6 mr-2 text-primary" />
                  Maklumat Hartanah
                </CardTitle>
                <p className="text-muted-foreground">
                  Sila isi maklumat hartanah untuk mendapatkan anggaran nilai yang tepat
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-3 gap-4">
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

                  {/* Property Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="propertyType">Jenis Hartanah *</Label>
                      <Select value={formData.propertyType} onValueChange={(value) => handleInputChange("propertyType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis hartanah" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="terrace">Rumah Teres</SelectItem>
                          <SelectItem value="semi-d">Semi-D</SelectItem>
                          <SelectItem value="detached">Banglo</SelectItem>
                          <SelectItem value="apartment">Apartmen</SelectItem>
                          <SelectItem value="condo">Kondominium</SelectItem>
                          <SelectItem value="townhouse">Rumah Bandar</SelectItem>
                          <SelectItem value="others">Lain-lain</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="propertyState">Negeri *</Label>
                      <Select value={formData.propertyState} onValueChange={(value) => handleInputChange("propertyState", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih negeri" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="johor">Johor</SelectItem>
                          <SelectItem value="melaka">Melaka</SelectItem>
                          <SelectItem value="kl">Kuala Lumpur</SelectItem>
                          <SelectItem value="selangor">Selangor</SelectItem>
                          <SelectItem value="others">Lain-lain</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="propertyAddress">Alamat Hartanah *</Label>
                    <Textarea
                      id="propertyAddress"
                      value={formData.propertyAddress}
                      onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                      placeholder="Sila nyatakan alamat lengkap termasuk poskod"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="builtUpArea">Keluasan Binaan (kaki persegi)</Label>
                      <Input
                        id="builtUpArea"
                        value={formData.builtUpArea}
                        onChange={(e) => handleInputChange("builtUpArea", e.target.value)}
                        placeholder="cth: 1200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="landArea">Keluasan Tanah (kaki persegi)</Label>
                      <Input
                        id="landArea"
                        value={formData.landArea}
                        onChange={(e) => handleInputChange("landArea", e.target.value)}
                        placeholder="cth: 1500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bedrooms">Bilik Tidur</Label>
                      <Input
                        id="bedrooms"
                        value={formData.bedrooms}
                        onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                        placeholder="cth: 4"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bathrooms">Bilik Air</Label>
                      <Input
                        id="bathrooms"
                        value={formData.bathrooms}
                        onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                        placeholder="cth: 3"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Umur Hartanah (tahun)</Label>
                      <Input
                        id="age"
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        placeholder="cth: 10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="condition">Keadaan Hartanah</Label>
                      <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih keadaan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Cemerlang</SelectItem>
                          <SelectItem value="good">Baik</SelectItem>
                          <SelectItem value="average">Sederhana</SelectItem>
                          <SelectItem value="needs-renovation">Perlu Dibaik Pulih</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="additionalInfo">Maklumat Tambahan</Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                      placeholder="Nyatakan sebarang maklumat tambahan seperti kemudahan berdekatan, pengubahsuaian yang dibuat, dll."
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button type="submit" size="lg" className="px-8">
                      <MapPin className="w-4 h-4 mr-2" />
                      Hantar Permohonan
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

export default PropertyValueChecker;
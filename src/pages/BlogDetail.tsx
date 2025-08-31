import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams();

  // Blog posts with full content
  const blogPosts = {
    "1": {
      id: "1",
      title: "Mari Teliti Pembentangan Bajet 2023 Berkaitan Hartanah",
      content: `
Pengeculian bayaran duti setem 100% diberikan khas untuk rumah berharga kurang RM500,000. Sehingga akhir tahun 2025.

**Contoh:**

Pembelian rumah pertama berharga RM300,000 akan menerima 100% pengecualian bayaran kos duti setem. Ini bermakna pembeli akan jimat RM 6,500.

Pengecualian bayaran duti setem daripada sebelumnya sebanyak 50% telah dinaikan kepada 75% untuk pembelian rumah pertama khas untuk rumah berharga RM500,000 sehingga 1,000,000. Sehingga 31 Disember 2023.

**Contoh:**

Pembelian rumah pertama berharga RM750,000 akan menerima 75% pengecualian bayaran kos duti setem. Ini bermakna akan jimat RM15,000.

> Berdasarkan dari bajet 2023 ini ianya telah memberi khabar gembira untuk pembeli-pembeli rumah pertama untuk mendapatkan rumah idaman.

Tunggu apa lagi? Rebut peluang ini! Semakin lama, nilai hartanah semakin naik tau!

## PEMBENTANGAN BAJET 2023

**Bajet 2023 – Pinjaman Syarikat Jaminan Kredit Perumahan (SJKP)**

Peruntukan sebanyak RM3billion diberikan kepada bank untuk membiayai pinjaman rumah SJKP. Antara 12,000 peminjam yang bakal layak menerima.

Inisiatif ini akan dapat membantu lebih ramai PEMBELI RUMAH PERTAMA MILIKI RUMAH IDAMAN mereka.
      `,
      author: "Sarah Brosham",
      date: "October 12, 2022",
      category: "Property",
      image: "https://i0.wp.com/www.broshamproperties.my/wp-content/uploads/2022/10/Bajet-2023-Galakkan-Rumah-Pertama.jpeg?fit=1080%2C1080&ssl=1",
      readTime: "6 min read",
    },
    "2": {
      id: "2", 
      title: "Kepentingan Deposit Rumah Sewa",
      content: `
Blog sebelum ini, Bro Sham ada ulas mengenai deposit rumah sewa. Melalui blog itu, saya ada nyatakan bahawa deposit rumah sewa memang PENTING untuk kedua-dua belah pihak. Hal ini bagi mengelakkan daripada apa-apa yang tidak diigini berlaku di masa akan datang. Jadi dalam blog kali ini, Bro Sham akan terangkannya:

### 1. Meyakinkan tuan rumah tentang cara pembayaran sewa bulanan oleh penyewa.

Sebagai tuan rumah mestilah mereka mahukan penyewanya mampu membayar sewa bulanan dengan baik. Oleh itu, dengan menggalakkan pembayaran deposit rumah sewa ini, ianya boleh membantu tuan rumah menilai sendiri sama ada bakal penyewanya itu boleh membayar sewa pada masa akan datang tanpa masalah atau tidak. Sekiranya pada peringkat awal penyewa sudah tidak mampu memberikan komitmen, besar kemungkinan ia boleh menjadi masalah di masa akan datang.

### 2. Jaminan kepada tuan rumah sekiranya berlaku kerosakan

Sekiranya berlaku sebarang kerosakan yang disebabkan oleh penyewa, tuan rumah boleh menggunakan wang deposit tersebut untuk menanggung kos pembaikian semula. Ini bukan sahaja boleh memberi kebaikan kepada tuan rumah malah juga pada penyewa sebab tak perlu pening-pening lagi nak sediakan duit bagi membayar kos kerosakan sebab sudah membayar deposit sebelum menyewa.

### 3. Boleh melunaskan tunggakan bil utiliti

Sekiranya penyewa ada tunggakan bil utiliti seperti bil air, elektrik atau internet yang perlu dibayar tapi dah habis tempoh sewaan, tuan rumah boleh guna wang deposit untuk melunaskan tunggakan tersebut.

### 4. Untuk menampung kos pembersihan rumah

Kadang-kadang rumah yang disewakan dalam keadaan kotor dan perlu dibersihkan selepas penyewa berpindah. Wang deposit boleh digunakan untuk mengupah orang untuk membersihkan rumah supaya rumah dalam keadaan bersih untuk penyewa yang seterusnya.

Jadi, deposit rumah sewa memang penting untuk kedua-dua belah pihak. Ia bukan sahaja melindungi kepentingan tuan rumah malah juga penyewa dari segi kewangan.
      `,
      author: "Sarah Brosham",
      date: "March 18, 2023",
      category: "Property", 
      image: "https://i0.wp.com/www.broshamproperties.my/wp-content/uploads/2023/03/Kepentingan-Deposit-Rumah-Sewa.jpeg?fit=1080%2C1080&ssl=1",
      readTime: "5 min read",
    },
    "3": {
      id: "3",
      title: "Cara Elak Di Tipu Scammer Rumah Sewa", 
      content: `
Sebelum ini Bro Sham ada ulas cara nak kenalpasti sama ada individu tersebut adalah seorang scammer rumah sewa atau tidak. Boleh baca di sini, Cara Kenalpasti Scammer Rumah Sewa.

Tapi hari ini Bro Sham nak share pula perkara – perkara yang boleh anda lakukan untuk memastikan anda tidak ditipu oleh scammer rumah sewa sama ada sebelum atau selepas perjanjian sewa beli dimeterai.

## SEBELUM

### CARI RUMAH SEWA MELALUI PERUNDING HARTANAH

Seperti semua sedia maklum, proses yang melibatkan hartanah memang agak rumit dan memakan masa yang lama. Jadi sebab itu juga, ramai tuan rumah atau penyewa tidak mahu menggunkan khidmat perunding hartanah sebab nak mudah dan cepat. Namun, keburukannya anda terpaksa berhadapan dengan pelbagai risiko untuk ditipu.

Sebagai perunding hartanah, setiap kali kami menerima listing rumah sewa, kami akan buat inspection terlebih dahulu sebelum mengiklankan hartanah tersebut. Hal ini demikian untuk membuktikan rumah itu benar-benar wujud, dalam keadaan yang baik untuk disewa dan memastikan individu tersebut benar-benar pemilik asal rumah tersebut. Dengan adanya khidmat seperti ini akan memudahkan kedua-dua belah pihak dan dapat elak dari sebarang bentuk penipuan.

### JUMPA TUAN RUMAH (FACE TO FACE)

Pastikan anda berjumpa dengan tuan rumah secara bersemuka dan buat viewing rumah bersama-sama sebelum membuat sebarang bayaran deposit. Elakkan dari membuat sebarang bayaran sebelum berjumpa dengan tuan rumah. Jangan terlalu percaya dengan gambar-gambar rumah yang dihantar melalui WhatsApp.

### TENGOK GERAN RUMAH

Pastikan nama dalam geran rumah sama dengan nama tuan rumah yang anda berjumpa. Sekiranya nama dalam geran rumah berbeza dengan nama tuan rumah, pastikan anda ada surat kuasa wakil yang sah untuk membuktikan individu tersebut diberi kuasa untuk menyewakan rumah tersebut.

## SELEPAS

### BUAT TENANCY AGREEMENT

Memang agak leceh nak buat tenancy agreement ni tapi ianya PENTING sebab nanti kalau ada apa-apa masalah, dokumen ni lah yang akan jadi rujukan. Dalam tenancy agreement ni semua perkara berkaitan dengan sewaan akan dinyatakan dengan jelas. Antara perkara yang akan ada dalam tenancy agreement ialah:

- Tempoh sewaan
- Kadar sewa bulanan  
- Deposit yang dibayar
- Syarat-syarat sewaan
- Hak dan tanggungjawab kedua-dua belah pihak

Pastikan kedua-dua belah pihak faham dengan apa yang tertulis dalam tenancy agreement sebelum menandatanganinya.
      `,
      author: "Sarah Brosham", 
      date: "March 18, 2023",
      category: "Property",
      image: "https://i0.wp.com/www.broshamproperties.my/wp-content/uploads/2023/03/Cara-Elak-DiTipu-Scammer-Rumah-Sewa.jpeg?fit=1080%2C1080&ssl=1",
      readTime: "7 min read",
    },
    "4": {
      id: "4",
      title: "Apa Itu Deposit Rumah Sewa",
      content: `
Ramai yang beranggapan bahawa deposit sewa rumah ini sebenarnya membebankan penyewa dan tidak perlu pon diwujudkan. Tapi tahukah anda tanggapan ini sememangnya tidak benar. Kenapa? Jom kita baca lebih lanjut…

Sebelum itu, Bro Sham terangkan dulu apa itu 'Deposit Sewa Rumah'.

Secara umumnya, deposit rumah sewa ialah sejumlah wang yang diserahkan oleh pihak penyewa kepada tuan rumah sebagai salah satu syarat wajib sebelum masuk menyewa. Wang tersebut akan menjadi jaminan kepada tuan rumah sekiranya berlaku sebarang kerosakan, tunggakan atau masalah yang berkaitan. Wang tersebut juga akan dipulangkan kepada penyewa selepas tamat tempoh menyewa SEKIRANYA tiada sebarang masalah yang timbul.

### Jenis deposit rumah sewa

**1. Deposit Tempahan (Booking Deposit)**

Deposit tempahan akan diserahkan kepada tuan rumah setelah pihak penyewa bersetuju untuk menyewa rumah tersebut. Sekiranya tuan rumah telah menerima deposit ini, bermakna beliau tidak boleh lagi menerima tawaran daripada mana–mana pihak lagi. Kebiasaannya, tuan rumah akan minta jumlah deposit serta jumlah sewa bulanan.

**2. Deposit Utiliti**

Deposit utiliti ini biasanya dikenakan kepada pihak penyewa sekiranya mereka akan menanggung bil elektrik dan air sepanjang tempoh menyewa. Hal ini bagi mengurangkan risiko sekiranya terdapat sebarang tunggakan. Kebiasaannya, jumlah deposit utiliti akan diminta bersamaan dengan sewa bulanan.

**3. Deposit Sekuriti**

Deposit sekuriti ini lebih dikenali sebagai wang perlindungan bagi pihak tuan. Tuan rumah boleh menggunakan deposit ini untuk menanggung kerugian sekiranya berlaku sebarang kerosakan yang disebabkan oleh pihak penyewa. Segala kos pembaikian akan ditolak daripada deposit sekeruti tersebut.

Biasanya, penyewa perlu memaklumkan kepada pihak tuan rumah dua bulan awal sekiranya ingin menamatkan tempoh menyewa. Namun, sekiranya pihak penyewa gagal melakukan perkara tersebut, pihak tuan rumah berhak menolak deposit sekuriti tersebut untuk menggantikan kos kerugian dua bulannya.

Jenis deposit sekuriti yang sering digunakan:

> **1+1**
> 
> 1 Deposit Sekuriti + 1 Deposit Utiliti
> 
> RM1,000 + RM 1,000 = RM2,000
>
> **2+1**
>
> 2 Deposit Sekuriti + 1 Deposit Utiliti
>
> RM2,000 + RM1,000 = RM3,000
>
> **2+1+1**
>
> 2 Deposit Sekuriti + 1 Deposit Utiliti + 1 Sewa Bulanan Pertama
>
> RM2,000 + RM1,000 + RM1,000 = RM 4,000
      `,
      author: "Sarah Brosham",
      date: "March 3, 2023",
      category: "Property",
      image: "https://i0.wp.com/www.broshamproperties.my/wp-content/uploads/2023/03/Apa-Itu-Deposit-Rumah-Sewa.jpeg?fit=1080%2C1080&ssl=1",
      readTime: "5 min read",
    },
    "5": {
      id: "5",
      title: "Cara Kenalpasti Scammer Rumah Sewa",
      content: `
Pada dunia digital sekarang, kegiatan scammer juga semakin berleluasa. Game plan mereka pon dah bercabang. Bukan setakat menjadi pegawai LHDN atau banker sahaja, baru-baru ini ada kes individu ditipu atau discam oleh mereka yang acah-acah menjadi owner rumah sewa. Kemudian senang-senang je duit anda dilesapkan.

Oleh itu, sebelum anda ingin sewa rumah. Pastikan rumah atau owner rumah itu adalah benar dan bukan scammer. Bagaimana nak kenalpasti perkara tersebut?

### HARGA SEWA TERLALU MURAH

Cara ini paling senang dan mudah untuk dikenalpasti. Selidik terlebih dahulu berapa market value untuk rumah sewa di kawasan tersebut. Sekiranya harga yang ditawarkan terlalu rendah, individu tersebut berpotensi adalah seorang scammer.

Dan paling senang bila anda bandingkan harga dengan keadaan rumah yang ditawarkan. Logik ke untuk rumah yang besar dan cantik dengan harga sewa yang serendah itu? Berhati-hati juga dengan iklan deposit yang terlalu rendah sebab itu juga salah satu taktik scammer untuk tarik penyewa.

### RUMAH SEWA INDAH KHABAR DARI RUPA

Yang ini anda perlu berhati-hati. Memandangkan rumah sewa ini mempunyai permintaan yang tinggi, jadi platform pengiklanannya juga luas. Contohnya di platform mudah.my, facebook dan banyak lagi. Oleh itu, senang jugalah scammer nak buat kegiatan mereka.

Sebab itu jangan mudah jatuh cinta bila tengok gambar yang indah-indah dekat platform tersebut. Belum tentu lagi rumah itu wujud atau 'seindah' itu. Kadang-kadang scammer ini main ambil sahaja gambar dari mana-mana dan info rumah juga tidak tepat.

### TUAN RUMAH ELAK JUMPA UNTUK VIEWING

Sekiranya betul tuan rumah tersebut adalah seorang scammer, kebiasaanya mereka akan elak untuk berjumpa. Sebab mereka tidak mahu muka mereka dikenali, takut – takut nanti anda buat laporan polis atau viralkan muka mereka. Tuan rumah yang betul -betul ingin sewakan rumah, mereka mesti ingin bersua muka dengan bakal penyewa. Iyalah nak bagi orang pinjam barang kita mestilah kita mahu tengok orang itu sama ada boleh dipercayai atau tidak.

Kebiasaanya scammer juga akan suruh anda pergi viewing rumah sendiri. Tetapi dapat tengok dari luar sahaja. Ini sudah terang lagi bersuluh yang mereka sebenarnya tiada akses pun untuk memberi anda masuk ke bahagian dalam rumah. Tuan rumah yang bagus atau tuan rumah ada melantik perunding hartanah, mereka akan sentiasa follow proses sewa beli yang betul.

### BOLEH PINDAH MASUK TANPA VIEWING

Sebelum anda nak proceed atau nak bayar deposit, lebih baik anda buat viewing terlebih dahulu. Risau kalau-kalau sebenarnya rumah itu tidak wujud pun tapi deposit sudah dibayar. Pastikan juga yang tuan rumah itu benar-benar memiliki hartanah tersebut. Sebab ada juga kes, penyewa sudah pindah masuk tiba-tiba tuan rumah sebenar datang dan tak izinkan rumahnya untuk disewa. Tak pasal-pasal penyewa kene keluar balik.
      `,
      author: "Sarah Brosham",
      date: "March 3, 2023",
      category: "Property",
      image: "https://i0.wp.com/www.broshamproperties.my/wp-content/uploads/2023/03/Cara-Kenal-Pasti-Scammer-Rumah-Sewa.jpeg?fit=1080%2C1080&ssl=1",
      readTime: "6 min read",
    },
    "6": {
      id: "6",
      title: "Ketahui Kos-Kos Tambahan Semasa Pembelian Rumah",
      content: `
Sudah masuk tahun 2023, tapi masih ada lagi segelintir pembeli hartanah yang tidak tahu atau kurang pengetahuan tentang caj-caj lain yang terlibat dalam proses jual beli hartanah. Ada yang terkejut bila dapat tahu ada kos atau yuran lain yang perlu mereka sediakan sebelum memeterai perjanjian.

Ramai tak tahu yang mereka bukan sahaja perlu sediakan bayaran pendahuluan, tapi mereka juga perlu sediakan bayaran tambahan untuk kos **CUKAI DUTI SETEM** dan **YURAN GUAMAN**. Oleh itu sebagai pembeli, anda perlu tahu dulu kos-kos yang terlibat supaya anda dapat merancang kewangan anda.

Jom baca penerangan lebih lanjut..

## CUKAI DUTI SETEM

Apa yang umum mengetahui, Duti Setem SPA hanya RM10 per salinan. Tetapi ada juga Duti Setem lain yang perlu diambil kira iaitu Duti Setem untuk Memorandum of Transfer (MOT) dan Surat Ikatan Penyerahan Hak (DOA). Kedua-dua yuran ini akan dikira berdasarkan pelan caj antara 1% hingga 4%.

### Contoh:

Ahmad membeli hartanah yang bernilai RM500,00. Bermakna Ahmad berada dalam kelompok pertama (1% untuk RM100,000) dan kedua (2% untuk RM400,000).

- Nilai hartanah = RM500,000
- 1% daripada RM100,000 = RM1,000  
- 2% daripada RM400,000 = RM8,000
- **Jumlah duti setem yang perlu dibayar = RM9,000**

Selain itu, bayaran cukai duti setem sebanyak 0.5% DARIPADA JUMLAH PENUH PINJAMAN juga dikenakan ke atas perjanjian pinjaman pembeli hartanah.

### Contoh:
- Nilai hartanah = RM500,000
- Pendahuluan = 10% x RM500,000 = RM 50,000
- Pembiayaan = 90% x RM500,000 = RM450,000
- **Jumlah duti setem yang perlu dibayar = RM450,000 x 0.5% = RM2,250**

## YURAN GUAMAN

Apakah itu yuran guaman?

Yuran guaman adalah sebahagian daripada SPA dan dicaj atas bantuan servis peguam dari segi proses perundangan semasa pembelian hartanah.

Yuran guaman akan dikira berdasarkan peratusan harga jualan hartanah, antara 0.5% sehingga ke 1% bergantung kepada nilai hartanah.

### Contoh:

Farhana membeli hartanah yang bernilai RM600,000, bermakna yuran guaman beliau berada dalam kelompok pertama (1% untuk RM500,000) dan kedua (0.8% untuk RM100,000).

- Nilai hartanah = RM600,000
- 1% daripada RM500,000 = RM5,000
- 0.8% daripada RM100,000 = RM800  
- **Jumlah yuran guaman = RM5,800**

Semoga serba sedikit penerangan daripada Bro Sham ini dapat memberi manfaat kepada para pembeli untuk merancang kewangan anda sebelum membeli rumah.
      `,
      author: "Sarah Brosham",
      date: "February 12, 2023",
      category: "Property", 
      image: "https://i0.wp.com/www.broshamproperties.my/wp-content/uploads/2023/02/Ketahui-Kos-Kos-Tambahan-Semasa-Pembelian-Rumah.jpeg?fit=1080%2C1080&ssl=1",
      readTime: "8 min read",
    }
  };

  const post = blogPosts[id as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <Badge variant="outline" className="mb-4">
                {post.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.trim() === '') return null;
                
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={index} className="text-xl font-semibold mt-8 mb-4">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                
                if (paragraph.startsWith('##')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mt-10 mb-6">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                
                if (paragraph.startsWith('>')) {
                  return (
                    <blockquote key={index} className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground">
                      {paragraph.replace('> ', '')}
                    </blockquote>
                  );
                }
                
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <p key={index} className="font-semibold my-4">
                      {paragraph.replace(/\*\*/g, '')}
                    </p>
                  );
                }
                
                return (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Back to Blog */}
            <div className="mt-12 pt-8 border-t">
              <Link to="/blog">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to All Posts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
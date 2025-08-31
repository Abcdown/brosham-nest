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
      title: "Mari teliti pembentangan 'Interest Rate' dalam carta amortization",
      content: `
        <div class="prose max-w-none">
          <img src="https://www.broshamproperties.my/wp-content/uploads/2024/11/Mari-teliti-pembentangan-Interest-Rate-dalam-carta-amortization.jpg" alt="Interest Rate dalam carta amortization" class="w-full rounded-lg mb-6" />
          
          <p>Memahami bagaimana kadar faedah dan pembayaran bulanan dikira dalam jadual pelunasan pinjaman rumah adalah penting untuk setiap pembeli hartanah.</p>

          <h2>Apakah Carta Amortization?</h2>
          <p>Carta amortization ialah jadual yang menunjukkan pecahan setiap bayaran bulanan pinjaman rumah kepada jumlah prinsipal dan faedah sepanjang tempoh pinjaman.</p>

          <h2>Komponen Utama</h2>

          <h3>1. Prinsipal</h3>
          <p>Jumlah wang asal yang dipinjam untuk membeli rumah. Bahagian ini akan mengurangkan baki pinjaman anda.</p>

          <h3>2. Faedah (Interest)</h3>
          <p>Kos peminjaman wang yang dikira berdasarkan kadar faedah yang ditetapkan oleh bank.</p>

          <h2>Cara Pembayaran Berubah</h2>
          <p>Pada awal tempoh pinjaman, sebahagian besar bayaran bulanan akan pergi kepada faedah. Namun, dari masa ke masa, lebih banyak wang akan pergi kepada prinsipal.</p>

          <h3>Contoh:</h3>
          <ul>
            <li><strong>Tahun 1-5:</strong> 70% faedah, 30% prinsipal</li>
            <li><strong>Tahun 15-20:</strong> 50% faedah, 50% prinsipal</li>
            <li><strong>Tahun 25-30:</strong> 20% faedah, 80% prinsipal</li>
          </ul>

          <h2>Kelebihan Memahami Carta Amortization</h2>
          <ul>
            <li>Merancang kewangan dengan lebih baik</li>
            <li>Memahami kesan pembayaran tambahan</li>
            <li>Membuat keputusan refinancing yang bijak</li>
          </ul>

          <p><strong>Tip:</strong> Gunakan kalkulator amortization dalam talian untuk melihat pecahan pembayaran anda dan merancang strategi pembayaran yang lebih efektif.</p>
        </div>
      `,
      author: "Brosham Properties",
      date: "2024-11-25",
      category: "Kewangan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Mari-teliti-pembentangan-Interest-Rate-dalam-carta-amortization.jpg",
      readTime: "6 min read",
    },
    "2": {
      id: "2", 
      title: "Kepentingan Deposit Rumah",
      content: `
        <div class="prose max-w-none">
          <img src="https://www.broshamproperties.my/wp-content/uploads/2024/11/Kepentingan-Deposit-Rumah.jpg" alt="Kepentingan Deposit Rumah" class="w-full rounded-lg mb-6" />
          
          <p>Deposit rumah adalah aspek penting dalam pembelian hartanah yang perlu difahami dengan baik oleh setiap bakal pembeli. Mari kita lihat mengapa deposit rumah sangat penting dalam proses pembelian hartanah.</p>

          <h2>Apa itu Deposit Rumah?</h2>
          <p>Deposit rumah adalah bayaran pendahuluan yang dibuat oleh pembeli kepada penjual sebagai tanda komitmen serius untuk membeli hartanah tersebut. Biasanya, deposit ini adalah sebanyak 10% dari harga pembelian.</p>

          <h2>Kepentingan Deposit Rumah</h2>

          <h3>1. Menunjukkan Komitmen Serius</h3>
          <p>Deposit membuktikan kepada penjual bahawa anda serius dalam niat untuk membeli hartanah tersebut. Ini memberikan keyakinan kepada penjual untuk meneruskan proses jual beli.</p>

          <h3>2. Melindungi Kedua-dua Pihak</h3>
          <ul>
            <li><strong>Untuk Pembeli:</strong> Deposit memastikan hartanah tidak dijual kepada pihak lain</li>
            <li><strong>Untuk Penjual:</strong> Deposit menjadi jaminan bahawa pembeli akan meneruskan pembelian</li>
          </ul>

          <h3>3. Memudahkan Permohonan Pinjaman</h3>
          <p>Bank biasanya memerlukan bukti deposit yang telah dibayar sebelum meluluskan pinjaman rumah. Ini menunjukkan kemampuan kewangan pembeli.</p>

          <h2>Jenis-jenis Deposit</h2>

          <h3>Earnest Money/Booking Fee</h3>
          <ul>
            <li>Biasanya RM1,000 - RM5,000</li>
            <li>Dibayar untuk "book" hartanah</li>
            <li>Boleh dikira sebagai sebahagian dari deposit 10%</li>
          </ul>

          <h3>Deposit 10% (Deposit SPA)</h3>
          <ul>
            <li>Dibayar semasa menandatangani Sale & Purchase Agreement</li>
            <li>Menjadi komitmen rasmi untuk pembelian</li>
            <li>Biasanya tidak boleh dikembalikan jika pembeli menarik diri</li>
          </ul>

          <h2>Tips Penting</h2>
          <ul>
            <li>Pastikan anda mempunyai wang deposit yang mencukupi sebelum house hunting</li>
            <li>Faham syarat-syarat berkaitan deposit dalam perjanjian</li>
            <li>Simpan semua resit bayaran deposit dengan baik</li>
            <li>Pastikan deposit dibayar kepada pihak yang betul (developer/owner yang sah)</li>
          </ul>

          <p><strong>Ingat:</strong> Deposit adalah komitmen kewangan yang serius. Pastikan anda betul-betul mahu membeli hartanah tersebut sebelum membayar deposit.</p>
        </div>
      `,
      author: "Brosham Properties",
      date: "2024-11-24",
      category: "Kewangan", 
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Kepentingan-Deposit-Rumah.jpg",
      readTime: "5 min read",
    },
    "3": {
      id: "3",
      title: "Cara elak di tipu scammer", 
      content: `
        <div class="prose max-w-none">
          <img src="https://www.broshamproperties.my/wp-content/uploads/2024/11/Cara-elak-di-tipu-scammer.jpg" alt="Cara elak di tipu scammer" class="w-full rounded-lg mb-6" />
          
          <p>Dalam era digital ini, scammer semakin kreatif dalam mencari mangsa, termasuk dalam sektor hartanah. Oleh itu, penting untuk kita mengetahui cara melindungi diri daripada penipuan.</p>

          <h2>Taktik Scammer Yang Perlu Diwaspadai</h2>

          <h3>1. Tawaran Yang Terlalu Menarik</h3>
          <ul>
            <li>Harga jauh di bawah pasaran</li>
            <li>Deposit rendah untuk hartanah premium</li>
            <li>Promosi "limited time" yang mendesak</li>
            <li>Jaminan keuntungan yang tidak realistik</li>
          </ul>

          <h3>2. Tekanan untuk Membuat Bayaran Segera</h3>
          <ul>
            <li>Minta bayaran sebelum viewing</li>
            <li>Alasan "ramai yang berminat"</li>
            <li>Hanya terima cash atau transfer bank</li>
            <li>Tidak mahu berjumpa secara bersemuka</li>
          </ul>

          <h2>Langkah Pencegahan</h2>

          <h3>✅ Verifikasi Identiti dan Dokumen</h3>
          <ul>
            <li>Minta gambar IC yang jelas</li>
            <li>Semak geran atau surat hak milik</li>
            <li>Sahkan melalui carian tanah di Pejabat Tanah</li>
            <li>Pastikan nama dalam dokumen sepadan dengan penjual</li>
          </ul>

          <h3>✅ Gunakan Perkhidmatan Profesional</h3>
          <ul>
            <li>Lantik perunding hartanah berlesen</li>
            <li>Gunakan peguam yang berdaftar</li>
            <li>Pastikan semua transaksi melalui saluran rasmi</li>
          </ul>

          <h3>✅ Buat Penyelidikan Menyeluruh</h3>
          <ul>
            <li>Google nama developer/penjual</li>
            <li>Semak rekod prestasi dan ulasan</li>
            <li>Bandingkan harga dengan hartanah serupa</li>
            <li>Lawati lokasi secara peribadi</li>
          </ul>

          <h2>Red Flags Yang Perlu Dielakkan</h2>

          <div class="bg-red-50 p-4 rounded-lg">
            <h4>🚨 Amaran Bahaya:</h4>
            <ul>
              <li>Tiada alamat fizik yang jelas</li>
              <li>Gambar hartanah tidak konsisten</li>
              <li>Hanya berkomunikasi melalui WhatsApp</li>
              <li>Minta bayaran ke akaun peribadi</li>
              <li>Tidak mahu tunjuk dokumen asal</li>
              <li>Terus tolak permintaan viewing</li>
            </ul>
          </div>

          <h2>Jika Anda Menjadi Mangsa</h2>

          <h3>Langkah Segera:</h3>
          <ol>
            <li><strong>Lapor Polis:</strong> Buat laporan polis dengan segera</li>
            <li><strong>Bank:</strong> Maklumkan kepada bank jika melibatkan transfer wang</li>
            <li><strong>Simpan Bukti:</strong> Kumpul semua komunikasi dan resit</li>
            <li><strong>SKMM:</strong> Lapor kepada Suruhanjaya Komunikasi dan Multimedia Malaysia</li>
          </ol>

          <h2>Tips Keselamatan</h2>

          <ul>
            <li>Jangan terburu-buru membuat keputusan</li>
            <li>Sentiasa berjumpa di tempat awam atau pejabat rasmi</li>
            <li>Bawa saudara/rakan ketika viewing</li>
            <li>Jangan bayar deposit sebelum semak dokumen</li>
            <li>Guna akal sehat - jika terlalu baik, mungkin ada masalah</li>
          </ul>

          <div class="bg-blue-50 p-4 rounded-lg mt-6">
            <p><strong>💡 Ingat:</strong> Scammer bergantung pada ketamakan dan ketergesaan mangsa. Berhati-hati dan sentiasa verifikasi sebelum membuat sebarang pembayaran.</p>
          </div>
        </div>
      `,
      author: "Brosham Properties", 
      date: "2024-11-23",
      category: "Keselamatan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Cara-elak-di-tipu-scammer.jpg",
      readTime: "7 min read",
    },
    "4": {
      id: "4",
      title: "Apa itu deposit rumah? Sewa beli?",
      content: `
        <div class="prose max-w-none">
          <img src="https://www.broshamproperties.my/wp-content/uploads/2024/11/Apa-itu-deposit-rumah-Sewa-beli.jpg" alt="Apa itu deposit rumah dan sewa beli" class="w-full rounded-lg mb-6" />
          
          <p>Ramai yang keliru antara konsep deposit rumah biasa dengan skim sewa beli. Mari kita fahami perbezaan dan kepentingan kedua-dua konsep ini dalam konteks hartanah Malaysia.</p>

          <h2>Apa itu Deposit Rumah?</h2>

          <p>Deposit rumah adalah bayaran pendahuluan yang dibuat oleh pembeli kepada developer atau pemilik hartanah sebagai tanda komitmen untuk membeli. Ini adalah transaksi jual beli biasa.</p>

          <h3>Ciri-ciri Deposit Rumah Biasa:</h3>
          <ul>
            <li>Biasanya 10% dari harga hartanah</li>
            <li>Dibayar semasa menandatangani SPA</li>
            <li>Komitmen untuk membeli secara outright</li>
            <li>Memerlukan pinjaman bank untuk baki 90%</li>
          </ul>

          <h2>Apa itu Sewa Beli?</h2>

          <p>Sewa beli adalah skim alternatif di mana pembeli menyewa hartanah dengan pilihan untuk memilikinya pada akhir tempoh sewa. Ini popular untuk mereka yang tidak layak mendapat pinjaman bank.</p>

          <h3>Bagaimana Sewa Beli Berfungsi?</h3>

          <h4>1. Deposit Awal</h4>
          <ul>
            <li>Biasanya 10-20% dari nilai hartanah</li>
            <li>Lebih tinggi dari deposit biasa</li>
            <li>Menunjukkan komitmen serius</li>
          </ul>

          <h4>2. Bayaran Bulanan</h4>
          <ul>
            <li>Bayaran bulanan seperti sewa</li>
            <li>Sebahagian akan dikira sebagai bayaran ke arah pemilikan</li>
            <li>Biasanya lebih tinggi dari sewa biasa</li>
          </ul>

          <h4>3. Pilihan Beli (Option to Purchase)</h4>
          <ul>
            <li>Pada akhir tempoh (biasanya 3-5 tahun)</li>
            <li>Boleh pilih untuk beli atau tidak</li>
            <li>Jika beli, bayaran terdahulu dikira sebagai sebahagian harga</li>
          </ul>

          <h2>Perbezaan Utama</h2>

          <table class="min-w-full border-collapse border border-gray-300 my-4">
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-300 px-4 py-2">Aspek</th>
                <th class="border border-gray-300 px-4 py-2">Deposit Rumah Biasa</th>
                <th class="border border-gray-300 px-4 py-2">Sewa Beli</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2"><strong>Komitmen</strong></td>
                <td class="border border-gray-300 px-4 py-2">Wajib beli</td>
                <td class="border border-gray-300 px-4 py-2">Pilihan untuk beli</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2"><strong>Deposit</strong></td>
                <td class="border border-gray-300 px-4 py-2">10%</td>
                <td class="border border-gray-300 px-4 py-2">10-20%</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2"><strong>Pinjaman Bank</strong></td>
                <td class="border border-gray-300 px-4 py-2">Diperlukan</td>
                <td class="border border-gray-300 px-4 py-2">Tidak diperlukan serta-merta</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2"><strong>Pemilikan</strong></td>
                <td class="border border-gray-300 px-4 py-2">Segera (selepas SPA)</td>
                <td class="border border-gray-300 px-4 py-2">Pada akhir tempoh (jika pilih beli)</td>
              </tr>
            </tbody>
          </table>

          <h2>Kelebihan Sewa Beli</h2>

          <h3>✅ Untuk Pembeli:</h3>
          <ul>
            <li>Tidak perlu kelayakan bank pada awal</li>
            <li>Masa untuk perbaiki skor kredit</li>
            <li>Boleh "test drive" hartanah sebelum beli</li>
            <li>Fleksibiliti untuk tidak beli jika tidak puas hati</li>
          </ul>

          <h3>✅ Untuk Penjual:</h3>
          <ul>
            <li>Dapat cash flow segera</li>
            <li>Harga jual biasanya lebih tinggi</li>
            <li>Hartanah masih dalam nama sendiri</li>
          </ul>

          <h2>Risiko Yang Perlu Dipertimbang</h2>

          <div class="bg-yellow-50 p-4 rounded-lg">
            <h4>⚠️ Untuk Pembeli:</h4>
            <ul>
              <li>Deposit tinggi hilang jika tidak jadi beli</li>
              <li>Tiada jaminan akan dapat pinjaman bank nanti</li>
              <li>Harga akhir mungkin lebih mahal</li>
            </ul>
          </div>

          <div class="bg-red-50 p-4 rounded-lg mt-4">
            <h4>⚠️ Untuk Penjual:</h4>
            <ul>
              <li>Pembeli mungkin tidak jadi beli</li>
              <li>Perlu maintain hartanah dalam tempoh sewa</li>
              <li>Isu legal jika pembeli ingkar bayaran</li>
            </ul>
          </div>

          <h2>Kesimpulan</h2>

          <p>Kedua-dua konsep ini mempunyai tempat masing-masing dalam pasaran hartanah Malaysia. Pilihan bergantung kepada situasi kewangan, kelayakan pinjaman, dan strategi pelaburan individu.</p>

          <p><strong>Nasihat:</strong> Sentiasa dapatkan nasihat undang-undang dan kewangan sebelum terlibat dalam mana-mana skim ini.</p>
        </div>
      `,
      author: "Brosham Properties",
      date: "2024-11-22",
      category: "Kewangan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Apa-itu-deposit-rumah-Sewa-beli.jpg",
      readTime: "5 min read",
    },
    "5": {
      id: "5",
      title: "Cara kenalpasti scammer",
      content: `
        <div class="prose max-w-none">
          <img src="https://www.broshamproperties.my/wp-content/uploads/2024/11/Cara-kenalpasti-scammer.jpg" alt="Cara kenalpasti scammer" class="w-full rounded-lg mb-6" />
          
          <p>Dalam dunia digital hari ini, scammer semakin pandai menyamar dan menggunakan pelbagai taktik untuk menipu mangsa mereka. Mengenal pasti ciri-ciri scammer adalah langkah pertama untuk melindungi diri dari penipuan.</p>

          <h2>Ciri-Ciri Umum Scammer</h2>

          <h3>1. Tawaran Yang Terlalu Baik</h3>
          <ul>
            <li>Harga jauh lebih murah dari pasaran</li>
            <li>Keuntungan dijamin 100%</li>
            <li>Tiada risiko langsung</li>
            <li>Pulangan tinggi dalam masa singkat</li>
          </ul>

          <h3>2. Mendesak Untuk Bertindak Segera</h3>
          <ul>
            <li>"Limited time offer"</li>
            <li>"Hanya untuk 24 jam sahaja"</li>
            <li>"Ramai yang berminat, cepat ambil keputusan"</li>
            <li>Tidak memberi masa untuk berfikir</li>
          </ul>

          <h3>3. Maklumat Yang Tidak Jelas</h3>
          <ul>
            <li>Tiada alamat fizik yang betul</li>
            <li>Nombor telefon yang tidak boleh dihubungi</li>
            <li>Email dari domain percuma (Gmail, Yahoo)</li>
            <li>Identiti yang samar-samar</li>
          </ul>

          <h2>Taktik Scammer Dalam Hartanah</h2>

          <h3>🚨 Red Flags Dalam Transaksi Hartanah:</h3>

          <div class="bg-red-50 p-4 rounded-lg">
            <ul>
              <li><strong>Harga Tidak Logik:</strong> Jauh berbeza dengan market value</li>
              <li><strong>Gambar Tidak Konsisten:</strong> Foto dari sumber berbeza</li>
              <li><strong>Dokumentasi Lemah:</strong> Tiada geran asal atau surat hak milik</li>
              <li><strong>Elak Berjumpa:</strong> Hanya mahu berkomunikasi online sahaja</li>
              <li><strong>Bayaran Pelik:</strong> Minta transfer ke akaun peribadi</li>
            </ul>
          </div>

          <h2>Cara Mengesan Scammer</h2>

          <h3>✅ Semak Latar Belakang</h3>
          <ul>
            <li><strong>Google Search:</strong> Cari nama dan maklumat syarikat</li>
            <li><strong>Social Media:</strong> Tengok profil dan aktiviti media sosial</li>
            <li><strong>Review Online:</strong> Baca pengalaman orang lain</li>
            <li><strong>Daftar Syarikat:</strong> Semak dengan SSM atau ROC</li>
          </ul>

          <h3>✅ Verifikasi Dokumen</h3>
          <ul>
            <li>Minta dokumen asal, bukan fotokopi sahaja</li>
            <li>Cross-check maklumat dengan pihak berkuasa</li>
            <li>Pastikan nama dalam dokumen sepadan</li>
            <li>Semak tarikh luput lesen atau permit</li>
          </ul>

          <h3>✅ Test Pengetahuan Mereka</h3>
          <ul>
            <li>Tanya soalan teknikal mengenai hartanah</li>
            <li>Minta penjelasan detail mengenai projek</li>
            <li>Lihat samada mereka tahu mengenai kawasan</li>
            <li>Perhatikan jawapan yang tidak konsisten</li>
          </ul>

          <h2>Jenis Scammer Yang Biasa Ditemui</h2>

          <h3>1. Fake Property Agent</h3>
          <ul>
            <li>Mengaku sebagai ejen hartanah berlesen</li>
            <li>Gunakan logo syarikat terkenal</li>
            <li>Tiada lesen REN yang sah</li>
          </ul>

          <h3>2. Phantom Developer</h3>
          <ul>
            <li>Jual projek yang tidak wujud</li>
            <li>Gunakan nama serupa developer terkenal</li>
            <li>Tiada kelulusan pihak berkuasa</li>
          </ul>

          <h3>3. Fake Landlord</h3>
          <ul>
            <li>Sewa rumah yang bukan milik mereka</li>
            <li>Gunakan gambar dari internet</li>
            <li>Elak viewing atau jumpa bersemuka</li>
          </ul>

          <h2>Langkah Perlindungan</h2>

          <div class="bg-blue-50 p-4 rounded-lg">
            <h4>💡 Tips Keselamatan:</h4>
            <ul>
              <li><strong>Jangan Terburu-buru:</strong> Ambil masa untuk fikir dan siasat</li>
              <li><strong>Berjumpa Sendiri:</strong> Insist untuk meeting face-to-face</li>
              <li><strong>Bawa Saksi:</strong> Ajak rakan atau keluarga ketika berjumpa</li>
              <li><strong>Rekod Perbualan:</strong> Simpan semua komunikasi sebagai bukti</li>
              <li><strong>Guna Akal Sehat:</strong> Jika rasa janggal, mungkin memang ada masalah</li>
            </ul>
          </div>

          <h2>Jika Sudah Tertipu</h2>

          <h3>Langkah Segera:</h3>
          <ol>
            <li><strong>Buat Laporan Polis</strong> dalam 24 jam</li>
            <li><strong>Hubungi Bank</strong> untuk block akaun jika perlu</li>
            <li><strong>Kumpul Bukti</strong> - screenshot, email, SMS</li>
            <li><strong>Lapor SKMM</strong> jika melibatkan komunikasi digital</li>
            <li><strong>Maklum CCID</strong> (Commercial Crime Investigation Department)</li>
          </ol>

          <div class="bg-yellow-50 p-4 rounded-lg mt-6">
            <p><strong>⚠️ Ingat:</strong> Scammer bergantung pada emosi dan ketergesaan mangsa. Sentiasa calm down, think twice, dan verify sebelum membuat apa-apa keputusan atau pembayaran.</p>
          </div>
        </div>
      `,
      author: "Brosham Properties",
      date: "2024-11-21",
      category: "Keselamatan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Cara-kenalpasti-scammer.jpg",
      readTime: "6 min read",
    },
    "6": {
      id: "6",
      title: "Ketahui kos-kos tambahan yang perlu dibayar semasa beli rumah",
      content: `
        <div class="prose max-w-none">
          <img src="https://www.broshamproperties.my/wp-content/uploads/2024/11/Ketahui-kos-kos-tambahan-yang-perlu-dibayar-semasa-beli-rumah.jpg" alt="Kos tambahan beli rumah" class="w-full rounded-lg mb-6" />
          
          <p>Ramai pembeli rumah pertama kali terkejut apabila mengetahui terdapat pelbagai kos tambahan yang perlu dibayar selain daripada harga pembelian dan deposit. Penting untuk mengetahui kos-kos ini awal untuk merancang kewangan dengan lebih baik.</p>

          <h2>Kos-Kos Wajib Yang Perlu Dibayar</h2>

          <h3>1. Cukai Duti Setem</h3>

          <h4>a) Duti Setem SPA (Sale & Purchase Agreement)</h4>
          <ul>
            <li>RM10 per salinan dokumen</li>
            <li>Kos paling kecil tapi wajib ada</li>
          </ul>

          <h4>b) Duti Setem MOT (Memorandum of Transfer)</h4>
          <p>Dikira berdasarkan nilai hartanah dengan kadar berperingkat:</p>
          
          <table class="min-w-full border-collapse border border-gray-300 my-4">
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-300 px-4 py-2">Nilai Hartanah</th>
                <th class="border border-gray-300 px-4 py-2">Kadar Duti Setem</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2">RM100,000 pertama</td>
                <td class="border border-gray-300 px-4 py-2">1%</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">RM100,001 - RM500,000</td>
                <td class="border border-gray-300 px-4 py-2">2%</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">RM500,001 - RM1,000,000</td>
                <td class="border border-gray-300 px-4 py-2">3%</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">Melebihi RM1,000,000</td>
                <td class="border border-gray-300 px-4 py-2">4%</td>
              </tr>
            </tbody>
          </table>

          <h4>c) Duti Setem Pinjaman Bank</h4>
          <ul>
            <li>0.5% daripada jumlah pinjaman</li>
            <li>Dikenakan ke atas Loan Documentation Agreement (LDA)</li>
          </ul>

          <h3>Contoh Pengiraan:</h3>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p><strong>Hartanah bernilai RM800,000, pinjaman RM720,000 (90%)</strong></p>
            
            <p><strong>Duti Setem MOT:</strong></p>
            <ul>
              <li>RM100,000 pertama: RM100,000 × 1% = RM1,000</li>
              <li>RM400,000 seterusnya: RM400,000 × 2% = RM8,000</li>
              <li>RM300,000 seterusnya: RM300,000 × 3% = RM9,000</li>
              <li><strong>Jumlah: RM18,000</strong></li>
            </ul>
            
            <p><strong>Duti Setem Pinjaman:</strong></p>
            <ul>
              <li>RM720,000 × 0.5% = RM3,600</li>
            </ul>
            
            <p><strong>Jumlah Duti Setem: RM21,600</strong></p>
          </div>

          <h3>2. Yuran Guaman</h3>

          <p>Yuran peguam untuk proses jual beli dikira berdasarkan skala yang ditetapkan:</p>

          <table class="min-w-full border-collapse border border-gray-300 my-4">
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-300 px-4 py-2">Nilai Hartanah</th>
                <th class="border border-gray-300 px-4 py-2">Kadar Yuran</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2">RM500,000 pertama</td>
                <td class="border border-gray-300 px-4 py-2">1.00%</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">RM500,001 - RM7,500,000</td>
                <td class="border border-gray-300 px-4 py-2">0.80%</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">Melebihi RM7,500,000</td>
                <td class="border border-gray-300 px-4 py-2">0.70%</td>
              </tr>
            </tbody>
          </table>

          <h3>3. Kos-Kos Lain Yang Perlu Dipertimbang</h3>

          <h4>✅ Kos Bank/Pembiayaan:</h4>
          <ul>
            <li><strong>Processing Fee:</strong> 1% dari jumlah pinjaman (biasanya minimum RM3,000)</li>
            <li><strong>Valuation Fee:</strong> RM300 - RM1,000 (bergantung nilai hartanah)</li>
            <li><strong>Legal Fee untuk bank:</strong> Mengikut skala yang sama dengan yuran guaman pembeli</li>
          </ul>

          <h4>✅ Kos Insurans:</h4>
          <ul>
            <li><strong>Fire Insurance:</strong> Wajib untuk pinjaman (anggaran RM200-500/tahun)</li>
            <li><strong>MRTA/MLTA:</strong> Melindungi pinjaman jika berlaku kematian/hilang upaya</li>
          </ul>

          <h4>✅ Kos Utiliti & Penyambungan:</h4>
          <ul>
            <li>Deposit elektrik dan air</li>
            <li>Yuran penyambungan internet</li>
            <li>Yuran penyambungan Astro/TV</li>
          </ul>

          <h2>Jumlah Anggaran Kos Tambahan</h2>

          <div class="bg-blue-50 p-4 rounded-lg">
            <h4>💡 Rule of Thumb:</h4>
            <p>Sediakan <strong>3-5% tambahan</strong> dari harga hartanah untuk kos-kos tambahan ini.</p>
            
            <p><strong>Contoh untuk hartanah RM600,000:</strong></p>
            <ul>
              <li>Kos tambahan anggaran: RM18,000 - RM30,000</li>
              <li>Belum termasuk deposit 10% dan down payment</li>
            </ul>
          </div>

          <h2>Tips Menguruskan Kos</h2>

          <ul>
            <li><strong>Plan Awal:</strong> Kira semua kos sebelum commit beli rumah</li>
            <li><strong>Simpan Wang:</strong> Mulakan tabung untuk kos-kos ini</li>
            <li><strong>Compare Packages:</strong> Bank berbeza mungkin ada package berbeza</li>
            <li><strong>Negotiate:</strong> Cuba negotiate dengan developer untuk subsidi sebahagian kos</li>
          </ul>

          <h2>Kos Yang Boleh Negotiate atau Avoid</h2>

          <div class="bg-green-50 p-4 rounded-lg">
            <h4>💰 Possible Savings:</h4>
            <ul>
              <li><strong>Legal Fee:</strong> Boleh pilih panel lawyer bank (biasanya lebih murah)</li>
              <li><strong>Processing Fee:</strong> Sesetengah bank ada promotion waive fee</li>
              <li><strong>Package Deal:</strong> Developer kadang subsidize legal fee</li>
              <li><strong>First Time Buyer:</strong> Ada rebat duti setem untuk pembeli pertama</li>
            </ul>
          </div>

          <h2>Kesimpulan</h2>

          <p>Pembelian rumah melibatkan lebih daripada sekadar harga rumah dan deposit. Perancangan kewangan yang menyeluruh perlu mengambil kira semua kos tambahan ini untuk mengelakkan kejutan yang tidak diingini.</p>

          <p><strong>Nasihat:</strong> Sentiasa minta pecahan terperinci semua kos dari ejen atau peguam anda sebelum proceed dengan pembelian.</p>
        </div>
      `,
      author: "Brosham Properties",
      date: "2024-11-20",
      category: "Kewangan", 
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Ketahui-kos-kos-tambahan-yang-perlu-dibayar-semasa-beli-rumah.jpg",
      readTime: "8 min read",
    },
    "7": {
      title: "Sebab-sebab permohonan loan ditolak oleh bank",
      content: `
        <div class="prose max-w-none">
          <img src="https://www.broshamproperties.my/wp-content/uploads/2024/11/Sebab-sebab-permohonan-loan-ditolak-oleh-bank.jpg" alt="Sebab-sebab permohonan loan ditolak" class="w-full rounded-lg mb-6" />
          
          <p>Permohonan pinjaman rumah yang ditolak boleh menjadi pengalaman yang mengecewakan. Namun, memahami sebab-sebab di sebalik penolakan ini dapat membantu anda mempersiapkan diri dengan lebih baik untuk permohonan akan datang.</p>

          <h2>Sebab-sebab Utama Permohonan Loan Ditolak</h2>

          <h3>1. Skor Kredit Yang Rendah</h3>
          <p>Bank akan menyemak rekod kredit anda melalui CCRIS dan CTOS. Jika terdapat rekod pembayaran lewat atau gagal bayar, ini akan menjejaskan permohonan anda.</p>

          <h3>2. Pendapatan Tidak Mencukupi</h3>
          <p>Bank biasanya menggunakan nisbah DSR (Debt Service Ratio) untuk menilai kemampuan bayar. Jika DSR melebihi 70%, permohonan mungkin ditolak.</p>

          <h3>3. Tempoh Pekerjaan Yang Singkat</h3>
          <p>Kebanyakan bank memerlukan sekurang-kurangnya 6 bulan untuk pekerja tetap dan 2 tahun untuk pekerja sendiri.</p>

          <h3>4. Dokumen Yang Tidak Lengkap</h3>
          <p>Kegagalan menyediakan dokumen yang diperlukan atau dokumen yang tidak sah boleh menyebabkan permohonan ditolak.</p>

          <h2>Cara Mengatasi Masalah Ini</h2>
          <ul>
            <li>Perbaiki skor kredit dengan membayar hutang tepat masa</li>
            <li>Tingkatkan pendapatan atau kurangkan komitmen bulanan</li>
            <li>Pastikan tempoh pekerjaan mencukupi sebelum memohon</li>
            <li>Sediakan semua dokumen yang diperlukan dengan lengkap</li>
          </ul>

          <p><strong>Tip:</strong> Jika permohonan ditolak oleh satu bank, cuba bank lain kerana setiap bank mempunyai kriteria yang berbeza.</p>
        </div>
      `,
      author: "Brosham Properties",
      date: "2024-11-19",
      category: "Kewangan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Sebab-sebab-permohonan-loan-ditolak-oleh-bank.jpg",
      readTime: "6 min read",
    },
    "8": {
      title: "Apakah itu Refinance Rumah?",
      content: `
        <div class="prose max-w-none">
          <img src="https://www.broshamproperties.my/wp-content/uploads/2024/11/Apakah-itu-Refinance-Rumah.jpg" alt="Refinance Rumah" class="w-full rounded-lg mb-6" />
          
          <p>Refinance rumah adalah proses menukar pinjaman rumah sedia ada dengan pinjaman baru, biasanya dengan syarat yang lebih baik seperti kadar faedah yang lebih rendah.</p>

          <h2>Mengapa Perlu Refinance?</h2>

          <h3>1. Kadar Faedah Yang Lebih Rendah</h3>
          <p>Ini adalah sebab utama kebanyakan orang memilih untuk refinance. Penjimatan walaupun 0.5% boleh membawa perbezaan besar dalam jangka panjang.</p>

          <h3>2. Mengurangkan Tempoh Bayaran</h3>
          <p>Dengan menukar kepada tempoh yang lebih pendek, anda boleh menjimatkan lebih banyak faedah walaupun bayaran bulanan mungkin lebih tinggi.</p>

          <h3>3. Menukar Jenis Pinjaman</h3>
          <p>Contohnya, menukar dari pinjaman kadar berubah kepada kadar tetap untuk kestabilan bayaran.</p>

          <h2>Proses Refinance</h2>
          <ol>
            <li><strong>Bandingkan Tawaran:</strong> Dapatkan sebut harga dari beberapa bank</li>
            <li><strong>Kira Kos:</strong> Pertimbangkan yuran peguam, penilaian, dan penalti</li>
            <li><strong>Mohon:</strong> Hantar permohonan dengan dokumen lengkap</li>
            <li><strong>Penilaian:</strong> Bank akan menilai semula hartanah anda</li>
            <li><strong>Kelulusan:</strong> Setelah lulus, proses tukar bank akan bermula</li>
          </ol>

          <h2>Kos Yang Terlibat</h2>
          <ul>
            <li>Yuran peguam (biasanya 0.25% - 0.5% dari jumlah pinjaman)</li>
            <li>Yuran penilaian hartanah</li>
            <li>Yuran pemprosesan bank</li>
            <li>Penalti bayar awal (jika ada)</li>
          </ul>

          <p><strong>Petua:</strong> Pastikan penjimatan jangka panjang melebihi kos refinance sebelum membuat keputusan.</p>
        </div>
      `,
      author: "Brosham Properties",
      date: "2024-11-18",
      category: "Kewangan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Apakah-itu-Refinance-Rumah.jpg",
      readTime: "7 min read",
    },
    "9": {
      title: "One Stop Centre",
      content: `
        <div class="prose max-w-none">
          <img src="https://www.broshamproperties.my/wp-content/uploads/2024/11/One-Stop-Centre.jpg" alt="One Stop Centre" class="w-full rounded-lg mb-6" />
          
          <p>One Stop Centre adalah konsep perkhidmatan menyeluruh yang menyediakan semua keperluan berkaitan hartanah di satu tempat. Ia memudahkan pembeli rumah untuk mendapatkan semua perkhidmatan yang diperlukan tanpa perlu berurusan dengan pelbagai pihak secara berasingan.</p>

          <h2>Apa Yang Ditawarkan oleh One Stop Centre?</h2>

          <h3>1. Perkhidmatan Pinjaman</h3>
          <ul>
            <li>Permohonan pinjaman rumah</li>
            <li>Refinancing</li>
            <li>Pinjaman bridging</li>
            <li>Konsultasi kewangan</li>
          </ul>

          <h3>2. Perkhidmatan Guaman</h3>
          <ul>
            <li>Sale & Purchase Agreement (SPA)</li>
            <li>Loan Documentation Agreement (LDA)</li>
            <li>Memorandum of Transfer (MOT)</li>
            <li>Strata title transfer</li>
          </ul>

          <h3>3. Perkhidmatan Insurans</h3>
          <ul>
            <li>Fire insurance (wajib untuk loan)</li>
            <li>MRTA/MLTA</li>
            <li>Insurans kemalangan diri</li>
            <li>Insurans rumah komprehensif</li>
          </ul>

          <h3>4. Perkhidmatan Penilaian</h3>
          <ul>
            <li>Penilaian hartanah untuk pinjaman</li>
            <li>Penilaian untuk refinancing</li>
            <li>Market valuation</li>
          </ul>

          <h2>Kelebihan One Stop Centre</h2>

          <h3>✅ Kemudahan dan Keselesaan</h3>
          <p>Semua perkhidmatan di satu tempat menjimatkan masa dan tenaga anda.</p>

          <h3>✅ Koordinasi Yang Lebih Baik</h3>
          <p>Tim yang berpengalaman memastikan semua proses berjalan lancar dan mengikut jadual.</p>

          <h3>✅ Harga Kompetitif</h3>
          <p>Package deal biasanya lebih murah berbanding menggunakan perkhidmatan berasingan.</p>

          <h3>✅ Sokongan Berterusan</h3>
          <p>Satu contact point untuk semua pertanyaan dan keperluan anda.</p>

          <p><strong>Kesimpulan:</strong> One Stop Centre memudahkan proses pembelian rumah dengan menyediakan semua perkhidmatan yang diperlukan di bawah satu bumbung.</p>
        </div>
      `,
      author: "Brosham Properties",
      date: "2024-11-17",
      category: "Perkhidmatan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/One-Stop-Centre.jpg",
      readTime: "6 min read",
    },
    "10": {
      title: "Terima Kasih Dan Penghargaan",
      content: `
        <div class="prose max-w-none">
          <img src="https://www.broshamproperties.my/wp-content/uploads/2024/11/Terima-kasih-dan-penghargaan.jpg" alt="Terima Kasih Dan Penghargaan" class="w-full rounded-lg mb-6" />
          
          <p>Pada tahun 2024 ini, kami dengan rendah hati ingin mengucapkan ribuan terima kasih kepada semua klien, rakan kongsi perniagaan, dan ahli keluarga yang telah menyokong perjalanan kami dalam industri hartanah.</p>

          <h2>Pencapaian 2024</h2>

          <p>Tahun 2024 telah menjadi tahun yang sangat bermakna bagi pasukan Brosham Properties. Dengan sokongan dan kepercayaan daripada anda semua, kami telah berjaya:</p>

          <ul>
            <li>Membantu lebih 500+ keluarga mendapatkan rumah impian mereka</li>
            <li>Menyediakan perkhidmatan one-stop centre yang komprehensif</li>
            <li>Menjalinkan hubungan kerjasama dengan lebih banyak pemaju dan institusi kewangan</li>
            <li>Mengembangkan perkhidmatan digital untuk kemudahan klien</li>
          </ul>

          <h2>Kepada Klien-Klien Tersayang</h2>

          <p>Terima kasih kerana mempercayai kami sebagai rakan kongsi dalam perjalanan mencari dan memiliki hartanah. Setiap cerita kejayaan anda adalah inspirasi kepada kami untuk terus memberikan perkhidmatan yang terbaik.</p>

          <h2>Kepada Rakan Kongsi Perniagaan</h2>

          <p>Kerjasama yang erat dengan bank-bank, firma guaman, syarikat insurans, dan pemaju telah membolehkan kami menyediakan perkhidmatan yang menyeluruh dan berkualiti tinggi.</p>

          <h2>Visi Untuk 2025</h2>

          <p>Memasuki tahun 2025, kami komited untuk terus:</p>
          <ul>
            <li>Meningkatkan kualiti perkhidmatan</li>
            <li>Memperluas rangkaian dan jangkauan</li>
            <li>Menggunakan teknologi terkini untuk kemudahan klien</li>
            <li>Mengekalkan integriti dan profesionalisme yang tinggi</li>
          </ul>

          <p><strong>Sekali lagi, terima kasih atas sokongan berterusan. Mari kita sambut tahun 2025 dengan lebih banyak kejayaan bersama!</strong></p>

          <div class="text-center mt-8 p-4 bg-primary/10 rounded-lg">
            <p class="font-semibold">🏠 Brosham Properties - Your Trusted Property Partner 🏠</p>
          </div>
        </div>
      `,
      author: "Brosham Properties",
      date: "2024-11-16",
      category: "Umum",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Terima-kasih-dan-penghargaan.jpg",
      readTime: "4 min read",
    },
    "11": {
      title: "Segala yang anda perlu tahu tentang Deposit Rumah - Developer",
      content: `
        <div class="prose max-w-none">
          <img src="https://www.broshamproperties.my/wp-content/uploads/2024/11/Segala-yang-anda-perlu-tahu-tentang-Deposit-Rumah-Developer.jpg" alt="Deposit Rumah Developer" class="w-full rounded-lg mb-6" />
          
          <p>Deposit kepada developer adalah bayaran awal yang perlu dibuat semasa membeli rumah baru. Ini berbeza dengan deposit bank dan mempunyai fungsi serta kepentingan tersendiri dalam proses pembelian hartanah.</p>

          <h2>Apa itu Deposit Developer?</h2>

          <p>Deposit developer adalah bayaran awal (biasanya 10% dari harga rumah) yang dibayar terus kepada pemaju/developer untuk menempah unit hartanah. Bayaran ini dibuat sebelum menandatangani Sale & Purchase Agreement (SPA).</p>

          <h2>Jenis-jenis Deposit Developer</h2>

          <h3>1. Booking Fee (RM1,000 - RM5,000)</h3>
          <ul>
            <li>Bayaran tempahan awal</li>
            <li>Untuk "reserve" unit pilihan</li>
            <li>Boleh dikira sebagai sebahagian dari deposit</li>
          </ul>

          <h3>2. Deposit 10%</h3>
          <ul>
            <li>Dibayar semasa menandatangani SPA</li>
            <li>Biasanya 10% dari harga pembelian</li>
            <li>Komitmen rasmi untuk membeli</li>
          </ul>

          <h2>Jadual Bayaran Biasa</h2>

          <table class="min-w-full border-collapse border border-gray-300 my-4">
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-300 px-4 py-2">Peringkat</th>
                <th class="border border-gray-300 px-4 py-2">Peratus</th>
                <th class="border border-gray-300 px-4 py-2">Bila Dibayar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2">Booking Fee</td>
                <td class="border border-gray-300 px-4 py-2">RM1,000-5,000</td>
                <td class="border border-gray-300 px-4 py-2">Semasa booking</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">Deposit SPA</td>
                <td class="border border-gray-300 px-4 py-2">10%</td>
                <td class="border border-gray-300 px-4 py-2">Tandatangan SPA</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">Progress Payment</td>
                <td class="border border-gray-300 px-4 py-2">80%</td>
                <td class="border border-gray-300 px-4 py-2">Mengikut kemajuan</td>
              </tr>
              <tr>
                <td class="border border-gray-300 px-4 py-2">Final Payment</td>
                <td class="border border-gray-300 px-4 py-2">10%</td>
                <td class="border border-gray-300 px-4 py-2">Serah kunci</td>
              </tr>
            </tbody>
          </table>

          <h2>Perlindungan Deposit</h2>

          <h3>✅ Housing Development Account (HDA)</h3>
          <p>Deposit anda dilindungi di bawah Housing Development Account yang dikawal oleh kerajaan.</p>

          <h3>✅ Defect Liability Period</h3>
          <p>Developer bertanggungjawab membaiki sebarang kecacatan dalam tempoh 24 bulan.</p>

          <h3>✅ Abandoned Project Protection</h3>
          <p>Jika projek terbengkalai, terdapat mekanisme perlindungan untuk pembeli.</p>

          <h2>Tips Penting</h2>

          <ul>
            <li><strong>Baca SPA dengan teliti</strong> - Pastikan semua terms and conditions jelas</li>
            <li><strong>Periksa lesen developer</strong> - Sahkan developer mempunyai lesen yang sah</li>
            <li><strong>Simpan semua resit</strong> - Dokumentasi penting untuk tuntutan</li>
            <li><strong>Faham jadual pembayaran</strong> - Ketahui bila dan berapa perlu bayar</li>
          </ul>

          <div class="bg-yellow-50 p-4 rounded-lg mt-6">
            <p><strong>⚠️ Peringatan:</strong> Jangan buat sebarang bayaran sebelum memastikan kesahihan developer dan projek. Sentiasa dapatkan nasihat profesional sebelum membuat komitmen.</p>
          </div>
        </div>
      `,
      author: "Brosham Properties",
      date: "2024-11-15",
      category: "Kewangan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Segala-yang-anda-perlu-tahu-tentang-Deposit-Rumah-Developer.jpg",
      readTime: "8 min read",
    },
    "12": {
      title: "Apa kepentingan deposit kepada developer",
      content: `
        <div class="prose max-w-none">
          <img src="https://www.broshamproperties.my/wp-content/uploads/2024/11/Apa-kepentingan-deposit-kepada-developer.jpg" alt="Kepentingan Deposit Developer" class="w-full rounded-lg mb-6" />
          
          <p>Deposit kepada developer bukan sahaja penting untuk pembeli, tetapi juga mempunyai kepentingan yang besar untuk developer itu sendiri. Mari kita fahami mengapa deposit ini sangat kritikal dalam industri hartanah.</p>

          <h2>Kepentingan Deposit untuk Developer</h2>

          <h3>1. Aliran Tunai (Cash Flow) Projek</h3>
          <p>Deposit 10% yang diterima dari pembeli membantu developer menampung kos permulaan projek seperti:</p>
          <ul>
            <li>Bayaran kepada kontraktor</li>
            <li>Pembelian bahan binaan</li>
            <li>Kos operasi harian</li>
            <li>Bayaran gaji pekerja</li>
          </ul>

          <h3>2. Komitmen Serius dari Pembeli</h3>
          <p>Dengan membayar deposit, pembeli menunjukkan komitmen serius untuk membeli hartanah tersebut. Ini membantu developer:</p>
          <ul>
            <li>Merancang pembinaan dengan lebih tepat</li>
            <li>Mengurangkan risiko pembeli menarik diri</li>
            <li>Mendapat kepastian jualan unit</li>
          </ul>

          <h3>3. Memudahkan Permohonan Pinjaman Projek</h3>
          <p>Bank lebih yakin untuk meluluskan pinjaman projek apabila developer dapat menunjukkan:</p>
          <ul>
            <li>Jumlah unit yang telah ditempah</li>
            <li>Deposit yang telah dikutip</li>
            <li>Permintaan pasaran yang positif</li>
          </ul>

          <h2>Perlindungan untuk Kedua-dua Pihak</h2>

          <h3>Untuk Developer:</h3>
          <ul>
            <li><strong>Jaminan pembayaran:</strong> Deposit menjamin pembeli akan meneruskan pembelian</li>
            <li><strong>Pampasan kerugian:</strong> Jika pembeli menarik diri, deposit boleh menampung kerugian</li>
            <li><strong>Modal kerja:</strong> Membantu melancarkan operasi projek</li>
          </ul>

          <h3>Untuk Pembeli:</h3>
          <ul>
            <li><strong>Unit terjamin:</strong> Deposit memastikan unit tidak dijual kepada orang lain</li>
            <li><strong>Harga terkunci:</strong> Melindungi dari kenaikan harga masa depan</li>
            <li><strong>Keutamaan pilihan:</strong> Mendapat pilihan unit dan lokasi terbaik</li>
          </ul>

          <h2>Mekanisme Perlindungan</h2>

          <h3>Housing Development Account (HDA)</h3>
          <p>Semua deposit disimpan dalam akaun khas yang dikawal ketat oleh undang-undang:</p>
          <ul>
            <li>Wang tidak boleh digunakan untuk projek lain</li>
            <li>Diaudit secara berkala</li>
            <li>Dilindungi jika projek terbengkalai</li>
          </ul>

          <h3>Tribunal for Homebuyer Claims</h3>
          <p>Jika berlaku pertikaian, pembeli boleh membuat aduan kepada tribunal khas ini untuk menyelesaikan masalah dengan cepat dan murah.</p>

          <h2>Tips untuk Pembeli</h2>

          <div class="bg-blue-50 p-4 rounded-lg">
            <h4>✅ Sebelum Bayar Deposit:</h4>
            <ul>
              <li>Periksa lesen developer</li>
              <li>Sahkan projek mendapat kelulusan pihak berkuasa</li>
              <li>Baca dan faham Surat Purchase Agreement (SPA)</li>
              <li>Pastikan developer mempunyai rekod prestasi yang baik</li>
            </ul>
          </div>

          <h2>Kesimpulan</h2>

          <p>Deposit kepada developer adalah sistem yang saling menguntungkan kedua-dua pihak. Ia memberikan jaminan kepada developer untuk meneruskan projek manakala melindungi hak pembeli untuk mendapat unit hartanah yang dibeli.</p>

          <p><strong>Ingat:</strong> Sentiasa buat penyelidikan menyeluruh sebelum membayar deposit dan pastikan semua dokumen lengkap dan sah.</p>
        </div>
      `,
      author: "Brosham Properties",
      date: "2024-11-14",
      category: "Kewangan",
      image: "https://www.broshamproperties.my/wp-content/uploads/2024/11/Apa-kepentingan-deposit-kepada-developer.jpg",
      readTime: "7 min read",
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
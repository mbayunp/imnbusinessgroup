import React from 'react';

const KebijakanPrivasi: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-700">
      <main className="flex-grow">
        {/* Header Section*/}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 pt-20"> {/* pt-20 untuk jarak dari Navbar */}
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Kebijakan Privasi
            </h1>
            <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-600">
              Komitmen kami untuk melindungi data pribadi Anda.
            </p>
          </div>
        </section>

        {/* Content Section*/}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <p className="mb-6 leading-relaxed">
              Selamat datang di Kebijakan Privasi IMN Business Group. Kami berkomitmen untuk melindungi privasi dan keamanan data pribadi yang Anda berikan kepada kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan melindungi informasi pribadi Anda saat Anda mengunjungi website kami atau menggunakan layanan kami.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">1. Informasi yang Kami Kumpulkan</h2>
            <p className="mb-4 leading-relaxed">
              Kami dapat mengumpulkan berbagai jenis informasi pribadi dari Anda, termasuk namun tidak terbatas pada:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Nama, alamat email, nomor telepon, dan informasi kontak lainnya.</li>
              <li>Data demografi seperti usia, jenis kelamin, dan lokasi.</li>
              <li>Informasi yang Anda berikan saat mengisi formulir, survei, atau berinteraksi dengan layanan kami.</li>
              <li>Data penggunaan website melalui cookies dan teknologi pelacakan serupa (misalnya, alamat IP, jenis browser, halaman yang dikunjungi, waktu kunjungan).</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
            <p className="mb-4 leading-relaxed">
              Informasi yang kami kumpulkan dapat digunakan untuk tujuan berikut:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Menyediakan dan memelihara layanan kami.</li>
              <li>Mempersonalisasi pengalaman Anda di website kami.</li>
              <li>Menganalisis penggunaan website untuk meningkatkan layanan kami.</li>
              <li>Mengirimkan informasi, pembaruan, dan komunikasi pemasaran yang relevan.</li>
              <li>Mematuhi kewajiban hukum dan peraturan.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">3. Pengungkapan Informasi kepada Pihak Ketiga</h2>
            <p className="mb-4 leading-relaxed">
              Kami tidak akan menjual, menyewakan, atau memperdagangkan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali dalam situasi berikut:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Kepada penyedia layanan yang bekerja atas nama kami untuk mendukung operasional website dan layanan kami.</li>
              <li>Untuk mematuhi hukum, peraturan, atau proses hukum yang berlaku.</li>
              <li>Untuk melindungi hak, properti, atau keamanan IMN Business Group, pengguna kami, atau publik.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">4. Keamanan Data</h2>
            <p className="mb-4 leading-relaxed">
              Kami mengambil langkah-langkah keamanan yang wajar untuk melindungi informasi pribadi Anda dari akses tidak sah, penggunaan, atau pengungkapan. Namun, tidak ada metode transmisi data melalui internet atau penyimpanan elektronik yang 100% aman.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">5. Perubahan pada Kebijakan Privasi Ini</h2>
            <p className="mb-4 leading-relaxed">
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan diposting di halaman ini, dan tanggal "Terakhir Diperbarui" di bagian atas akan direvisi. Kami menganjurkan Anda untuk meninjau Kebijakan Privasi ini secara berkala.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6">6. Kontak Kami</h2>
            <p className="mb-4 leading-relaxed">
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami melalui halaman kontak kami.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default KebijakanPrivasi;

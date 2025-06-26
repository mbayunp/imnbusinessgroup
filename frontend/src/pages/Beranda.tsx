import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RevealOnScroll from '../components/RevealOnScroll';

const Home = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const services = [
    'Konsultan SDM',
    'Teknologi Informasi',
    'Konsultan Keuangan',
    'Jasa Desain',
    'Percetakan',
    'Produk Catering',
    'Layanan Aqiqah',
    'Layanan Qurban',
  ];

  const productServices = [
    {
      title: 'Perusahaan Agrobisnis',
      description: 'Menyediakan solusi inovatif untuk sektor pertanian dan agribisnis yang berkelanjutan.',
      icon: (
        <svg className="h-12 w-12 text-green-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 4.39-3 7-3 7h16s-3-2.61-3-7c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2" />
        </svg>
      ),
    },
    {
      title: 'Perusahaan Layanan Aqiqah',
      description: 'Pelayanan aqiqah profesional dengan kualitas terbaik dan proses yang halal dan higienis.',
      icon: (
        <svg className="h-12 w-12 text-yellow-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 4.39-3 7-3 7h16s-3-2.61-3-7c0-3.87-3.13-7-7-7z" />
          <path d="M4 17h16M4 13h16M4 9h16M4 5h16" />
        </svg>
      ),
    },
    {
      title: 'Perusahaan Pengadaan Barang',
      description: 'Menyediakan layanan pengadaan barang dengan jaringan luas dan kecepatan pengiriman.',
      icon: (
        <svg className="h-12 w-12 text-blue-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      title: 'Perusahaan Makanan & Minuman',
      description: 'Menghadirkan produk makanan dan minuman berkualitas dengan cita rasa unggul dan inovatif.',
      icon: (
        <svg className="h-12 w-12 text-red-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M14.31 8l5.74 9.94" />
          <path d="M9.69 8h11.48" />
          <path d="M7.38 12l5.74-9.94" />
          <path d="M9.69 16L3.95 6.06" />
          <path d="M14.31 16H2.83" />
          <path d="M16.62 12l-5.74 9.94" />
        </svg>
      ),
    },
    {
      title: 'Perusahaan Bisnis Support',
      description: 'Menyediakan layanan pendukung bisnis untuk meningkatkan efektivitas dan efisiensi operasional.',
      icon: (
        <svg className="h-12 w-12 text-purple-600 mb-4" fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path d="M19.4 15A7.962 7.962 0 0 0 21 12c0-.66-.09-1.29-.25-1.89M4.6 15c-1.3-1-2-2.69-2-3.89 0-1 .69-3 2-3.89" />
        </svg>
      ),
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full h-screen overflow-hidden">
          {/* Fullscreen Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="/building1.mp4"
          >
            Your browser does not support the video tag.
          </video>

          {/* Overlay and Content */}
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative z-10 flex items-center justify-center text-center text-white px-6 h-full w-full">
            <div className="max-w-4xl mx-auto p-8 rounded-lg">
              {/* Animated Text */}
              <h1 
                className={`text-4xl md:text-5xl font-bold mb-4 text-white transition-all duration-1000 ${
                  showContent ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                }`}
              >
                PT Indo Makmur Nasional Business Group
              </h1>
              <p 
                className={`text-lg md:text-xl mb-6 text-white transition-all duration-1000 delay-200 ${
                  showContent ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
              >
                IMN Business Group merupakan perusahaan yang bergerak di bidang investasi yang konsisten bertumbuh serta berkontribusi positif bagi bangsa dan negara
              </p>
              <Link
                to="/tentang"
                className={`bg-white text-blue-900 hover:bg-gray-100 px-6 py-3 rounded-full text-lg transition-all duration-1000 delay-500 ${
                  showContent ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </section>

        {/* Section 2: Services Overview */}
        <RevealOnScroll delay={0} animationType="slide-up">
          <section className="py-16 px-6 md:px-20 bg-blue-50 w-full">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center text-blue-900">Layanan Kami</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    className="bg-blue-50 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
                  >
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">{service}</h3>
                    <p className="text-gray-700 text-sm">Layanan profesional kami untuk mendukung pertumbuhan dan kebutuhan bisnis Anda.</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealOnScroll>

        {/* Section 3: Product Services */}
        <RevealOnScroll delay={0} animationType="slide-up">
          <section className="py-16 px-6 md:px-20 bg-white w-full">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-extrabold text-center mb-12 text-red-900">Produk & Layanan Utama</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productServices.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
                    {item.icon}
                    <h3 className="text-xl font-bold text-red-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealOnScroll>

        {/* Section 4: Call To Action */}
        <RevealOnScroll delay={0} animationType="slide-up">
          <section className="py-20 bg-blue-600 text-white text-center w-full">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-bold mb-4 text-white">Siap Bermitra dengan Kami?</h2>
              <p className="mb-6 text-lg text-white">Bangun masa depan bisnis Anda bersama IMN Business Group.</p>
              <Link
                to="/contact"
                className="inline-block bg-white text-blue-900 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold hover:shadow-lg"
              >
                Hubungi Kami
              </Link>
            </div>
          </section>
        </RevealOnScroll>
      </main>
    </div>
  );
};

export default Home;

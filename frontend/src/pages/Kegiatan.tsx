import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RevealOnScroll from '../components/RevealOnScroll';

const Services: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: "PT Global Agro Pratama",
      description: "Group perusahaan ini bergerak dalam Agrobisnis dan bidang Peternakan Domba, kambing dan sapi dengan beberapa layanan seperti Penjualan Bibit, Penggemukan Hewan, Penjualan.",
      icon: "/agro.jpg",
      features: ["Sentra Aqiqah Nusantara", "Niaga Food Indonesia", "Smart Farm"]
    },
    {
      title: "Sapa Management",
      description: "Group perusahaan ini bergerak dalam bidang jasa Aqiqah.",
      icon: "/sapa.png",
      features: ["Sunnah Aqiqah", "Yuu Aqiqah"]
    },
    {
      title: "Global Garda Sarana",
      description: "Perusahaan ini bergerak dalam bidang pengadaan barang dan jasa untuk support kebutuhan kantor dengan Produk/Jasa",
      icon: "/ggs.png",
      features: ["Cetak Yuu", "G Supply", "G Fashion", "Export dan Import"]
    },
    {
      title: "Al Husna Group",
      description: "Dalam Al Husna Group terdiri dari beberapa brand yang berada dibawahnya yaitu",
      icon: "/husna.png",
      features: ["Top Aqiqah", "Dapur Buah Batu"]
    }
  ];

  const projects = [
    {
      title: "Kerja sama dengan PT. Bandung Daya Sentosa",
      image: "/1.jpg",
      description: ""
    },
    {
      title: "Kerja sama penanaman benih dengan Turki",
      image: "/2.jpg",
      description: ""
    },
    {
      title: "Pelepasan Ekspor Hasil Pertanian ke Malaysia",
      image: "/3.jpg",
      description: ""
    },
    {
      title: "Kolaborasi Produksi Probiotik",
      image: "/4.jpg",
      description: ""
    },
    {
      title:"Mitra Pemberian Makanan Tambahan",
      image: "/5.jpg",
      description: ""
    },
    {
      title:"Qurban Kaleng Baznas",
      image: "/6.jpg",
      description: ""
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <video 
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/building3.mp4"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="max-w-4xl px-6 text-center text-white">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}>
              Kegiatan Kami
            </h1>
            <p className={`text-lg md:text-xl mb-8 transition-all duration-1000 delay-200 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Kami mengidentifikasi peluang bisnis dengan potensi pertumbuhan tinggi, kemudian berinvestasi secara strategis untuk mendorong
            transformasi dan penciptaan nilai jangka panjang. Melalui kolaborasi erat, sinergi bekelanjutan, dan dukungan manajemen aktif, kami berperan sebagai mitra pertumbuhan yang membangun fondasi kuat bagi kesuksesan bersama
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
        {/* Services Section */}
        <RevealOnScroll delay={100} animationType="slide-up">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
                  <div className="p-8 flex flex-col h-full">
                    <div className="flex items-center mb-6">
                      <img src={service.icon} alt="" className="w-16 h-16 object-contain mr-6" />
                      <h2 className="text-2xl font-bold">{service.title}</h2>
                    </div>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-2 mb-8">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="mt-auto self-end px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Pelajari Lebih Lanjut
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Projects Section */}
        <RevealOnScroll delay={200} animationType="slide-up">
          <div className="max-w-7xl mx-auto mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Galeri Proyek Kami</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                  <img src={project.image} alt="" className="w-full h-60 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* CTA Section */}
        <RevealOnScroll delay={300} animationType="slide-up">
          <div className="max-w-7xl mx-auto mt-20 bg-blue-700 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Pencapaian dan Aktivitas Kami</h2>
            <p className="text-xl text-blue-100 mb-8">
              Lihat lebih banyak tentang bagaimana kami berinovasi dan berkontribusi...
            </p>
            <Link to="/press-releases" className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
              Lihat Kegiatan Lainnya
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default Services;

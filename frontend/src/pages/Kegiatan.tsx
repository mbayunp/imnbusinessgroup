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
      icon: <img src="/agro.jpg" alt="PT Global Agro Pratama Logo" className="h-12 w-auto object-contain mb-4" />,
      features: [
        "Sentra Aqiqah Nusantara",
        "Niaga Food Indonesia",
        "Smart Farm"
      ]
    },
    {
      title: "Sapa Management",
      description: "Group perusahaan ini bergerak dalam bidang jasa Aqiqah.",
      icon: <img src="/sapa.png" alt="Sapa Management Logo" className="h-12 w-auto object-contain mb-4" />,
      features: [
        "Sunnah Aqiqah",
        "Yuu Aqiqah",
      ]
    },
    {
      title: "Global Garda Sarana",
      description: "Perusahaan ini bergerak dalam bidang pengadaan barang dan jasa untuk support kebutuhan kantor dengan Produk/Jasa",
      icon: <img src="/ggs.png" alt="Global Garda Sarana Logo" className="h-12 w-auto object-contain mb-4" />,
      features: [
        "Cetak Yuu",
        "G Supply",
        "G Fashion",
        "Export dan Import",
      ]
    },
    {
      title: "Al Husna Group",
      description: "Dalam Al Husna Group terdiri dari beberapa brand yang berada dibawahnya yaitu",
      icon: <img src="/husna.png" alt="Al Husna Group Logo" className="h-12 w-auto object-contain mb-4" />,
      features: [
        "Top Aqiqah",
        "Dapur Buah Batu"
      ]
    }
  ];

  const projects = [
  {
    title: "Kerja sama dengan PT. Bandung Daya Sentosa (Perseroda)",
    image: "/public/1.jpg",
    description: ""
  },
  {
    title: "Kerja sama penanaman benih dengan EZ TOHUMCULUK TURKIYEE",
    image: "/public/2.jpg",
    description: ""
  },
  {
    title: "Pelepasan Ekspor Hasil Pertanian ke Malaysia",
    image: "/public/3.jpg",
    description: ""
  },
  {
    title: "Kolaborasi Produksi Probiotik",
    image: "/public/4.jpg",
    description: ""
  },
  {
    title:"Mitra Pemberian Makanan Tambahan (PMT) Dinas Kesehatan Kab. Bandung",
    image: "/public/5.jpg",
    description: ""
  },
  {
    title:"Qurban Kaleng Baznas",
    image: "/public/6.jpg",
    description: ""
  }
];

  return (
   <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <main className="flex-grow">
        {/* Hero Section*/}
        <section 
          className="relative h-screen w-full -mt-20 overflow-hidden flex items-center justify-center text-center text-white" 
        >
          {/* Video Background */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="/building3.mp4"
          >
            Your browser does not support the video tag.
          </video>

          {/* Overlay and Content */}
          <div className="absolute inset-0 opacity-60"></div>
          <div className="relative z-10 flex items-center justify-center text-center text-black px-6 h-full w-full">
            <div className="max-w-4xl mx-auto p-8 rounded-lg">
              {/* Animated Text */}
              <h1 
                className={`text-4xl md:text-5xl font-bold mb-4 text-white transition-all duration-1000 ${
                  showContent ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                }`}
              >
                Kegiatan Kami
              </h1>
              <p 
                className={`text-lg md:text-xl mb-6 text-white transition-all duration-1000 delay-200 ${
                  showContent ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
              >
                Kami mengidentifikasi peluang bisnis dengan potensi pertumbuhan tinggi, kemudian berinvestasi secara strategis untuk mendorong
                transformasi dan penciptaan nilai jangka panjang. Melalui kolaborasi erat, sinergi bekelanjutan, dan dukungan manajemen aktif, kami berperan sebagai mitra pertumbuhan yang membangun fondasi kuat bagi kesuksesan bersama
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto"> 
          {/* Services Grid */}
          <RevealOnScroll delay={100} animationType="slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex flex-col items-center mb-6">
                      {service.icon}
                      <h2 className="text-2xl font-bold text-gray-800 mt-2 text-center">{service.title}</h2>
                    </div>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-3 flex-1">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex justify-end"> 
                      <button className="px-6 py-3 bg-blue-600 text-black font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        Pelajari Lebih Lanjut
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Projects Gallery Section */}
          <RevealOnScroll delay={200} animationType="slide-up">
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-8">Galeri Proyek Kami</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map((project, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* CTA Section*/}
          <RevealOnScroll delay={300} animationType="slide-up">
            <section className="mt-20 bg-blue-700 rounded-xl text-white p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">Pencapaian dan Aktivitas Kami</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Lihat lebih banyak tentang bagaimana kami berinovasi dan berkontribusi melalui berbagai kegiatan dan proyek.
              </p>
              <Link
                to="/press-releases" 
                className="inline-block bg-white text-blue-700 font-bold rounded-lg hover:bg-gray-100 px-8 py-4 transition-colors"
              >
                Lihat Kegiatan Lainnya
              </Link>
            </section>
          </RevealOnScroll>
        </div>
      </main>
    </div>
  );
};
  
export default Services;

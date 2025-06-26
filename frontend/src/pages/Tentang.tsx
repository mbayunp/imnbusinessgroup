import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import RevealOnScroll from '../components/RevealOnScroll';

const anakPerusahaan = [
  {
    name: 'PT. Global Agro Pratama',
    logo: '/logo-agro.png',
    companies: ['NiagaFood', 'Sentra Aqiqah', 'SmartFarm']
  },
  {
    name: 'PT. SAPA Management',
    logo: '/logo-sapa.png',
    companies: ['Yuu Aqiqah', 'Sunnah Aqiqah']
  },
  {
    name: 'PT. Global Garda Sarana',
    logo: '/logo-garda.png',
    companies: ['Cetak Yuu', 'G Supply', 'G Fashion', 'Export dan Import']
  },
  {
    name: 'Al Husna Group',
    logo: '/logo-niaga.png',
    companies: ['Dapur Buah Batu', 'Top Aqiqah']
  }
]

const teamTop = [
  {
    name: 'MUGI WIDODO',
    role: 'Komisaris Utama IMN Business Group',
    image: '/pak-wiwid.png'
  },
  {
    name: 'ANDI PUTRA SANJAYA',
    role: 'Komisaris IMN Business Group',
    image: '/pak-andi.png'
  }
]

const teamBottom = [
  {
    name: 'DANA VEGA SUPRIATNA',
    role: 'CEO IMN Business Group',
    image: '/pak-dana.png'
  },
  {
    name: 'M ARIEF HIDAYAT PS',
    role: 'Business Project IMN Business Group',
    image: '/pak-arif.png'
  }
]

const About: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-700">
      <main className="flex-grow">
        {/* Hero Section*/}
        <section 
          className="relative h-screen w-full overflow-hidden flex items-center justify-center text-center text-white"
        >
          {/* Video Background */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="/building2.mp4"
          >
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-black opacity-60"></div> 
          <div className="relative z-10 flex items-center justify-center text-center text-white px-6 h-full w-full"> 
            <div className="max-w-4xl mx-auto p-8 rounded-lg">
              <h1 
                className={`text-4xl md:text-5xl font-bold mb-4 text-white transition-all duration-1000 ${
                  showContent ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                }`}
              >
                Tentang IMN Business Group
              </h1>
              <p 
                className={`text-lg md:text-xl mb-6 text-white transition-all duration-1000 delay-200 ${
                  showContent ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
              >
                Memimpin dengan inovasi, kemitraan strategis, dan komitmen terhadap keberlanjutan bisnis sejak 2016.
              </p>
              <Link 
                to="/contact" 
                className={`bg-white text-blue-900 hover:bg-gray-100 px-6 py-3 rounded-full text-lg transition-all duration-1000 delay-500 ${
                  showContent ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </section>

        <div className="pt-20 px-4 sm:px-6 lg:px-8"> 
          {/* Profile Section*/}
          <RevealOnScroll delay={0} animationType="slide-up">
            <section className="my-20 w-full">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Profil Perusahaan</h2>
                  <p className="text-base mb-4 leading-relaxed">
                    PT. Indomakmur Nasional adalah perusahaan swasta nasional didirikan oleh 4 orang Dana Vega Supriatna SE, Mugi Widodo, Andi Putra Sanjaya, dan M. Arief Hidayat Putra Sanjaya, dengan membangun dan mengembangkan bisnis tingkat nasional dan internasional, bernama IMN. Nama 'IMN' terdorong dari keinginan besar untuk berkontribusi penuh terhadap perekonomian dan kemakmuran Nusantara pada saat itu, khususnya di negara Indonesia.
                  </p>
                  <p className="text-base mb-4 leading-relaxed">
                    IMN menjalankan bisnis utama di bidang Agro, Infrastruktur, Food, Properti, Digitalisasi, Media, Konsultan serta mengambil peranan penting di bidang Sosial dan Pendidikan. "Kami berharap, kehadiran IMN akan semakin memberikan manfaat luas untuk masyarakat".
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 shrink-0 text-green-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>100+ SDM profesional di berbagai bidang</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 shrink-0 text-green-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>4 anak perusahaan dengan fokus spesifik</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <img src="/imn-building.png" alt="Kantor IMN Business Group" className="w-full h-auto rounded-lg shadow-lg object-contain max-h-[400px]" />
                </div>
              </div>
            </section>
          </RevealOnScroll>

          {/* Visi dan Misi Section*/}
          <RevealOnScroll delay={100} animationType="slide-up">
            <section className="mb-20 w-full bg-gray-100 rounded-xl p-8 shadow-md">
              <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4">TUJUAN KAMI</h3>
                  <p>Menghadirkan semangat anak bangsa dalam berkontribusi pada kemajuan dan ketahanan bangsa.</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4">VISI KAMI</h3>
                  <p>Menjadi perusahaan terpercaya dan profesional yang konsisten bertumbuh serta berkontribusi positif bagi bangsa dan negara.</p>
                  <h3 className="text-2xl font-semibold text-blue-700 mt-8 mb-4">MISI KAMI</h3>
                  <ol className="list-decimal list-inside space-y-3">
                    <li>Membangun portofolio bisnis yang sehat dengan memberikan layanan dan produk terbaik.</li>
                    <li>Membangun dan mengembangkan SDM yang berkualitas, serta menciptakan lingkungan kerja yang harmonis.</li>
                    <li>Menjalankan tata kelola korporasi yang baik.</li>
                  </ol>
                </div>
              </div>
            </section>
          </RevealOnScroll>

          {/* Anak Perusahaan Slider Section*/}
          <RevealOnScroll delay={200} animationType="slide-up">
            <section className="mb-20 px-4 sm:px-6 lg:px-8 w-full bg-white rounded-xl p-12 shadow-md">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-semibold text-center text-gray-900 mb-12">Anak Perusahaan</h2>
                <Swiper
                  modules={[Navigation]}
                  navigation
                  loop
                  speed={600}
                  slidesPerView={1}
                  className="relative max-w-5xl mx-auto"
                >
                  {anakPerusahaan.map((group, idx) => (
                    <SwiperSlide key={idx} className="flex justify-center items-center">
                      <div className="flex justify-center items-center w-full">
                        <img
                          src={group.logo}
                          alt={`${group.name} logo`}
                          className="h-28 w-auto object-contain rounded-md shadow"
                          loading="lazy"
                          draggable={false}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>
          </RevealOnScroll>

          {/* Values Section*/}
          <RevealOnScroll delay={300} animationType="slide-up">
            <section className="mb-20 px-4 sm:px-6 lg:px-8 w-full bg-blue-700 rounded-xl p-10 text-white">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">Nilai Inti Kami</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { value: 'Innovation', desc: 'Terus mengembangkan solusi kreatif' },
                    { value: 'Network Power', desc: 'Membangun koneksi yang kuat' },
                    { value: 'Dream Team', desc: 'Bekerja sama untuk mencapai tujuan' },
                    { value: 'Inspiring People', desc: 'Memberdayakan orang lain untuk berprestasi' },
                    { value: 'Fantastic Work', desc: 'Menciptakan hasil yang luar biasa' },
                    { value: 'Abundance', desc: 'Menciptakan nilai bagi semua' }
                  ].map(({value, desc}, i) => (
                    <li key={i} className="bg-blue-800 p-6 rounded-lg shadow-sm flex flex-col">
                      <div className="flex items-center mb-3 space-x-3">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"></path>
                      </svg>
                      <span className="font-semibold text-lg">{value}</span>
                    </div>
                    <p className="text-blue-100 text-sm flex-grow">{desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
            </RevealOnScroll>

          {/* Stats Section*/}
          <RevealOnScroll delay={400} animationType="slide-up">
            <section className="mb-20 px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Pencapaian Kami</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { number: '100+', label: 'Profesional' },
                    { number: '6', label: 'Anak Perusahaan' },
                    { number: '50+', label: 'Mitra Bisnis' },
                    { number: '7', label: 'Tahun Pengalaman' }
                  ].map(({number,label}, i) => (
                    <div key={i} className="bg-white p-8 rounded-lg shadow text-center hover:shadow-lg transition-shadow">
                      <p className="text-4xl font-extrabold text-blue-600">{number}</p>
                      <p className="mt-2 text-gray-700 font-medium">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </RevealOnScroll>

          {/* Tim Kami Section*/}
          <RevealOnScroll delay={500} animationType="slide-up">
            <section className="mb-20 px-4 sm:px-6 lg:px-8 w-full bg-white text-blue-600 py-20 rounded-xl">
              <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Kepemimpinan</h2>
                <Swiper
                  modules={[Navigation]}
                  navigation
                  loop
                  speed={600}
                  slidesPerView={1}
                  className="relative"
                >
                  {[...teamTop, ...teamBottom].map((member, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex flex-col items-center justify-center space-y-6">
                        <div className="text-base sm:text-lg md:text-xl max-w-3xl text-gray-800 leading-relaxed px-4">
                          <p>
                            “Sebagai bagian dari IMN Business Group, kami percaya bahwa inovasi dan kolaborasi adalah fondasi kesuksesan kami baik di dalam maupun luar negeri.”
                          </p>
                        </div>
                        <div className="mt-4">
                          <h3 className="text-2xl font-bold">{member.name}</h3>
                          <p className="text-gray-400">{member.role}</p>
                        </div>
                        <div className="mt-10 flex items-center justify-center gap-4">
                          <div className="w-32 h-32 rounded-full overflow-hidden">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>
          </RevealOnScroll>

          {/* CTA Section */}
          <RevealOnScroll delay={600} animationType="slide-up">
            <section className="bg-blue-600 text-white py-16 text-center w-full">
              <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-4">Tertarik Bermitra Dengan Kami?</h2>
                <p className="mb-8 text-xl">Kami siap membantu mengembangkan bisnis Anda</p>
                <Link className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition hover:shadow-lg" to="/contact">
                  Hubungi Tim Kami
                </Link>
              </div>
            </section>
          </RevealOnScroll>
        </div>
      </main>
    </div>
  );
};

export default About;

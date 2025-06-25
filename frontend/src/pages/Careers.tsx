import React, { useEffect, useState } from 'react'; 
import { getAllCareers } from '../services/careerService';
import { Career } from '../types/career';
import { AxiosError } from 'axios';

import RevealOnScroll from '../components/RevealOnScroll';

const Careers: React.FC = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);


  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const data = await getAllCareers();
        setCareers(data);
      } catch (err: unknown) {
        let errorMessage = 'Gagal mengambil data lowongan.';
        if (err instanceof AxiosError) {
          errorMessage = err.response?.data?.message || err.message || errorMessage;
        } else {
          errorMessage = (err as Error).message || errorMessage;
        }
        setError(errorMessage);
        console.error('Error fetching careers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const openDetailModal = (career: Career) => {
    setSelectedCareer(career);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedCareer(null);
    setIsDetailModalOpen(false);
  };


  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-80px-80px)] items-center justify-center bg-gray-50 pt-20">
        <div className="text-lg font-medium text-gray-700">Memuat lowongan...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-80px-80px)] items-center justify-center bg-gray-50 pt-20">
        <div className="rounded-md bg-red-100 p-4 text-red-700">Error: {error}</div>
      </div>
    );
  }

  const IMAGE_BASE_URL = 'http://localhost:5000'; 

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 overflow-x-hidden">
      <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section*/}
          <div className="py-12 text-center mb-16">
            <RevealOnScroll delay={0} animationType="slide-up">
              <h1 className="mb-8 text-center text-4xl sm:text-5xl font-extrabold text-gray-900">Lowongan Karir</h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0} animationType="slide-up">
              <p className="mb-12 text-center text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
                Temukan peluang karir menarik di IMN Business Group. Bergabunglah dengan tim kami!
              </p>
            </RevealOnScroll>
          </div>
          
          {careers.length === 0 ? (
            <div className="text-center text-xl text-gray-600 mt-10 p-8 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
              Belum ada lowongan kerja tersedia saat ini.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12"> 
              {careers.map((career, index) => (
                <RevealOnScroll key={career._id} delay={index * 100} animationType="slide-up">
                  <div 
                    className="rounded-xl bg-white shadow-xl transition-transform duration-300 hover:scale-105 overflow-hidden flex flex-col cursor-pointer"
                    onClick={() => openDetailModal(career)}
                  >
                    {career.imageUrl && (
                      <div 
                        className="w-full h-64 overflow-hidden rounded-t-xl bg-gray-100"
                      >
                        <img 
                          src={`${IMAGE_BASE_URL}${career.imageUrl}`} 
                          alt={career.title} 
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://placehold.co/600x300/cccccc/000000?text=Gambar+Tidak+Ditemukan';
                            console.error('Gagal memuat gambar:', `${IMAGE_BASE_URL}${career.imageUrl}`);
                          }}
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <h2 className="mb-3 text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{career.title}</h2>
                      <p className="mb-4 text-gray-700 text-sm sm:text-base flex-1">
                        {career.description.substring(0, 180)}{career.description.length > 180 ? '...' : ''}
                      </p>
                      <div className="mt-auto flex justify-between items-center text-sm text-gray-500">
                        <span>Tanggal Posting: {new Date(career.postedDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <a
                          href={career.gFormLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-semibold transition-colors text-sm sm:text-base"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Lamar Sekarang &rarr;
                        </a>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
                ))}
            </div>
            )}
        </div>
      </main>

      {/* Modal Detail*/}
      {isDetailModalOpen && selectedCareer && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeDetailModal}
        >
          <div 
            className="relative bg-white rounded-lg max-w-full md:max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            {/* Tombol Tutup */}
            <button
              onClick={closeDetailModal}
              className="absolute top-2 right-2 text-gray-600 bg-white rounded-full p-2 hover:bg-gray-200 z-10"
              aria-label="Tutup"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Bagian Gambar*/}
            {selectedCareer.imageUrl && (
              <div className="md:w-1/2 w-full flex-shrink-0">
                <img 
                  src={`${IMAGE_BASE_URL}${selectedCareer.imageUrl}`} 
                  alt={selectedCareer.title} 
                  className="w-full h-full object-cover rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none rounded-br-none"
                />
              </div>
            )}

            {/* Bagian Deskripsi/Detail*/}
            <div className="flex-1 p-6 overflow-y-auto">
              <h3 className="text-xl sm:text-3xl font-bold text-gray-900 mb-3">{selectedCareer.title}</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4">{selectedCareer.description}</p>
              <p className="text-xs sm:text-sm text-gray-500 mb-4">
                Tanggal Posting: {new Date(selectedCareer.postedDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <a
                href={selectedCareer.gFormLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                Lamar Sekarang
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;

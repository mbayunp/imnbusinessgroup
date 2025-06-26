import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAdminAuth';
import { getCareerStats, CareerStats } from '../services/careerService';
import { getPressReleaseStats, PressReleaseStats } from '../services/pressReleaseService';
import { getAllContactMessages, deleteContactMessage, updateContactMessageStatus } from '../services/contactService';
import { ContactMessage } from '../types/contact';
import { AxiosError } from 'axios';

import ConfirmationModal from '../components/ConfirmationModal';

const AdminDashboard: React.FC = () => {
  const { user, loading, logout, isAuthenticated } = useAuth();

  const [careerStats, setCareerStats] = useState<CareerStats>({ totalCareers: 0, activeCareers: 0 });
  const [pressReleaseStats, setPressReleaseStats] = useState<PressReleaseStats>({ totalPressReleases: 0 });
  const [totalAdmins, setTotalAdmins] = useState(0); 
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [messageToDeleteId, setMessageToDeleteId] = useState<string | null>(null);


  const primaryBlue = 'blue-700';
  const secondaryRed = 'red-700';
  const accentBlue = 'blue-500';
  const neutralWhite = 'white'
  const textDark = 'gray-800';
  const textLight = 'gray-600'; 
  const fetchContactMessages = async () => {
    try {
      const messages = await getAllContactMessages();
      setContactMessages(messages);
    } catch (err: unknown) {
      let errorMessage = "Gagal memuat pesan kontak.";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || err.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message || errorMessage;
      }
      console.error("AdminDashboard: Error fetching contact messages:", errorMessage, err);
    }
  };


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const careers = await getCareerStats();
        setCareerStats(careers);

        const press = await getPressReleaseStats();
        setPressReleaseStats(press);

        setTotalAdmins(1); 

        fetchContactMessages();
        
      } catch (err: unknown) {
        let errorMessage = "Gagal memuat data dashboard.";
        if (err instanceof AxiosError) {
          errorMessage = err.response?.data?.message || err.message || errorMessage;
        } else if (err instanceof Error) {
          errorMessage = err.message || errorMessage;
        }
        console.error("AdminDashboard: Error fetching dashboard data:", errorMessage, err);
      }
    };

    if (!loading && isAuthenticated) {
      fetchStats();
    }
  }, [loading, isAuthenticated]);

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await updateContactMessageStatus(messageId, true); 
      setContactMessages(prevMessages => 
        prevMessages.map(msg => 
          msg._id === messageId ? { ...msg, read: true } : msg
        )
      );
      console.log(`Pesan ${messageId} ditandai sudah dibaca.`);
    } catch (err: unknown) {
      let errorMessage = "Gagal menandai pesan sudah dibaca.";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || err.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message || errorMessage;
      }
      console.error("Error marking message as read:", errorMessage, err);
    }
  };
    const confirmDelete = (messageId: string) => {
    setMessageToDeleteId(messageId);
    setIsDeleteConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (messageToDeleteId) {
      try {
        await deleteContactMessage(messageToDeleteId);
        setContactMessages(prevMessages => prevMessages.filter(msg => msg._id !== messageToDeleteId));
        console.log(`Pesan ${messageToDeleteId} berhasil dihapus.`);
        setIsDeleteConfirmModalOpen(false);
        setMessageToDeleteId(null);
        alert("Pesan berhasil dihapus!");
      } catch (err: unknown) {
        let errorMessage = "Gagal menghapus pesan.";
        if (err instanceof AxiosError) {
          errorMessage = err.response?.data?.message || err.message || errorMessage;
        } else if (err instanceof Error) {
          errorMessage = (err as Error).message || errorMessage;
        }
        console.error("Error deleting message:", errorMessage, err);
        setIsDeleteConfirmModalOpen(false);
        setMessageToDeleteId(null);
        alert(errorMessage);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmModalOpen(false);
    setMessageToDeleteId(null);
  };

  const handleViewDetail = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedMessage(null);
  };


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-lg font-medium text-gray-700">Memuat dashboard...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-md bg-red-100 p-4 text-red-700 text-center">
          Anda tidak memiliki akses ke halaman ini. Silakan masuk kembali.
          <button
            onClick={() => logout()}
            className={`mt-4 rounded-md bg-black px-4 py-2 text-white font-semibold hover:bg-gray-800 transition-colors`}
          >
            Masuk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-${primaryBlue} text-${neutralWhite} shadow-lg flex flex-col`}>
        <div className="p-6 text-center text-2xl font-bold border-b border-${neutralWhite} border-opacity-20">
          IMN Admin
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/admin/dashboard" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg text-lg font-medium transition-colors duration-200 
                  ${isActive ? `bg-${secondaryRed} shadow-md` : `hover:bg-${accentBlue} hover:bg-opacity-50`}`
                }
              >
                <svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7-7 7 7M19 10v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/careers" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg text-lg font-medium transition-colors duration-200 
                  ${isActive ? `bg-${secondaryRed} shadow-md` : `hover:bg-${accentBlue} hover:bg-opacity-50`}`
                }
              >
                <svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.79 0-7.573-.42-11.372-1.745L2 13v4m6-4v4m6-4v4m6-4v4" /></svg>
                Lowongan Karir
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/press-releases" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg text-lg font-medium transition-colors duration-200 
                  ${isActive ? `bg-${secondaryRed} shadow-md` : `hover:bg-${accentBlue} hover:bg-opacity-50`}`
                }
              >
                <svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10m-3-6l3 3m0 0l-3 3m3-3H9" /></svg>
                Rilis Pers
              </NavLink>
            </li>
            {user.role === 'admin' && (
              <li>
                <NavLink
                  to="/admin/register"
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg text-lg font-medium transition-colors duration-200
                    ${isActive ? `bg-${secondaryRed} shadow-md` : `hover:bg-${accentBlue} hover:bg-opacity-50`}`
                  }
                >
                  <svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 18H8a2 2 0 00-2 2v1h12v-1a2 2 0 00-2-2z" /></svg>
                  Tambah Akun Admin
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className={`p-4 text-center border-t border-${neutralWhite} border-opacity-20`}>
          <p className="text-sm">Masuk sebagai: {user.username}</p>
          <button
            onClick={logout}
            className={`mt-2 w-full rounded-md bg-white px-4 py-2 text-black font-semibold hover:bg-gray-200 transition-colors`}
          >
            Keluar
          </button>
        </div>
      </aside>

      {/* Konten Utama */}
      <div className={`flex-1 ml-64 p-6 bg-gray-50`}>
        {/* Header Konten Utama */}
        <div className={`flex justify-between items-center bg-${neutralWhite} p-6 rounded-lg shadow-md mb-6`}>
          <h2 className={`text-2xl font-bold text-${textDark}`}>Gambaran Umum</h2>
          <div className="flex items-center space-x-4">
            <span className={`text-${textLight}`}>Tanggal: {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            {/* Tombol/Ikon Kembali ke Website */}
            <NavLink 
              to="/" 
              className={`flex items-center text-${accentBlue} hover:text-${primaryBlue} font-semibold transition-colors`}
            >
              <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7-7 7 7M19 10v10a1 1 0 01-1 1h-3" /></svg>
              Kembali ke Website
            </NavLink>
          </div>
        </div>

        {/* Kartu Gambaran Umum/Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`bg-${neutralWhite} p-6 rounded-lg shadow-md flex items-center justify-between border-l-4 border-${accentBlue}`}>
            <div>
              <p className={`text-sm text-${textLight}`}>Total Lowongan Karir</p>
              <h3 className={`text-2xl font-bold text-${textDark}`}>{careerStats.totalCareers}</h3>
            </div>
            <svg className={`h-10 w-10 text-${accentBlue}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.79 0-7.573-.42-11.372-1.745L2 13v4m6-4v4m6-4v4m6-4v4" /></svg>
          </div>
          <div className={`bg-${neutralWhite} p-6 rounded-lg shadow-md flex items-center justify-between border-l-4 border-${accentBlue}`}>
            <div>
              <p className={`text-sm text-${textLight}`}>Total Rilis Pers</p>
              <h3 className={`text-2xl font-bold text-${textDark}`}>{pressReleaseStats.totalPressReleases}</h3>
            </div>
            <svg className={`h-10 w-10 text-${accentBlue}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10m-3-6l3 3m0 0l-3 3m3-3H9" /></svg>
          </div>
          <div className={`bg-${neutralWhite} p-6 rounded-lg shadow-md flex items-center justify-between border-l-4 border-${accentBlue}`}>
            <div>
              <p className={`text-sm text-${textLight}`}>Admin Terdaftar</p>
              <h3 className={`text-2xl font-bold text-${textDark}`}>{totalAdmins}</h3>
            </div>
            <svg className={`h-10 w-10 text-${accentBlue}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h2a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2m0 0l-3-3m3 3l3-3m-3 3v-3" /></svg>
          </div>
          <div className={`bg-${neutralWhite} p-6 rounded-lg shadow-md flex items-center justify-between border-l-4 border-${accentBlue}`}>
            <div>
              <p className="text-sm text-gray-500">Lowongan Karir Aktif</p>
              <h3 className={`text-2xl font-bold text-${textDark}`}>{careerStats.activeCareers}</h3>
            </div>
            <svg className={`h-10 w-10 text-${accentBlue}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>

        {/* Kartu Aksi untuk Manajemen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Kartu untuk Manajemen Lowongan */}
          <div className={`rounded-lg bg-${neutralWhite} p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl`}>
            <h2 className={`mb-4 text-3xl font-semibold text-${primaryBlue}`}>Manajemen Lowongan Karir</h2>
            <p className={`mb-6 text-${textDark}`}>Kelola daftar lowongan karir yang ditampilkan di website.</p>
            <div className="space-y-3">
              <NavLink
                to="/admin/careers"
                className={`block rounded-md bg-${primaryBlue} px-6 py-3 text-${neutralWhite} font-semibold text-center hover:bg-blue-800 transition-colors`}
              >
                Lihat & Kelola Lowongan Karir
              </NavLink>
              <NavLink
                to="/admin/careers/add"
                className={`block rounded-md bg-${secondaryRed} px-6 py-3 text-${neutralWhite} font-semibold text-center hover:bg-red-800 transition-colors`}
              >
                Tambah Lowongan Karir Baru
              </NavLink>
            </div>
          </div>

          {/* Kartu untuk Manajemen Rilis Pers */}
          <div className={`rounded-lg bg-${neutralWhite} p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl`}>
            <h2 className={`mb-4 text-3xl font-semibold text-${primaryBlue}`}>Manajemen Rilis Pers</h2>
            <p className={`mb-6 text-${textDark}`}>Kelola rilis pers dan berita terbaru perusahaan.</p>
            <div className="space-y-3">
              <NavLink
                to="/admin/press-releases"
                className={`block rounded-md bg-${primaryBlue} px-6 py-3 text-${neutralWhite} font-semibold text-center hover:bg-blue-800 transition-colors`}
              >
                Lihat & Kelola Rilis Pers
              </NavLink>
              <NavLink
                to="/admin/press-releases/add"
                className={`block rounded-md bg-${secondaryRed} px-6 py-3 text-${neutralWhite} font-semibold text-center hover:bg-red-800 transition-colors`}
              >
                Tambah Rilis Pers Baru
              </NavLink>
            </div>
          </div>
        </div>

        {/* Pemberitahuan Pertanyaan dan Masukan (Kontak) */}
        <div className={`bg-${neutralWhite} p-6 rounded-lg shadow-md mt-6`}>
          <h2 className={`text-xl font-semibold text-${textDark} mb-4`}>Pemberitahuan Pertanyaan dan Masukan</h2>
          {contactMessages.length === 0 ? (
            <p className={`text-${textLight} text-center py-4`}>Tidak ada pesan kontak terbaru.</p>
          ) : (
            <ul className={`divide-y divide-${textLight} divide-opacity-30`}>
              {contactMessages.slice(0, 5).map(message => (
                <li key={message._id} className="py-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className={`text-sm font-semibold text-${textDark}`}>Dari: {message.firstName} {message.lastName} &lt;{message.email}&gt;</p>
                      <p className={`text-sm text-${textLight} mt-1`}>Subjek: {message.subject}</p>
                      <p className={`text-sm text-${textDark} mt-2 mb-2`}>"{message.message.substring(0, 100)}{message.message.length > 100 ? '...' : ''}"</p>
                      <span className={`text-xs text-gray-500`}>
                        Diterima: {new Date(message.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex-shrink-0 ml-4 space-x-2 flex flex-col items-end">
                      {!message.read && (
                        <button
                          onClick={() => handleMarkAsRead(message._id)}
                          className={`rounded-md bg-green-500 px-3 py-1 text-sm text-black hover:bg-green-600 transition-colors border border-green-600`}
                        >
                          Tandai Sudah Dibaca
                        </button>
                      )}
                      <button
                        onClick={() => handleViewDetail(message)}
                        className={`rounded-md bg-${accentBlue} px-3 py-1 text-sm text-black hover:bg-${primaryBlue} transition-colors border border-${accentBlue}`}
                      >
                        Lihat Detail
                      </button>
                      <button
                        onClick={() => confirmDelete(message._id)}
                        className={`rounded-md bg-red-500 px-3 py-1 text-sm text-black hover:bg-red-600 transition-colors border border-red-600`}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Modal untuk Detail Pesan */}
        {isDetailModalOpen && selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-lg w-full shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Detail Pesan Kontak</h3>
              <p className="mb-2"><span className="font-semibold">Dari:</span> {selectedMessage.firstName} {selectedMessage.lastName}</p>
              <p className="mb-2"><span className="font-semibold">Email:</span> {selectedMessage.email}</p>
              {selectedMessage.phone && <p className="mb-2"><span className="font-semibold">Telepon:</span> {selectedMessage.phone}</p>}
              <p className="mb-2"><span className="font-semibold">Subjek:</span> {selectedMessage.subject}</p>
              <p className="mb-4"><span className="font-semibold">Pesan:</span> {selectedMessage.message}</p>
              <p className="text-sm text-gray-500 mb-4">Diterima: {new Date(selectedMessage.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              <div className="flex justify-end space-x-2">
                {!selectedMessage.read && (
                  <button
                    onClick={() => {
                      handleMarkAsRead(selectedMessage._id);
                      closeDetailModal();
                    }}
                    className={`rounded-md bg-green-500 px-4 py-2 text-black hover:bg-green-600 transition-colors`}
                  >
                    Tandai Sudah Dibaca
                  </button>
                )}
                <button
                  onClick={closeDetailModal}
                  className={`rounded-md bg-gray-300 px-4 py-2 text-black hover:bg-gray-400 transition-colors`}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Modal Konfirmasi Hapus */}
        <ConfirmationModal
          isOpen={isDeleteConfirmModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="Konfirmasi Hapus Pesan"
          message="Apakah Anda yakin ingin menghapus pesan kontak ini secara permanen?"
          confirmText="Hapus Permanen"
          cancelText="Batal"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;

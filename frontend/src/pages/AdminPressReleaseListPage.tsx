// frontend/imnbg/src/pages/AdminPressReleaseListPage.tsx

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllPressReleases, deletePressRelease } from '../services/pressReleaseService';
import { PressRelease } from '../types/pressRelease';
import { AxiosError } from 'axios';

const AdminPressReleaseListPage: React.FC = () => {
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchPressReleases = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPressReleases();
      setPressReleases(data);
    } catch (err: unknown) {
      let errorMessage = 'Gagal memuat daftar berita pers.';
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || err.message || errorMessage;
      } else {
        errorMessage = (err as Error).message || errorMessage;
      }
      setError(errorMessage);
      console.error('Error fetching press releases for admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPressReleases();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus berita pers ini?')) {
      try {
        setLoading(true);
        await deletePressRelease(id);
        setMessage('Berita pers berhasil dihapus!');
        fetchPressReleases();
      } catch (err: unknown) {
        let errorMessage = 'Gagal menghapus berita pers.';
        if (err instanceof AxiosError) {
          errorMessage = err.response?.data?.message || err.message || errorMessage;
        } else {
          errorMessage = (err as Error).message || errorMessage;
        }
        setError(errorMessage);
        console.error('Error deleting press release:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-lg font-medium text-gray-700">Memuat daftar berita pers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-md bg-red-100 p-4 text-red-700">Error: {error}</div>
      </div>
    );
  }

  return (
    <div 
      className="flex min-h-screen w-screen flex-col items-center bg-cover bg-center" /* Full screen background */
      style={{ backgroundImage: 'url("/imn-building2.png")' }} /* Local image */
    >
      <div className="w-full max-w-6xl rounded-xl bg-white bg-opacity-90 p-8 shadow-2xl backdrop-blur-sm border border-blue-200 my-8"> {/* Wider container */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-blue-800">Manajemen Berita Pers</h1>
          <NavLink 
            to="/admin/dashboard" 
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
          >
            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h14" /></svg>
            Kembali ke Dashboard Admin
          </NavLink>
        </div>
      
        <div className="mb-6 flex justify-end">
          <NavLink
            to="/admin/press-releases/add"
            className="rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Tambah Berita Pers Baru
          </NavLink>
        </div>

        {message && (
          <div className="mb-4 rounded-md bg-green-100 p-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {pressReleases.length === 0 ? (
          <div className="text-center text-lg text-gray-600 mt-10">
            Belum ada berita pers di database.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Posting</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pressReleases.map((pressRelease) => (
                  <tr key={pressRelease._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pressRelease.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(pressRelease.postedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <NavLink
                        to={`/admin/press-releases/edit/${pressRelease._id}`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </NavLink>
                      <button
                        onClick={() => handleDelete(pressRelease._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPressReleaseListPage;

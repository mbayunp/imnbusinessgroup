import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { createPressRelease, getPressReleaseById, updatePressRelease, uploadImage } from '../services/pressReleaseService';
import { PressRelease, PressReleasePayload } from '../types/pressRelease';
import { AxiosError } from 'axios';

const AdminPressReleaseFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formType, setFormType] = useState<'add' | 'edit'>('add');

  useEffect(() => {
    if (id) {
      setFormType('edit');
      const fetchPressRelease = async () => {
        setLoading(true);
        try {
          const pressRelease = await getPressReleaseById(id);
          setTitle(pressRelease.title);
          setContent(pressRelease.content);
          if (pressRelease.imageUrl) {
            setExistingImageUrl(pressRelease.imageUrl);
            setImagePreview(pressRelease.imageUrl);
          }
        } catch (err: unknown) {
          let errorMessage = 'Gagal memuat data berita pers untuk diedit.';
          if (err instanceof AxiosError) {
            errorMessage = err.response?.data?.message || err.message || errorMessage;
          } else {
            errorMessage = (err as Error).message || errorMessage;
          }
          setError(errorMessage);
          console.error('Error fetching press release for edit:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchPressRelease();
    }
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setExistingImageUrl(null); 
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    let finalImageUrl: string | undefined = undefined;

    try {
      if (imageFile) {
        setSuccessMessage('Mengunggah gambar...');
        finalImageUrl = await uploadImage(imageFile);
        setSuccessMessage(null);
      } else if (existingImageUrl) {
        finalImageUrl = existingImageUrl;
      }

      const pressReleaseData: PressReleasePayload = {
        title: title || '',
        content: content || '',
        imageUrl: finalImageUrl || '',
      };

      if (formType === 'add') {
        await createPressRelease(pressReleaseData);
        setSuccessMessage('Berita pers berhasil ditambahkan!');
      } else {
        await updatePressRelease(id!, pressReleaseData);
        setSuccessMessage('Berita pers berhasil diperbarui!');
      }

      setTimeout(() => {
        navigate('/admin/press-releases');
      }, 1500);
    } catch (err: unknown) {
      let errorMessage = `Gagal ${formType === 'add' ? 'menambah' : 'memperbarui'} berita pers.`;
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || err.message || errorMessage;
      } else {
        errorMessage = (err as Error).message || errorMessage;
      }
      setError(errorMessage);
      console.error(`Error ${formType === 'add' ? 'creating' : 'updating'} press release:`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="flex min-h-screen w-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/imn-building2.png")' }}
    >
      <div className="w-full max-w-2xl rounded-xl bg-white bg-opacity-90 p-8 shadow-2xl backdrop-blur-sm border border-blue-200"> {/* Lebih besar max-w-2xl */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-blue-800">
            {formType === 'add' ? 'Tambah Berita Pers Baru' : 'Edit Berita Pers'}
          </h1>
          <NavLink 
            to="/admin/press-releases" 
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
          >
            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h14" /></svg>
            Kembali ke Daftar Berita Pers
          </NavLink>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
              Judul Berita Pers
            </label>
            <input
              type="text"
              id="title"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-700">
              Konten
            </label>
            <textarea
              id="content"
              rows={10}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Bagian Unggah Gambar */}
          <div className="mb-6">
            <label htmlFor="image" className="mb-2 block text-sm font-medium text-gray-700">
              Gambar Berita Pers (Opsional)
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Pratinjau Gambar:</p>
                <img src={imagePreview} alt="Image Preview" className="max-w-xs h-auto rounded-md shadow-md" />
              </div>
            )}
            {existingImageUrl && !imageFile && !imagePreview && ( 
                <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Gambar Saat Ini (Jika tidak ada pratinjau baru):</p>
                    <img src={existingImageUrl} alt="Existing Image" className="max-w-xs h-auto rounded-md shadow-md" />
                </div>
            )}
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-100 p-4 text-sm text-red-700 font-medium border border-red-200">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 rounded-lg bg-green-100 p-4 text-sm text-green-700 font-medium border border-green-200">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            className={`w-full rounded-lg bg-blue-600 px-6 py-3 text-black font-bold text-lg hover:bg-blue-700 focus:outline-none focus:ring-3 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ${
              loading ? 'cursor-not-allowed opacity-70' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Menyimpan...' : (formType === 'add' ? 'Tambah Berita Pers' : 'Perbarui Berita Pers')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPressReleaseFormPage;

import React, { useState, useEffect } from 'react';

interface ContentData {
  title: string;
  subtitle?: string;
  content?: string;
  heroImage?: string;
}

interface EditHomeModalProps {
  content: ContentData;
  section: string | null;
  onClose: () => void;
  onSave: (updatedContent: ContentData) => void;
}

const EditHomeModal: React.FC<EditHomeModalProps> = ({
  content,
  section,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<ContentData>({
    title: '',
    subtitle: '',
    content: ''
  });

  useEffect(() => {
    if (content) {
      setFormData({
        title: content.title || '',
        subtitle: content.subtitle || '',
        content: content.content || ''
      });
    }
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title) {
      alert('Title is required');
      return;
    }

    if (section === 'hero' && !formData.subtitle) {
      alert('Subtitle is required for hero section');
      return;
    }

    if (!section?.startsWith('section') && !formData.content) {
      alert('Content is required');
      return;
    }

    onSave(formData);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">
          Edit {section?.startsWith('section') ? 'Section' : 'Hero'} Content
        </h2>
        
        <form onSubmit={handleSubmit}>
          {section === 'hero' ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Subtitle*</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
            </>
          ) : (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              {section === 'hero' ? 'Subtitle*' : 'Content*'}
            </label>
            <textarea
              name={section === 'hero' ? 'subtitle' : 'content'}
              value={section === 'hero' ? formData.subtitle || '' : formData.content || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHomeModal;
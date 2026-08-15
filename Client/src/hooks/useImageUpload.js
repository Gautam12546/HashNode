import { useState } from 'react';
import api from '../api/axios';
import { toast } from 'sonner';

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Image uploaded successfully!');
      setUploading(false);
      return response.data; // should contain { secure_url, public_id }
    } catch (err) {
      const msg = err.response?.data?.message || 'Upload failed, please try again';
      setError(msg);
      toast.error(msg);
      setUploading(false);
      throw err;
    }
  };

  return { uploadImage, uploading, error };
};
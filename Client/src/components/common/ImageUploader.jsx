import React, { useState, useRef } from 'react';
import { useImageUpload } from '../../hooks/useImageUpload';
import { Loader2, ImagePlus, X, UploadCloud } from 'lucide-react';

const ImageUploader = ({ onUploadComplete, initialImage, label = 'Upload Image' }) => {
  const { uploadImage, uploading, error } = useImageUpload();
  const [preview, setPreview] = useState(initialImage || null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const processFile = async (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    try {
      const result = await uploadImage(file);
      if (result && result.secure_url) {
        onUploadComplete(result.secure_url);
      }
    } catch (err) {
      setPreview(initialImage || null);
    }
  };

  const handleFileChange = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  };

  const triggerFilePicker = () => fileInputRef.current.click();

  return (
    <div className="space-y-2">
      {label && <label className="label">{label}</label>}
      <div
        role="button"
        tabIndex={0}
        onClick={triggerFilePicker}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && triggerFilePicker()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative rounded-xl p-4 text-center cursor-pointer transition-colors duration-150 border-2 border-dashed
          ${dragging ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10' : 'border-gray-300 dark:border-white/15 hover:border-brand-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        {preview ? (
          <div className="relative inline-block">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 mx-auto rounded-lg object-contain"
            />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                <Loader2 className="animate-spin text-white" size={28} />
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center">
            <div className="w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mb-3">
              {dragging ? <UploadCloud className="text-brand-500" size={22} /> : <ImagePlus className="text-brand-500" size={22} />}
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {dragging ? 'Drop to upload' : 'Click or drag an image here'}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      {!uploading && preview && (
        <button
          type="button"
          onClick={() => { setPreview(null); onUploadComplete(''); }}
          className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          <X size={14} /> Remove image
        </button>
      )}
    </div>
  );
};

export default ImageUploader;

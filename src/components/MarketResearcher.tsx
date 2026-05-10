"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Search, Loader2, X } from 'lucide-react';
import { runMarketResearch } from '../lib/api';

interface MarketResearcherProps {
  onResult: (data: any) => void;
  onError: (error: string) => void;
}

export default function MarketResearcher({ onResult, onError }: MarketResearcherProps) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const f = acceptedFiles[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] },
    maxFiles: 1,
    disabled: loading,
  });

  const clearImage = () => { setFile(null); setPreview(null); };

  const handleSubmit = async () => {
    if (!file) { onError('Please upload a target product image.'); return; }
    if (!price.trim()) { onError('Please specify the price.'); return; }
    if (!description.trim()) { onError('Please provide a product description.'); return; }

    setLoading(true);
    try {
      const data = await runMarketResearch(file, price, description);
      onResult(data);
    } catch (err: any) {
      onError(err.response?.data?.detail || 'Market research failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Image Upload */}
      {!preview ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="w-10 h-10 mx-auto mb-3 text-gray-400" />
          <p className="text-sm font-medium text-gray-600">Drop target product image to scan market</p>
        </div>
      ) : (
        <div className="relative w-full">
          <img src={preview} alt="Product" className="w-full max-h-48 object-contain rounded-xl border border-gray-200" />
          <button onClick={clearImage} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      )}

      {/* Inputs grid */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Target Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="e.g. $899"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Product Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed description of features to compare..."
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          disabled={loading}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !file}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold rounded-xl
          transition-all flex items-center justify-center gap-2 text-sm"
      >
        {loading ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Scanning Market & Competitors...</>
        ) : (
          <><Search className="w-5 h-5" /> Run Market Research</>
        )}
      </button>
    </div>
  );
}

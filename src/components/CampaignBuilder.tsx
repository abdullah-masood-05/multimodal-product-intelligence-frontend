"use client";

import React, { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Megaphone, Loader2, X } from 'lucide-react';
import { generateCampaign } from '../lib/api';

interface CampaignBuilderProps {
  onResult: (data: any) => void;
  onError: (error: string) => void;
}

export default function CampaignBuilder({ onResult, onError }: CampaignBuilderProps) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [audience, setAudience] = useState('');
  const [budget, setBudget] = useState('');
  const [productInfo, setProductInfo] = useState('');

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
    if (!file) { onError('Please upload a product image.'); return; }
    if (!audience.trim()) { onError('Please specify the target audience.'); return; }
    if (!budget.trim()) { onError('Please specify a budget.'); return; }

    setLoading(true);
    try {
      const data = await generateCampaign(file, audience, budget, productInfo);
      onResult(data);
    } catch (err: any) {
      onError(err.response?.data?.detail || 'Campaign generation failed.');
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
            ${isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="w-10 h-10 mx-auto mb-3 text-gray-400" />
          <p className="text-sm font-medium text-gray-600">Drop product image here or click to select</p>
        </div>
      ) : (
        <div className="relative w-full">
          <img src={preview} alt="Product" className="w-full max-h-48 object-contain rounded-xl border border-gray-200" />
          <button onClick={clearImage} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      )}

      {/* Audience */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Target Audience</label>
        <input
          type="text"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          placeholder="e.g. Women 25-35 in Lahore, interested in fashion"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          disabled={loading}
        />
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Daily Budget</label>
        <input
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="e.g. PKR 5000/day or $50/day"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          disabled={loading}
        />
      </div>

      {/* Optional Product Info */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Product Info <span className="text-gray-400 font-normal">(optional — AI auto-detects from image)</span></label>
        <textarea
          value={productInfo}
          onChange={(e) => setProductInfo(e.target.value)}
          placeholder="e.g. Handmade leather bag, genuine cowhide, available in 3 colors"
          rows={2}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
          disabled={loading}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !file}
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-semibold rounded-xl
          transition-all flex items-center justify-center gap-2 text-sm"
      >
        {loading ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Generating 5-channel campaign...</>
        ) : (
          <><Megaphone className="w-5 h-5" /> Generate Ad Campaign</>
        )}
      </button>
    </div>
  );
}

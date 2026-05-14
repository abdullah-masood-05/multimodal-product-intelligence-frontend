"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Users, Loader2, X } from 'lucide-react';
import { runSimulation } from '../lib/api';

interface TwinSimulatorProps {
  onResult: (data: any) => void;
  onError: (error: string) => void;
}

export default function TwinSimulator({ onResult, onError }: TwinSimulatorProps) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('');

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
    if (!price.trim()) { onError('Please specify the price.'); return; }
    if (!description.trim()) { onError('Please provide a product description.'); return; }
    if (!audience.trim()) { onError('Please specify the target audience.'); return; }

    setLoading(true);
    try {
      const data = await runSimulation(file, price, description, audience);
      onResult(data);
    } catch (err: any) {
      onError(err.response?.data?.detail || 'Simulation failed.');
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
            ${isDragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}
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

      {/* Inputs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. $49.99"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900
             focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Target Audience</label>
          <input
            type="text"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g. Gen Z Gamers"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900
             focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Product Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed description of features and benefits..."
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900
           focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none"
          disabled={loading}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !file}
        className="w-full py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 text-white font-semibold rounded-xl
          transition-all flex items-center justify-center gap-2 text-sm"
      >
        {loading ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Simulating Customers...</>
        ) : (
          <><Users className="w-5 h-5" /> Generate Customer Twins</>
        )}
      </button>
    </div>
  );
}

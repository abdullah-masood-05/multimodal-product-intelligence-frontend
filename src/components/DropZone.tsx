"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon, Loader2 } from 'lucide-react';
import { analyzeImage } from '../lib/api';

interface DropZoneProps {
  onResult: (data: any) => void;
  onError: (error: string) => void;
}

export default function DropZone({ onResult, onError }: DropZoneProps) {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    setLoading(true);
    try {
      const data = await analyzeImage(file);
      onResult(data);
    } catch (err: any) {
      onError(err.response?.data?.detail || "An error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  }, [onResult, onError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 1,
    disabled: loading
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}
    >
      <input {...getInputProps()} />
      {loading ? (
        <div className="flex flex-col items-center text-gray-500">
          <Loader2 className="w-12 h-12 mb-4 animate-spin text-blue-500" />
          <p className="text-lg font-medium">Analyzing product image...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-gray-500">
          <UploadCloud className="w-12 h-12 mb-4 text-gray-400" />
          <p className="text-lg font-medium mb-1">
            {isDragActive ? "Drop the image here" : "Drag & drop product image here"}
          </p>
          <p className="text-sm">or click to select file</p>
          <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
            <ImageIcon className="w-4 h-4" />
            <span>Supports JPG, PNG, WEBP</span>
          </div>
        </div>
      )}
    </div>
  );
}

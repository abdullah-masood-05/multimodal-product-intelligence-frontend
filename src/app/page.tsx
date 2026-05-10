"use client";

import React, { useState } from 'react';
import DropZone from '@/components/DropZone';
import ResultPanel from '@/components/ResultPanel';

export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResult = (data: any) => {
    setResult(data);
    setError(null);
  };

  const handleError = (errMsg: string) => {
    setError(errMsg);
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Product IQ</h1>
          <p className="text-lg text-gray-600">AI-powered multimodal product analysis</p>
        </header>

        <section>
          <DropZone onResult={handleResult} onError={handleError} />
        </section>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 text-center">
            {error}
          </div>
        )}

        {result && (
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ResultPanel data={result} />
          </section>
        )}
      </div>
    </main>
  );
}

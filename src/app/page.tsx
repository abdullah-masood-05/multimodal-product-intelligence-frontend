"use client";

import React, { useState } from 'react';
import DropZone from '@/components/DropZone';
import ResultPanel from '@/components/ResultPanel';
import CampaignBuilder from '@/components/CampaignBuilder';
import CampaignResults from '@/components/CampaignResults';
import TwinSimulator from '@/components/TwinSimulator';
import TwinResults from '@/components/TwinResults';
import MarketResearcher from '@/components/MarketResearcher';
import MarketResults from '@/components/MarketResults';

type Tab = 'analyze' | 'campaign' | 'twin' | 'market';

export default function Home() {
  const [tab, setTab] = useState<Tab>('analyze');

  // Analyze state
  const [analyzeResult, setAnalyzeResult] = useState<any>(null);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);

  // Campaign state
  const [campaignResult, setCampaignResult] = useState<any>(null);
  const [campaignError, setCampaignError] = useState<string | null>(null);

  // Twin state
  const [twinResult, setTwinResult] = useState<any>(null);
  const [twinError, setTwinError] = useState<string | null>(null);

  // Market state
  const [marketResult, setMarketResult] = useState<any>(null);
  const [marketError, setMarketError] = useState<string | null>(null);

  const handleAnalyzeResult = (data: any) => { setAnalyzeResult(data); setAnalyzeError(null); };
  const handleAnalyzeError = (msg: string) => { setAnalyzeError(msg); setAnalyzeResult(null); };

  const handleCampaignResult = (data: any) => { setCampaignResult(data); setCampaignError(null); };
  const handleCampaignError = (msg: string) => { setCampaignError(msg); setCampaignResult(null); };

  const handleTwinResult = (data: any) => { setTwinResult(data); setTwinError(null); };
  const handleTwinError = (msg: string) => { setTwinError(msg); setTwinResult(null); };

  const handleMarketResult = (data: any) => { setMarketResult(data); setMarketError(null); };
  const handleMarketError = (msg: string) => { setMarketError(msg); setMarketResult(null); };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Product IQ</h1>
          <p className="text-lg text-gray-500 mt-2">AI-powered multimodal product intelligence</p>
        </header>

        {/* Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-xl bg-gray-100 p-1">
            <button
              onClick={() => setTab('analyze')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all
                ${tab === 'analyze' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              🔍 Product Analysis
            </button>
            <button
              onClick={() => setTab('campaign')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all
                ${tab === 'campaign' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              📢 Ad Campaign
            </button>
            <button
              onClick={() => setTab('twin')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all
                ${tab === 'twin' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              🤖 Twin Simulator
            </button>
            <button
              onClick={() => setTab('market')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all
                ${tab === 'market' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              📊 Market Researcher
            </button>
          </div>
        </div>

        {/* Analyze Tab */}
        {tab === 'analyze' && (
          <section className="space-y-6">
            <DropZone onResult={handleAnalyzeResult} onError={handleAnalyzeError} />
            {analyzeError && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 text-center text-sm">{analyzeError}</div>
            )}
            {analyzeResult && <ResultPanel data={analyzeResult} />}
          </section>
        )}

        {/* Campaign Tab */}
        {tab === 'campaign' && (
          <section className="space-y-6">
            <CampaignBuilder onResult={handleCampaignResult} onError={handleCampaignError} />
            {campaignError && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 text-center text-sm">{campaignError}</div>
            )}
            {campaignResult && <CampaignResults data={campaignResult} />}
          </section>
        )}

        {/* Twin Simulator Tab */}
        {tab === 'twin' && (
          <section className="space-y-6">
            <TwinSimulator onResult={handleTwinResult} onError={handleTwinError} />
            {twinError && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 text-center text-sm">{twinError}</div>
            )}
            {twinResult && <TwinResults data={twinResult} />}
          </section>
        )}

        {/* Market Researcher Tab */}
        {tab === 'market' && (
          <section className="space-y-6">
            <MarketResearcher onResult={handleMarketResult} onError={handleMarketError} />
            {marketError && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 text-center text-sm">{marketError}</div>
            )}
            {marketResult && <MarketResults data={marketResult} />}
          </section>
        )}
      </div>
    </main>
  );
}

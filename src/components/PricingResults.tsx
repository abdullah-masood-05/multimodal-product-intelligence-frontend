"use client";

import React from 'react';
import { Tag, TrendingDown, Percent, FileText, CheckCircle2 } from 'lucide-react';

interface PricingResultsProps {
  data: any;
}

export default function PricingResults({ data }: PricingResultsProps) {
  if (!data || !data.ideal_price_point) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-8 text-white text-center">
        <p className="text-amber-100 uppercase tracking-wider font-bold text-sm mb-2">Ideal Price Point</p>
        <h2 className="text-5xl font-extrabold tracking-tight">{data.ideal_price_point}</h2>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
            {data.pricing_tier} Tier
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4" /> {data.final_conversion_probability}% Conversion Prob.
          </span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 font-bold uppercase text-xs mb-3">
              <TrendingDown className="w-4 h-4" /> Margin Risk
            </div>
            <p className={`text-lg font-bold ${
              data.margin_risk.toLowerCase() === 'high' ? 'text-red-600' :
              data.margin_risk.toLowerCase() === 'medium' ? 'text-amber-600' :
              'text-green-600'
            }`}>
              {data.margin_risk} Risk
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 font-bold uppercase text-xs mb-3">
              <Percent className="w-4 h-4" /> Recommended Discount
            </div>
            <p className="text-lg font-bold text-gray-900">{data.recommended_discount}</p>
          </div>
        </div>

        {/* Strategy Rationale */}
        <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-100">
          <div className="flex items-center gap-2 text-amber-800 font-bold uppercase text-xs mb-3">
            <FileText className="w-4 h-4" /> Strategy Rationale
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {data.strategy_rationale}
          </p>
        </div>
      </div>

    </div>
  );
}

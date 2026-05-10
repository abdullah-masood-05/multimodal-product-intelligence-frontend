"use client";

import React from 'react';
import { Target, TrendingUp, AlertTriangle, Lightbulb, MessageSquareQuote } from 'lucide-react';

interface TwinResultsProps {
  data: any;
}

export default function TwinResults({ data }: TwinResultsProps) {
  if (!data || !data.twins || !data.insights) return null;

  const { twins, insights } = data;

  return (
    <div className="space-y-6">
      
      {/* AI Insights Panel */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-teal-600" />
          AI Marketing Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/60 p-4 rounded-xl border border-teal-50">
            <p className="text-xs text-gray-500 uppercase font-bold flex items-center gap-1 mb-1">
              <TrendingUp className="w-3 h-3 text-teal-600" /> Conversion Score
            </p>
            <p className="text-2xl font-extrabold text-gray-900">{insights.predicted_conversion_score}/10</p>
          </div>
          <div className="bg-white/60 p-4 rounded-xl border border-teal-50">
            <p className="text-xs text-gray-500 uppercase font-bold flex items-center gap-1 mb-1">
              <Target className="w-3 h-3 text-teal-600" /> Best Audience
            </p>
            <p className="text-base font-semibold text-gray-900">{insights.best_audience}</p>
          </div>
          <div className="bg-white/60 p-4 rounded-xl border border-teal-50">
            <p className="text-xs text-gray-500 uppercase font-bold flex items-center gap-1 mb-1">
              <Lightbulb className="w-3 h-3 text-teal-600" /> Strongest Selling Point
            </p>
            <p className="text-sm font-medium text-gray-800">{insights.strongest_selling_point}</p>
          </div>
          <div className="bg-white/60 p-4 rounded-xl border border-red-50">
            <p className="text-xs text-gray-500 uppercase font-bold flex items-center gap-1 mb-1">
              <AlertTriangle className="w-3 h-3 text-red-500" /> Biggest Objection
            </p>
            <p className="text-sm font-medium text-gray-800">{insights.biggest_objection}</p>
          </div>
        </div>
      </div>

      {/* Customer Twins Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 px-1">Simulated Shoppers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {twins.map((twin: any, idx: number) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{twin.name}, {twin.age}</h4>
                  <p className="text-sm text-gray-500 font-medium">{twin.occupation}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${
                    twin.purchase_probability >= 70 ? 'bg-green-100 text-green-700' :
                    twin.purchase_probability >= 40 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {twin.purchase_probability}% Buy Intent
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Profile</p>
                <p className="text-sm text-gray-700">{twin.profile}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 relative">
                <MessageSquareQuote className="w-5 h-5 text-gray-300 absolute top-3 right-3" />
                <p className="text-sm italic text-gray-800 pr-6">"{twin.reaction}"</p>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

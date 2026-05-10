"use client";

import React from 'react';

interface ResultPanelProps {
  data: any;
}

export default function ResultPanel({ data }: ResultPanelProps) {
  if (!data || !data.listing) return null;

  const { listing } = data;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-4">{listing.title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            {listing.description.split('\n').map((point: string, i: number) => (
              point.trim() ? <li key={i}>{point}</li> : null
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Category & Tags</h3>
            <p className="text-sm text-gray-600 mb-2">
              {listing.category} &gt; {listing.subcategory}
            </p>
            <div className="flex flex-wrap gap-2">
              {listing.tags.map((tag: string, i: number) => (
                <span key={i} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Estimated Price</h3>
            <p className="text-lg font-medium text-green-600">
              ${listing.price_min.toFixed(2)} - ${listing.price_max.toFixed(2)}
            </p>
          </div>

          {listing.condition_notes && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Condition Notes</h3>
              <p className="text-sm text-gray-600">{listing.condition_notes}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
        <span>Confidence Score: {(listing.confidence * 100).toFixed(1)}%</span>
      </div>
    </div>
  );
}

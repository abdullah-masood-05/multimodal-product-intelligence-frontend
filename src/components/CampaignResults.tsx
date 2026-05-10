"use client";

import React, { useState } from 'react';
import { Copy, Check, Globe, Camera, Mail, MessageCircle, ShoppingBag } from 'lucide-react';

const CHANNEL_META: Record<string, { label: string; color: string; icon: any }> = {
  facebook:        { label: 'Facebook Ads',     color: 'bg-blue-600',   icon: Globe },
  instagram:       { label: 'Instagram',        color: 'bg-pink-500',   icon: Camera },
  google_shopping: { label: 'Google Shopping',  color: 'bg-yellow-500', icon: ShoppingBag },
  whatsapp:        { label: 'WhatsApp',         color: 'bg-green-500',  icon: MessageCircle },
  email:           { label: 'Email Marketing',  color: 'bg-indigo-500', icon: Mail },
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors">
      {copied ? <><Check className="w-3 h-3 text-green-600" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
    </button>
  );
}

function renderValue(val: any, depth: number = 0): React.ReactNode {
  if (typeof val === 'string') {
    const charCount = val.length;
    return (
      <div className="flex items-start gap-2">
        <p className="text-sm text-gray-700 whitespace-pre-wrap flex-1">{val}</p>
        <span className="text-xs text-gray-400 whitespace-nowrap">{charCount} chars</span>
        <CopyButton text={val} />
      </div>
    );
  }
  if (Array.isArray(val)) {
    return (
      <div className="space-y-1">
        {val.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-5">{i + 1}.</span>
            {typeof item === 'string' ? (
              <div className="flex items-center gap-2 flex-1">
                <span className="text-sm text-gray-700 flex-1">{item}</span>
                <CopyButton text={item} />
              </div>
            ) : (
              <div className="flex-1">{renderValue(item, depth + 1)}</div>
            )}
          </div>
        ))}
      </div>
    );
  }
  if (typeof val === 'object' && val !== null) {
    return (
      <div className={`space-y-3 ${depth > 0 ? 'pl-3 border-l-2 border-gray-100' : ''}`}>
        {Object.entries(val).map(([k, v]) => (
          <div key={k}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{k.replace(/_/g, ' ')}</p>
            {renderValue(v, depth + 1)}
          </div>
        ))}
      </div>
    );
  }
  return <p className="text-sm text-gray-700">{String(val)}</p>;
}

function ChannelCard({ channel, data }: { channel: string; data: any }) {
  const meta = CHANNEL_META[channel] || { label: channel, color: 'bg-gray-500', icon: Mail };
  const Icon = meta.icon;
  const fullText = JSON.stringify(data, null, 2);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className={`${meta.color} px-4 py-2.5 flex items-center justify-between`}>
        <div className="flex items-center gap-2 text-white">
          <Icon className="w-4 h-4" />
          <span className="font-semibold text-sm">{meta.label}</span>
        </div>
        <CopyButton text={fullText} />
      </div>
      <div className="p-4">
        {renderValue(data)}
      </div>
    </div>
  );
}

interface CampaignResultsProps {
  data: any;
}

export default function CampaignResults({ data }: CampaignResultsProps) {
  if (!data || !data.campaign) return null;

  const { campaign, audience, budget, latency_ms, channels_generated } = data;
  const channelOrder = ['facebook', 'instagram', 'google_shopping', 'whatsapp', 'email'];

  return (
    <div className="space-y-4">
      {/* Summary Bar */}
      <div className="bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-sm">
        <div className="flex items-center gap-4">
          <span className="text-purple-700 font-semibold">{channels_generated} channels generated</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-600">Audience: {audience}</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-600">Budget: {budget}</span>
        </div>
        {latency_ms && <span className="text-gray-400 text-xs">{(latency_ms / 1000).toFixed(1)}s</span>}
      </div>

      {/* Channel Cards */}
      <div className="space-y-4">
        {channelOrder.map((ch) =>
          campaign[ch] ? <ChannelCard key={ch} channel={ch} data={campaign[ch]} /> : null
        )}
      </div>
    </div>
  );
}

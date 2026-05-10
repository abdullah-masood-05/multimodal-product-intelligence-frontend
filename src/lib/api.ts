import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
});

export const analyzeImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/api/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const searchSimilar = async (query: string) => {
  const response = await api.post('/api/search', { query });
  return response.data;
};

export const generateCampaign = async (
  file: File,
  audience: string,
  budget: string,
  productInfo?: string
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('audience', audience);
  formData.append('budget', budget);
  if (productInfo) formData.append('product_info', productInfo);

  const response = await api.post('/api/campaign', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 120000, // 2 min — 5 parallel Groq calls
  });
  return response.data;
};

export const runSimulation = async (
  file: File,
  price: string,
  description: string,
  audience: string
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('price', price);
  formData.append('description', description);
  formData.append('audience', audience);

  const response = await api.post('/api/simulate', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 60000,
  });
  return response.data;
};

export const runMarketResearch = async (
  file: File,
  price: string,
  description: string
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('price', price);
  formData.append('description', description);

  const response = await api.post('/api/market', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 60000,
  });
  return response.data;
};

export const runPricingStrategy = async (
  marketData: string,
  twinData: string,
  baseCost: string
) => {
  const formData = new FormData();
  formData.append('market_data', marketData);
  formData.append('twin_data', twinData);
  formData.append('base_cost', baseCost);

  const response = await api.post('/api/pricing', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 60000,
  });
  return response.data;
};

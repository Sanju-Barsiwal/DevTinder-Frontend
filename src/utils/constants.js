console.log('🔍 VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('🔍 BASE_URL:', import.meta.env.VITE_API_URL || 'http://localhost:7777');

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7777';
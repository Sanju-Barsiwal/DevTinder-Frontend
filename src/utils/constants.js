// Force the backend URL in production
export const BASE_URL = import.meta.env.MODE === 'production' 
  ? 'https://devtinder-backend-nu.vercel.app/api'
  : (import.meta.env.VITE_API_URL || 'http://localhost:7777');

console.log('🔍 BASE_URL:', BASE_URL);
console.log('🔍 VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('🔍 MODE:', import.meta.env.MODE);
// Force the backend URL in production
export const BASE_URL = location.hostname === "localhost" ? "http://localhost:7777" : "/api";
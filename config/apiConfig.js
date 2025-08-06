// API Configuration
// Update this with your backend server IP address
export const API_CONFIG = {
  // Development - Update this to your backend IP address
  BASE_URL: 'http://10.165.72.154:8000',
  
  // Alternative configurations for different environments
  // LOCAL: 'http://localhost:8000',
  // PRODUCTION: 'https://your-production-server.com',
  
  // API endpoints
  ENDPOINTS: {
    STATUS: '/',
    PROCESS_FRAME: '/process_frame',
    SUBMIT_INPUT: '/submit_input',
    OFFICIAL_RESPONSE: '/official_response',
    GET_STATUS: '/status',
  },
  
  // Camera settings
  CAMERA: {
    FRAME_RATE: 5, // Frames per second
    QUALITY: 0.8,  // Image quality (0.1 to 1.0)
  },
  
  // Network settings
  NETWORK: {
    TIMEOUT: 10000, // 10 seconds
    RETRY_ATTEMPTS: 3,
  },
};

// Helper function to get full URL for an endpoint
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to check if we're in development mode
export const isDevelopment = () => {
  return __DEV__;
}; 
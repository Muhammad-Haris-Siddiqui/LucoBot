import { API_CONFIG, getApiUrl } from '../config/apiConfig';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  // Check if robot is awake
  async checkRobotStatus() {
    try {
      const response = await fetch(`${this.baseURL}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error checking robot status:', error);
      throw error;
    }
  }

  // Send camera frame to robot
  async processFrame(imageData) {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageData.uri,
        type: 'image/jpeg',
        name: 'frame.jpg',
      });

      const response = await fetch(`${this.baseURL}/process_frame`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error processing frame:', error);
      throw error;
    }
  }

  // Submit user input (text or button choice)
  async submitInput(inputText) {
    try {
      const response = await fetch(`${this.baseURL}/submit_input`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_text: inputText,
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error submitting input:', error);
      throw error;
    }
  }

  // Get current robot status
  async getStatus() {
    try {
      const response = await fetch(`${this.baseURL}/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error getting status:', error);
      throw error;
    }
  }

  // Simulate official response (for testing)
  async simulateOfficialResponse(message) {
    try {
      const response = await fetch(`${this.baseURL}/official_response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message, // 'approve' or 'deny'
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error simulating official response:', error);
      throw error;
    }
  }
}

export default new ApiService(); 
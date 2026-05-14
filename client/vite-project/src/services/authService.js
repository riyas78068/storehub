const API_URL = "http://localhost:2000"; // Change this to your server URL

export const authService = {
  // Register a new user
  register: async (name, email, password) => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    
    return data;
  },

  // Login user
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    
    // Store tokens in localStorage
    if (data.data.token) {
      localStorage.setItem('temp_key', data.data.token.temp_key);
      localStorage.setItem('main_key', data.data.token.main_key);
      localStorage.setItem('user', JSON.stringify(data.data));
    }
    
    return data;
  },

  // Refresh token
  refreshToken: async () => {
    const main_key = localStorage.getItem('main_key');
    
    if (!main_key) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_URL}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ main_key }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Token refresh failed');
    }

    // Update the temp_key
    localStorage.setItem('temp_key', data.data);

    return data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('temp_key');
    localStorage.removeItem('main_key');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get access token
  getAccessToken: () => {
    return localStorage.getItem('temp_key');
  },

  // Get refresh token
  getRefreshToken: () => {
    return localStorage.getItem('main_key');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('temp_key') && !!localStorage.getItem('main_key');
  },
};

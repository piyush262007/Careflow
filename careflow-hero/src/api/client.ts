import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Access Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('careflow_access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401, 500 & Automatic Refresh Token & Retry Logic
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 500 Internal Server Errors
    if (error.response?.status >= 500) {
      console.error('CareFlow Backend Internal Server Error:', error.response?.data);
    }

    // Handle 401 Unauthorized & Token Refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/register')) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('careflow_refresh_token');

      if (!refreshToken) {
        isRefreshing = false;
        handleSessionExpiration();
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        if (data?.success && data?.data?.accessToken) {
          const newAccessToken = data.data.accessToken;
          localStorage.setItem('careflow_access_token', newAccessToken);
          if (data.data.refreshToken) {
            localStorage.setItem('careflow_refresh_token', data.data.refreshToken);
          }

          apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          processQueue(null, newAccessToken);
          isRefreshing = false;

          return apiClient(originalRequest);
        } else {
          throw new Error('Refresh failed');
        }
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        isRefreshing = false;
        handleSessionExpiration();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

function handleSessionExpiration() {
  localStorage.removeItem('careflow_access_token');
  localStorage.removeItem('careflow_refresh_token');
  localStorage.removeItem('careflow_user');
  window.dispatchEvent(new CustomEvent('careflow:session-expired'));
}

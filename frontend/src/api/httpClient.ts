import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// interceptor global: extrai message do corpo de erro da API
httpClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message ?? "Erro inesperado. Tente novamente.";
    return Promise.reject(new Error(message));
  }
);
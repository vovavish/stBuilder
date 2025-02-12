import { AuthResponse } from '@/types/response/AuthResponse';
import axios from 'axios';

import { getSession, signIn, signOut } from 'next-auth/react';

export const API_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  if (!localStorage.getItem('accessToken')) {
    const session = await getSession();
    localStorage.setItem('accessToken', session?.accessToken!);
    //config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  }
  
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;

  return config;
});

api.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;

    try {
      const session = await getSession();
  
      if (session?.error === 'RefreshAccessTokenError') {
        signOut({
          redirect: true,
          callbackUrl: '/login',
        });
      } else {
        localStorage.setItem('accessToken', session?.accessToken!);
  
        console.log(session?.refreshToken);
  
        return api.request(originalRequest);
      }
    } catch (e) {
      signOut({
        redirect: false,
        callbackUrl: '/login',
      });
    }
  }

  throw error;
});
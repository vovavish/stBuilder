import { AuthResponse } from '@/types/response/AuthResponse';
import { api } from './api';

export default class ApiAuthController {
  static async signUp(email: string, password: string): Promise<AuthResponse> {
    return api.post<AuthResponse>('/auth/local/signup', { email, password })
      .then(res => res.data);
  }

  static async signIn(email: string, password: string): Promise<AuthResponse> {
    return api.post<AuthResponse>('/auth/local/signin', { email, password })
      .then(res => res.data);
  }

  static async logout(): Promise<unknown> {
    return api.post('/auth/logout');
  }
}
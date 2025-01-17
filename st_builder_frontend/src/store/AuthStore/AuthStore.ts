import ApiAuthController from "@/api/ApiAuthController";
import { IUser } from "@/types/user/user";
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { AuthResponse } from "@/types/response/AuthResponse";

export class AuthStore {
  private _isAuth = false;
  private _isAuthChecked = false;

  private _user: IUser | null = null;
  private _isUserLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get isUserLoading() {
    return this._isUserLoading;
  }

  get isAuthChecked() {
    return this._isAuthChecked;
  }

  async signIn(email: string, password: string) {
    try {
      this._isUserLoading = true;
      const response = await ApiAuthController.signIn(email, password);
      console.log(response);
      localStorage.setItem('accessToken', response.access_token);
      localStorage.setItem('refreshToken', response.refresh_token);
      this._user = response.userDto;
      this._isAuth = true;
    } catch (e) {
      console.log(e);
    } finally {
      this._isUserLoading = false;
    }
  }

  async signUp(email: string, password: string) {
    try {
      this._isUserLoading = true;
      const response = await ApiAuthController.signUp(email, password);
      console.log(response);
      localStorage.setItem('accessToken', response.access_token);
      localStorage.setItem('refreshToken', response.refresh_token);
      this._user = response.userDto;
      this._isAuth = true;
    } catch (e) {
      console.log(e);
    } finally {
      this._isUserLoading = false;
    }
  }

  async logout() {
    try {
      const response = await ApiAuthController.logout();
      console.log(response);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this._user = null;
      this._isAuth = false;
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    try {
      this._isUserLoading = true;
      const response = await axios.post<AuthResponse>(`http://localhost:3000/auth/refresh`, null, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`
        }
      });
      console.log(response);
      localStorage.setItem('accessToken', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
      runInAction(() => {
        this._user = response.data.userDto;
        this._isAuth = true;
      })
    } catch (e) {
      console.log(e);
    } finally {
      runInAction(() => {
        this._isUserLoading = false;
        this._isAuthChecked = true;
      })
    }
  }
}

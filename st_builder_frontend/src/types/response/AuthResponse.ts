import { IUser } from "../user/user";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  userDto: IUser;
}
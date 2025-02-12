import { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "@/lib/api";
import axios from "axios";
import { AuthResponse } from "@/types/response/AuthResponse";
import { jwtDecode } from "jwt-decode";
import { signOut } from "next-auth/react";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      authorize: async (credentials) => {
        try {
          console.log(credentials);
          const response = await axios.post("http://localhost:3000/auth/local/signin", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { access_token, refresh_token, userDto } = response.data;

          const decoded = jwtDecode(access_token);
          
          if (userDto && access_token && refresh_token) {
            return {
              id: userDto.id,
              email: userDto.email,
              name: userDto.username,
              accessToken: access_token,
              refreshToken: refresh_token,
              accessTokenExpires: decoded.exp,
            };
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
        token.email = user.email!;
        token.name = user.name!;
        token.accessTokenExpires = user.accessTokenExpires; // Время жизни accessToken (замените на значение с бэка)
      }

      console.log('JWT METHOD');
      console.log('user', user);
      console.log('Date.now()', Date.now() / 1000);
      console.log('token.accessTokenExpires!', token.accessTokenExpires!);
      console.log('Date.now() > token.accessTokenExpires!', Date.now() / 1000 > token.accessTokenExpires!);

      if (Date.now() / 1000 > token.accessTokenExpires!) {
        console.log("Access token expired, refreshing...");
        try {
          const response = await axios.post<AuthResponse>('http://localhost:3000/auth/refresh', null, {
            headers: {
              'Authorization': `Bearer ${token.refreshToken}`
            }
          })

          const { access_token, refresh_token } = response.data;

          const decoded = jwtDecode(access_token);

          return {
            ...token,
            accessToken: access_token,
            refreshToken: refresh_token,
            accessTokenExpires: decoded.exp, // Обновляем время жизни
          };
        } catch (error) {
          console.error("Error refreshing access token:", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token.error === "RefreshAccessTokenError") {
        session.error = "RefreshAccessTokenError";
      }

      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;

      //console.log('SESSION METHOD', new Date(session.expires).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }));

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
};

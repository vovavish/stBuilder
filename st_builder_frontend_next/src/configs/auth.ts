import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { AuthResponse } from "@/types/response/AuthResponse";
import { jwtDecode } from "jwt-decode";

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
          const response = await axios.post<AuthResponse>(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth/local/signin`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { access_token, refresh_token, userDto } = response.data;

          const decoded = jwtDecode(access_token);
          
          if (userDto && access_token && refresh_token) {
            return {
              id: userDto.userId.toString(),
              email: userDto.email,
              name: userDto.username,
              accessToken: access_token,
              refreshToken: refresh_token,
              accessTokenExpires: decoded.exp,
              roles: userDto.roles
            };
          }
          return null;
        } catch (error) {
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
        token.accessTokenExpires = user.accessTokenExpires;
        token.roles = user.roles;
      }

      if (Date.now() / 1000 > token.accessTokenExpires!) {
        try {
          const response = await axios.post<AuthResponse>(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth/refresh`, null, {
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
            accessTokenExpires: decoded.exp,
          };
        } catch (error) {
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
      session.user.roles = token.roles;

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

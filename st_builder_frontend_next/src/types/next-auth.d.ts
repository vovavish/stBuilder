import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
    error?: string;
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
    refreshToken?: string;
    email?: string;
    name?: string;
    accessTokenExpires?: number;
  }
}
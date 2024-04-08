import nextAuth from "next-auth";

interface User {
  email: string;
  image: string;
  name: string;
}

interface UserData {
  id?: string;
  name?: string | null;
  email?: string | null;
  exp?: number | null;
  iat?: number | null;
  jti?: string | null;
  lastname?: string | null;
  picture?: string | null;
  sub?: string | null;
  accessToken?: string | null;
}

declare module "next-auth" {
  interface Session {
    expires: Date;
    token: string;
    user: User;
    userData: UserData;
  }
}

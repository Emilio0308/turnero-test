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

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    emailVerified?: boolean | null;
    image?: string | null;
    lastname?: string;
    password?: string;
    role: string;
    active?: boolean;
    termAndConditions?: boolean;
    createAt?: string | Date;
    updatedAt?: string | Date;
    accessToken?: string | Date;
  }
}

import { prisma } from "@/libs/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req  ) {
        try {
          //("ejecutando autorizer de credenciales");

          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          const url = "https://4x3sn0wkaf.execute-api.us-east-2.amazonaws.com/api//auth/users/logIn";
//(req.headers.referer);

          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "tenant": 'gymtest'
            },

            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const rst = await response.json();
          const { body } = rst

          if (response.status != 200 ) {
            return null
          }
          return {
            id: String(body.id),
            name: body.name,
            lastName: body.lastName,
            email: body.email,
            picture: body.image,
            accessToken: body.id_token,
            role: body.role,
      
          };
        } catch (error) {
          //(error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt(data) {
      const { token, account, user, session, trigger } = data;
      // //("callback jwt", data);

      if (user) {
        //("callbackjwt existe user", user);
        token.accessToken = user.accessToken
        token.role = user.role
      }
      if (trigger == "update") {
        const rst = {
          ...token,
          ...session.userData,
        };
        return rst;
      }
      return token;
    },
    async session(data) {
      const { session, token } = data;
      // //(data)
      const rst = {
        ...session,
        userData: token,
        token: token.accessToken as string,
      };

      return rst;
    },
    async signIn({ account, credentials, user, email, profile }) {
      try {
        // data.account.id_token = 'token para emiliorivas sin base'
        return true;
      } catch (error) {
        //(error);
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

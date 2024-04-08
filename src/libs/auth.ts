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
      async authorize(credentials) {
        try {
          console.log("ejecutando autorizer de credenciales");

          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          const existingUser = await prisma.user.findFirst({
            where: { email: credentials?.email },
          });
          if (!existingUser) {
            return null;
          }
          const passwordMatch = await compare(
            credentials?.password,
            existingUser.password || ""
          );
          console.log(credentials?.password);
          if (!passwordMatch) {
            return null;
          }
          return {
            id: String(existingUser.id),
            name: existingUser.name,
            lastName: existingUser.lastName,
            email: existingUser.email,
          };
        } catch (error) {
          console.log(error);
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
      const generateJWT = () => {
        const secret = process.env.NEXTAUTH_SECRET as string;
        const payload = { ...token, id: token.sub };
        const customToken = jwt.sign(payload, secret);
        return customToken;
      };
      const { token, account, user, session, trigger } = data;
      console.log("callback jwt", data);
      if (user) {
        console.log("callbackjwt existe user", user);
      }
      if (account) {
        token.id = token.sub;
        token.accessToken = account.id_token || generateJWT();
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
      const rst = {
        ...session,
        // userData: {
        //   id: token.id as string,
        //   name: token.name as string,
        //   email: token.email as string,
        //   exp: token.exp as number,
        //   iat: token.iat as number,
        //   jti: token.jti as string,
        //   lastname: token.lastname as string,
        //   picture: token.picture as string,
        //   sub: token.sub as string,
        //   accessToken: token.accessToken as string,
        // },
        userData: token,
        token: token.accessToken as string,
      };

      return rst;
    },
    async signIn(data) {
      try {
        console.log("callback sing in", data);

        // data.account.id_token = 'token para emiliorivas sin base'
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

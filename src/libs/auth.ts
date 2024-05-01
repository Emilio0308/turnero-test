import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

let tenant = "";

export const authOptions: NextAuthOptions = {
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
      async authorize(credentials, req) {
        try {
          //("ejecutando autorizer de credenciales");

          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          const url =
            "https://4x3sn0wkaf.execute-api.us-east-2.amazonaws.com/api//auth/users/logIn";
          //(req.headers.referer);

          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              tenant: "gymtest",
            },

            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const rst = await response.json();
          const { body } = rst;
          console.log(rst);
          if (response.status != 200) {
            return null;
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
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.id = user.id;
      }
      if (trigger == "update") {
        const rst = {
          ...token,
          ...session.userData,
        };
        return rst;
      }
      console.log(token)
      return token;
    },
    async session(data) {
      const { session, token } = data;
      const rst = {
        ...session,
        userData: token,
        token: token.accessToken as string,
      };
      return rst;
    },
    async signIn({ account, credentials, user, email, profile }) {
      try {
        if (tenant && account.provider == "google") {
          console.log(tenant);
          const url =
            "https://4x3sn0wkaf.execute-api.us-east-2.amazonaws.com/api/auth/users/googleLogin";
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              tenant,
            },
            body: JSON.stringify({
              account,
              user,
            }),
          });
          const rst = await response.json();
          user.role = rst.body.role;
          user.accessToken = rst.body.id_token;
          user.id = rst.body.id;
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      if (url.includes("google")) {
        const data = JSON.parse(url);
        tenant = data.tenant;
        const rstUrl = `${baseUrl}${data?.url}`;
        return rstUrl;
      }
      return url;
    },
  },
};

export default NextAuth(authOptions);

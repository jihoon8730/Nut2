import NextAuth, { NextAuthOptions } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),

    CredentialsProvider({
      id: "email-password-credential",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize (credentials:any) {

        let db = (await clientPromise).db("nut2");
        let user = await db.collection('user_create').findOne({email: credentials.email})
        
        if (!user) {
          console.log("해당 이메일은 없습니다")
          return null
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log("비밀번호가 틀렸습니다")
          return null
        }
      
        return user;
      }
    })
  ],
  pages: {
    signIn: '/login',
},

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30일
  },

  callbacks: {
    // 4. jwt 만들 때 실행되는 코드 
    jwt: async ({ token, user }:any) => {
      if (user) {
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
        token.user.image = user.image
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }:any) => {
      session.user = token.user;  
      return session;
    },
  },

  secret: "wlgns123",
  adapter : MongoDBAdapter(clientPromise)
};
export default NextAuth(authOptions);

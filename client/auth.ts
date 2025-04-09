import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXT_PUBLIC_APP_URL,
  AUTH_SECRET,
  GITHUB_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
} from "@/config";

export const authOptions = {
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ user }: { user: any; }) {
      try {
        const response = await fetch(`${NEXT_PUBLIC_APP_URL}/api/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          throw new Error("Failed to sign in", await response.json());
        }

        const responseData = await response.json();
        const { user: userData, token } = responseData;

        user.id = userData._id;
        user.accessToken = token;

        return true;
      } catch (error) {
        console.error("Error saving user data:", error);
        return false;
      }
    },

    async session({ session, token }: { session: Session, token: any; }) {
      if (session?.user) {
        session.user.id = token.id;
        session.accessToken = token.accessToken;
      }
      return session;
    },

    async jwt({ token, user }: { token: any, user: any; }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }
      return token;
    },
  },
  secret: AUTH_SECRET,
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
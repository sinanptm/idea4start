import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXT_PUBLIC_APP_URL,
  AUTH_SECRET,
  GITHUB_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  NEXT_PUBLIC_API_URL,
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

        const userData = await response.json();
        console.log("User Data", userData);

        user.id = userData.user._id;
      } catch (error) {
        console.error("Error saving user data:", error);
      }
      return true;
    },

    async session({ session, token }: { session: any, token: any; }) {
      session.user.id = token.id;
      return session;
    },

    async jwt({ token, user }: { token: any, user: any; }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: AUTH_SECRET,
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);

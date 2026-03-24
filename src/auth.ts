import NextAuth from "next-auth";
import LinkedIn from "next-auth/providers/linkedin";

const linkedinClientId = process.env.LINKEDIN_CLIENT_ID;
const linkedinClientSecret = process.env.LINKEDIN_CLIENT_SECRET;

if (!linkedinClientId || !linkedinClientSecret) {
  throw new Error(
    "Missing LinkedIn OAuth config. Set LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET in your environment."
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    LinkedIn({
      clientId: linkedinClientId,
      clientSecret: linkedinClientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = profile as any;
        token.headline = p.headline ?? "";
        token.picture = p.picture ?? token.picture;
      }
      return token;
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (session as any).accessToken = token.accessToken;
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).headline = token.headline ?? "";
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});

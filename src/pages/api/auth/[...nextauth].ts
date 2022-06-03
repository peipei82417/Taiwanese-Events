import { NextApiRequest, NextApiResponse } from "next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    const providers = [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ];

    return await NextAuth(req, res, {
        adapter: MongoDBAdapter(clientPromise),
        providers,
        secret: process.env.SECRET,
        jwt: {
            secret: process.env.SECRET,
        },
        session: {
            // This is the default. The session is saved in a cookie and never persisted anywhere.
            strategy: "jwt",
        },
        // Enable debug messages in the console if you are having problems
        debug: true,

        callbacks: {
            async redirect({ url, baseUrl }) {
                if (url.startsWith("/")) {
                    return `${baseUrl}${url}`;
                } else if (new URL(url).origin === baseUrl) {
                    return url;
                }
                return baseUrl;
            },
            async session({ session, token }) {
                // Send properties to the client, like an access_token from a provider.
                session.accessToken = token.accessToken;
                session.refreshToken = token.refreshToken;
                session.idToken = token.idToken;
                session.provider = token.provider;
                session.id = token.id;
                return session;
            },
            async jwt({ token, user, account }) {
                // Persist the OAuth access_token to the token right after signin
                if (account) {
                    token.accessToken = account.access_token;
                    token.refreshToken = account.refresh_token;
                    token.idToken = account.id_token;
                    token.provider = account.provider;
                }
                if (user) {
                    token.id = user.id.toString();
                }
                return token;
            },
        },
    });
}
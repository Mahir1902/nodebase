import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "./db";


export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    trustedOrigins: process.env.BETTER_AUTH_TRUSTED_ORIGINS
        ? process.env.BETTER_AUTH_TRUSTED_ORIGINS.split(",")
        : [],
    advanced: {
        useSecureCookies: true,
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
});
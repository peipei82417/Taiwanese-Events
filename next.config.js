/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_AUTH_URI: "",
        MONGODB_EVENTS_URI: "",

        DOMAIN: "",

        SECRET: "",

        GOOGLE_ID: "",
        GOOGLE_SECRET: "",

        FACEBOOK_ID: "",
        FACEBOOK_SECRET: "",

        GITHUB_ID: "",
        GITHUB_SECRET: "",
    },
    reactStrictMode: true,
    images: {
        domains: [""],
    },
};

module.exports = nextConfig;

namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {
        GOOGLE_ID: string;
        GOOGLE_SECRET: string;
        FACEBOOK_ID: string;
        FACEBOOK_SECRET: string;
        GITHUB_ID: string;
        GITHUB_SECRET: string;
        SECRET: string;
        MONGODB_AUTH_URI: string;
        MONGODB_EVENTS_URI: string;
    }
}

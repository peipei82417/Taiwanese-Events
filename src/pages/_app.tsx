import "../components/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/layout/Layout";
import { Provider } from "react-redux";
import store from "../store/index";
import { SessionProvider } from "next-auth/react";

const MyApp = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) => {
    return (
        <SessionProvider session={session}>
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </SessionProvider>
    );
};
export default MyApp;

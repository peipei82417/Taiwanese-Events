import SignInForm from "components/ui/signin-form/SignInForm";
import { GetServerSideProps } from "next";
import { getProviders, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "components/layout/Loading";

export interface SignInProps {
    providers: providerProp[];
}

export interface providerProp {
    id: string;
    name: string;
}

const AuthPage = (props: SignInProps) => {
    const { providers } = props;

    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                router.replace("/");
            } else {
                setIsLoading(false);
            }
        });
    }, [router]);

    if (isLoading) {
        return (
            <div className="center">
                <Loading />
            </div>
        );
    }
    return <SignInForm providers={providers} />;
};

export default AuthPage;

export const getServerSideProps: GetServerSideProps = async () => {
    const providers = await getProviders();
    return {
        props: { providers },
    };
};

import UserFavoriteList from "components/pages/UserFavoriteList";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const FavoritePage = (props) => {
    return <UserFavoriteList />;
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    return {
        props: { session: session },
    };
};
export default FavoritePage;

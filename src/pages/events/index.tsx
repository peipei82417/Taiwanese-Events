import { GetServerSideProps } from "next";

function AllEventsPage(props: any) {
    return <div>AllEventsPage</div>;
}

export default AllEventsPage;

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            destination: "/allevent",
            permanent: false,
        },
    };
};

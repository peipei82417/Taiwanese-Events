import { NextPage, GetServerSideProps } from "next";
import { getEventDetailsById, checkIsFavorite } from "utils/api-util";
import Head from "next/head";
import Details from "components/pages/Details";
import { Fragment } from "react";
import Loading from "components/layout/Loading";
import { getSession } from "next-auth/react";

interface DetailPageProps {
    eventDetail: EventDetail;
    isFavorite: boolean;
}

const EventDetailPage: NextPage<DetailPageProps> = (props: DetailPageProps) => {
    const { eventDetail, isFavorite } = props;

    if (!eventDetail) {
        return (
            <div className="center">
                <Loading />
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{eventDetail.title}</title>
            </Head>
            <Details eventDetail={eventDetail} isFavorite={isFavorite} />
        </Fragment>
    );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const session = await getSession({ req: context.req });
    const eventId = context.params.eventId;

    const event = await getEventDetailsById(eventId);

    if (!event) {
        return { notFound: true };
    }

    if (session) {
        const isFavorite = await checkIsFavorite(event, session.user.email);
        return {
            props: {
                eventDetail: event,
                isFavorite: isFavorite,
            },
        };
    }

    return {
        props: {
            eventDetail: event,
            isFavorite: false,
        },
    };
};

export default EventDetailPage;

import Main from "components/pages/Main";
import type { GetServerSideProps, NextPage } from "next";
import { getFeaturedEvents } from "utils/api-util";

export interface HomeProps {
  events: EventSummary[];
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  const { events } = props;
  return <Main events={events} />;
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const featuredEvents = await getFeaturedEvents();
  if (!featuredEvents) {
    return {
      props: {
        events: [],
      },
    };
  }
  return {
    props: {
      events: featuredEvents,
    },
  };
};
export default Home;

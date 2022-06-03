import { Fragment } from "react";
import Head from "next/head";
import AllEvents from "components/pages/AllEvents";
interface AllEventsPageProps {
  events: any[];
}

function AllEventsPage(props: AllEventsPageProps) {
  return (
    <Fragment>
      <Head>{}</Head>
      <AllEvents />
    </Fragment>
  );
}

export default AllEventsPage;

import type { NextPage } from "next";
import PageCard from "../components/global/PageCard";
import Entries from "../components/main/Entries";
import Tabs from "../components/main/Tabs";

const Group: NextPage = () => {
  return <PageCard>
    <Tabs />
    <Entries />
  </PageCard>;
}

export default Group;
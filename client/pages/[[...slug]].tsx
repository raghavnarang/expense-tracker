import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PageCard from "../components/PageCard";
import Tabs, { TabsSkeleton } from "../components/Tabs";
import useFetchGroups from '../hooks/useFetchGroups';
import useToast from "../hooks/useToast";

const Group: NextPage = () => {
  const router = useRouter();

  const { isLoading, isError, data: groups } = useFetchGroups();
  const showToast = useToast();

  useEffect(() => {
    if (isError) {
      showToast('Unable to fetch Expenses');
    }
  }, [isError]);

  const groupTabs: { [key: string]: string } = {};
  if (groups) {
    for (const tab of groups) {
      groupTabs[tab.groupSlug] = tab.title;
    }
  }

  return <PageCard>
    {isLoading ? <TabsSkeleton /> :
      <Tabs tabs={groupTabs} />
    }
  </PageCard>;
}

export default Group;
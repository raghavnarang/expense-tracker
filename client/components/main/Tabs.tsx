import { useEffect } from "react";
import useFetchGroups from "../../hooks/useFetchGroups";
import useToast from "../../hooks/useToast";
import TabsComponent, { TabsSkeleton } from "../global/Tabs";

const Tabs: React.FC = () => {
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

    return isLoading ? <TabsSkeleton /> : <TabsComponent tabs={groupTabs} />
}

export default Tabs;
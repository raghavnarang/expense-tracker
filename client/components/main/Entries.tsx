import { useRouter } from "next/router";
import { useEffect } from "react";

import useFetchEntries from "../../hooks/useFetchEntries";
import useFetchGroups from "../../hooks/useFetchGroups";

import EntryType from "../../types/entry";

import Entry from "../global/Entry";
import EntryHead from "../global/EntryHead";
import EntrySkeleton from "../global/EntrySkeleton";

import EntryAdd from "../main/EntryAdd";

const Entries: React.FC = () => {
    const router = useRouter();
    const groupSlug = Array.isArray(router.query.slug) && router.query.slug.length > 0 ? router.query.slug[0] : '';

    const { isLoading: isGroupsLoading, data: groups } = useFetchGroups();

    let groupId: number | undefined;
    if (!!groups && groups.length > 0) {
        groupId = !!groupSlug ? groups.find(group => group.groupSlug === groupSlug)?.id : groups[0].id;
        groupId = !!groupId ? groupId : groups[0].id;
    }

    const { isLoading, isError, data: entries = [], refetch } = useFetchEntries(groupId);

    if (isError) {
        return <div className={'h-4/6 overflow-y-auto flex justify-center'}>
            <p className={'mt-10 mb-5'}>Unable to list expenses</p>
            <button
                onClick={() => refetch()}
                className={'border border-rose-500 rounded-md text-rose-500 px-7 py-2 text-sm hover:bg-rose-500 hover:text-white transition-colors duration-300'}
            >
                Try Again
            </button>
        </div>;
    }

    if (isGroupsLoading || isLoading) {
        return <div className={'h-4/6 overflow-y-auto'}>
            <EntryHead />
            {Array.from(Array(10).keys()).map(key =>
                <EntrySkeleton key={key} />
            )}
        </div>
    }

    let totalExpenses = 0;
    if (!!entries && entries.length > 0) {
        totalExpenses = entries.reduce<number>((total: number, entry: EntryType) => total + entry.amount, 0);
    }

    return <>
        <div className={'h-5/6 overflow-y-auto'}>
            <EntryHead />
            {entries.length > 0 && entries.map(entry =>
                <Entry key={entry.id} message={entry.message} amount={entry.amount} />
            )}
            {entries.length === 0 && <div className={'flex justify-center'}>
                <p className={'my-5'}>No Expenses found</p>
            </div>}
            {groupId && <EntryAdd groupId={groupId} onSuccess={() => refetch()} />}
        </div>
        <div className={'flex items-center text-gray-500 pt-2 border-t border-gray-300'}>
            <p className={'w-7/12 py-2 px-2 rounded outline-none text-right'}>Total:</p>
            <p className={'w-3/12 py-2 px-2 rounded mr-5 outline-none'}>{totalExpenses}</p>
        </div>
    </>;
}

export default Entries;
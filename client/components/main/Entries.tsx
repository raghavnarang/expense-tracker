import useFetchEntries from "../../hooks/useFetchEntries";
import useFetchGroups from "../../hooks/useFetchGroups";

import EntryType from "../../types/entry";

import EntryHead from "../global/EntryHead";
import EntrySkeleton from "../global/EntrySkeleton";

import EntryAdd from "../main/EntryAdd";
import EntryList from "./EntryList";

const Entries: React.FC = () => {
    const { isLoading: isGroupsLoading, currentGroupId } = useFetchGroups();
    const { isLoading, isError, data: entries = [], refetch } = useFetchEntries(currentGroupId);

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
        totalExpenses = entries.reduce<number>((total: number, entry: EntryType) => total + parseFloat(entry.amount.toString()), 0);
    }

    return <>
        <div className={'h-5/6 overflow-y-auto'}>
            <EntryHead />
            <EntryList entries={entries} refetchEntries={refetch} />
            {currentGroupId && <EntryAdd groupId={currentGroupId} onSuccess={() => refetch()} />}
        </div>
        <div className={'flex items-center text-gray-500 pt-2 border-t border-gray-300'}>
            <p className={'w-7/12 py-2 px-2 rounded outline-none text-right'}>Total:</p>
            <p className={'w-3/12 py-2 px-2 rounded mr-5 outline-none'}>{totalExpenses}</p>
        </div>
    </>;
}

export default Entries;
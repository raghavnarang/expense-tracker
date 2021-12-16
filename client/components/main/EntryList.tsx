import { useEffect } from "react";

import useEditEntry from "../../hooks/useEditEntry";
import useDeleteEntry from "../../hooks/useDeleteEntry";
import useToast from "../../hooks/useToast";

import EntryComponent from "../global/Entry";
import EntrySkeleton from "../global/EntrySkeleton";
import Entry from "../../types/entry";

type propTypes = {
    entries: Entry[], 
    refetchEntries: () => void 
};

const EntryList: React.FC<propTypes> = ({ entries, refetchEntries: refetch }) => {
    const editEntry = useEditEntry();
    const deleteEntry = useDeleteEntry();
    const showToast = useToast();

    useEffect(() => {
        if (editEntry.isSuccess) {
            refetch();
            editEntry.reset();
            showToast('Entry Edited Successfully!');
        }
    }, [editEntry.isSuccess]);

    useEffect(() => {
        if (editEntry.isError) {
            editEntry.reset();
            showToast('Unable to edit entry!');
        }
    }, [editEntry.isError]);

    useEffect(() => {
        if (deleteEntry.isSuccess) {
            refetch();
            deleteEntry.reset();
            showToast('Entry Deleted Successfully!');
        }
    }, [deleteEntry.isSuccess]);

    useEffect(() => {
        if (deleteEntry.isError) {
            deleteEntry.reset();
            showToast('Unable to delete entry!');
        }
    }, [deleteEntry.isError]);

    if (entries.length === 0) {
        return <div>
            <p className={'my-5'}>No Expenses found</p>
        </div>
    }

    const onEdit = (id: number) => (message: string, amount: number) => {
        editEntry.mutate({ id, message, amount });
    }

    const onDelete = (id: number) => () => {
        deleteEntry.mutate(id);
    }

    return <>
        {entries.map(entry =>
            editEntry.variables?.id === entry.id || deleteEntry.variables === entry.id
                ? <EntrySkeleton key={entry.id} />
                : <EntryComponent
                    key={entry.id}
                    message={entry.message}
                    amount={entry.amount}
                    onRequestEdit={onEdit(entry.id)}
                    onRequestDelete={onDelete(entry.id)} />
        )}
    </>;
}

export default EntryList;
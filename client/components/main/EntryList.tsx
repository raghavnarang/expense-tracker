import { useEffect } from "react";
import useEditEntry from "../../hooks/useEditEntry";
import useFetchEntries from "../../hooks/useFetchEntries";
import useToast from "../../hooks/useToast";
import EntryComponent from "../global/Entry";
import EntrySkeleton from "../global/EntrySkeleton";

const EntryList: React.FC<{ groupId: number }> = ({ groupId }) => {
    const { data: entries = [], refetch } = useFetchEntries(groupId);
    const editEntry = useEditEntry();
    const showToast = useToast();

    useEffect(() => {
        if (editEntry.isSuccess) {
            refetch();
            editEntry.reset();
            showToast('Entry Edited Successfully!');
        }
    }, [editEntry.isSuccess]);

    if (entries.length === 0) {
        return <div className={'flex justify-center'}>
            <p className={'my-5'}>No Expenses found</p>
        </div>
    }

    const onEdit = (id: number) => (message: string, amount: number) => {
        editEntry.mutate({ id, message, amount });
    }

    return <>
        {entries.map(entry =>
            editEntry.variables?.id === entry.id ? <EntrySkeleton key={entry.id} /> :
                <EntryComponent
                    key={entry.id}
                    message={entry.message}
                    amount={entry.amount}
                    onEdit={onEdit(entry.id)} />
        )}
    </>;
}

export default EntryList;
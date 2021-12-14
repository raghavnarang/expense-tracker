import { useEffect } from "react";

import useCreateEntry from "../../hooks/useCreateEntry";
import useToast from "../../hooks/useToast";

import EntryAddComponent from '../global/EntryAdd';
import EntrySkeleton from "../global/EntrySkeleton";

const EntryAdd: React.FC<{ groupId: number, onSuccess?: ()=>void }> = ({ groupId = 0, onSuccess }) => {
    const showToast = useToast();

    const createEntry = useCreateEntry();
    const onCreateEntry = (message: string, amount: number) => {
        createEntry.mutate({ message, amount, groupId });
    }

    const { isLoading, isError, isSuccess } = createEntry;
    useEffect(() => {
        if (isError) {
            showToast('Unable to add Entry');
        }
    }, [isError]);

    useEffect(() => {
        if (isSuccess) {
            showToast('Entry Added successfully');
            !!onSuccess && onSuccess();
        }
    }, [isSuccess]);

    if (isLoading) {
        return <EntrySkeleton />
    }

    return <EntryAddComponent onSubmit={onCreateEntry} />
}

export default EntryAdd;
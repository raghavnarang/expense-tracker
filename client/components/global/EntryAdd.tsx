import { useState } from "react";
import EditEntry from "./EditEntry";

type propsType = {
    onSubmit?: (message: string, amount: number) => void
}

const EntryAdd: React.FC<propsType> = ({ onSubmit }) => {
    const [isAdd, setIsAdd] = useState(false);

    const onEditSubmit = (message: string, amount: number) => {
        !!onSubmit && onSubmit(message, amount);
        setIsAdd(false);
    }

    return <>
        {isAdd ?
            <EditEntry
                onCancel={() => setIsAdd(false)}
                onSubmit={onEditSubmit}
            /> :
            <button
                className={'border border-blue-500 rounded-md text-blue-500 px-7 py-2 text-sm hover:bg-blue-500 hover:text-white transition-colors duration-300'}
                onClick={() => setIsAdd(true)}
            >
                Add
            </button>
        }
    </>;
}

export default EntryAdd
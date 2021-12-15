import { useState } from 'react';
import { TiTick, TiCancel } from 'react-icons/ti';

type propsType = {
    onCancel?: () => void,
    onSubmit?: (title: string) => void,
    title?: string
}

const EditGroup: React.FC<propsType> = ({ onCancel, onSubmit, title: initTitle }) => {
    const [title, setTitle] = useState<string>(!!initTitle ? initTitle : '');

    return <div className={'border-b border-gray-300 py-3 flex justify-between items-center'}>
        <input
            onChange={e => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
            type="text"
            autoFocus={true}
            className={'w-4/12 border border-gray-300 rounded outline-none'} />

        <div>
            <button
                className={'rounded-full border border-green-500 p-1 mr-2'}
                onClick={() => !!onSubmit && onSubmit(title)}
            >
                <TiTick className={'text-green-500 w-5 h-5'} />
            </button>
            <button
                className={'rounded-full border border-rose-500 p-1'}
                onClick={() => !!onCancel && onCancel()}
            >
                <TiCancel className={'text-rose-500 w-5 h-5'} />
            </button>
        </div>
    </div>
}

export default EditGroup;
import { useEffect, useRef, useState } from "react";

type propsType = {
    text?: string,
    buttons: {
        [key: string]: string
    },
    radios?: {
        [key: string]: string
    },
    selectedRadio?: string
    onButtonClick?: (button: string, radioOption?: string) => void,
    onRequestClose?: () => void,
    size?: string
}

/** Note: Always place it within a button */
const TooltipConfirmation: React.FC<propsType> = ({ text, buttons, radios, selectedRadio, onButtonClick, size = 'sm', onRequestClose }) => {
    const [currentRadio, setCurrentRadio] = useState(selectedRadio);

    const tipSize = size === 'md' ? 'w-80' : 'w-60';

    const tipRef = useRef(null);

    useEffect(() => {
        /** Close on Outside Click */
        const onOutsideClick = (e: MouseEvent) => {
            if (!(tipRef.current as any)?.contains(e.target)) {
                !!onRequestClose && onRequestClose();
            }
        }

        document.addEventListener('click', onOutsideClick);
        return () => {
            document.removeEventListener('click', onOutsideClick);
        }
    }, []);



    return <div className={'relative w-0 h-0'}>
        <div ref={tipRef} className={`absolute top-2 -right-10 bg-gray-800 rounded-lg py-2 px-4 ${tipSize}`}>
            {/** Text */}
            {!!text && <p className={'text-white text-md mt-1'}>{text}</p>}

            {/** Radio */}
            {!!radios && Object.keys(radios).map(radio =>
                <label className={'text-gray-300 text-sm flex items-center my-2'}>
                    <input
                        className={'mr-2'}
                        type='radio'
                        value={radio}
                        checked={currentRadio === radio}
                        onChange={(e) => setCurrentRadio(e.target.value)} />

                    {radios[radio]}
                </label>
            )}

            <div>
                {Object.keys(buttons).map(btn =>
                    <button
                        key={btn}
                        className={'border-none text-gray-300 text-sm mr-4 mt-2 mb-1 hover:text-white'}
                        onClick={() => !!onButtonClick && onButtonClick(btn, currentRadio)}
                    >
                        {buttons[btn]}
                    </button>
                )}
            </div>
        </div>
        <span className={'absolute -top-2 -right-6 border-t-transparent border-x-transparent border-8 border-b-gray-800 block w-px h-px'} />
    </div>
}

export default TooltipConfirmation
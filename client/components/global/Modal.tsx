import { MouseEventHandler, useEffect, useRef } from "react";

type propsType = {
    onRequestClose?: () => void,
    size?: string
}

const Modal: React.FC<propsType> = ({ onRequestClose, children, size = 'md' }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    /** Close Modal on Escape */
    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                !!onRequestClose && onRequestClose();
            }
        };

        document.addEventListener('keydown', onEsc);
        return () => document.removeEventListener('keydown', onEsc);
    }, []);

    /** Close on Outside Click */
    const onOutsideClick: MouseEventHandler = (e) => {
        if (!(modalRef.current as any)?.contains(e.target)) {
            !!onRequestClose && onRequestClose();
        }
    }

    const modalSize = size === 'md' ? 'w-6/12' : 'w-3/12';

    return <div onClick={onOutsideClick} className={'absolute bg-black-rgba w-screen h-screen top-0 left-0 flex justify-center items-center'}>
        <div ref={modalRef} className={`h-4/6 ${modalSize} rounded-lg bg-white px-10 py-5`}>
            {children}
        </div>
    </div>;
}

export default Modal;
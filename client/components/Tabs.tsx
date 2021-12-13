import dynamic from 'next/dynamic'
import { KeyboardEvent, useState, useRef } from 'react';

const ContentLoader = dynamic(
    () => import('react-content-loader'),
    { ssr: false }
)

type propsType = {
    tabs: {
        [key: string]: string
    }, 
    onTabClick?: (tab: string) => void,
    onTabAdd?: (tab: string) => void,
    isAddLoading?: boolean
}

const Tabs: React.FC<propsType> = ({ tabs, onTabClick, onTabAdd, isAddLoading = false }) => {

    const [newTab, setNewTab] = useState(false);
    const [newTabText, setNewTabText] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setNewTab(false);
            !!onTabAdd && onTabAdd(newTabText);
            setNewTabText('');
        }
    };

    return <div>
        {Object.keys(tabs).map(tab =>
            <div
                className={'px-7 py-3 rounded-t-xl mr-2 cursor-pointer text-sm border border-gray-300 hover:shadow inline-block'}
                key={tab}
                onClick={() => !!onTabClick && onTabClick(tab)}
            >
                {tabs[tab]}
            </div>
        )}
        {!newTab && <div
            className={'p-0 m-0 w-8 h-8 pb-1 rounded-2xl cursor-pointer border border-gray-300 inline-flex items-center justify-center hover:shadow-md'}
            onClick={() => {
                setNewTab(true)
            }}
        >
            +
        </div>}
        {newTab && <div
            className={'px-7 py-3 rounded-t-xl mr-2 cursor-pointer text-sm border border-gray-300 hover:shadow inline-block'}
        >
            <input
                className={'outline-none border-none'}
                ref={inputRef}
                type="text"
                value={newTabText}
                onChange={e => setNewTabText(e.target.value)}
                onKeyDown={onKeyDown}
                autoFocus={true}
            />
        </div>}
    </div>;
}

export const TabsSkeleton: React.FC<{ tabs?: number }> = ({ tabs = 5 }) => {
    return <div>
        {Array.from(Array(tabs).keys()).map(tab =>
            <div
                className={'px-7 py-3 rounded-t-xl mr-2 text-sm border border-gray-300 inline-block'}
                key={tab}
            >
                <ContentLoader
                    speed={2}
                    width={30}
                    height={20}
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="0" ry="0" width="30" height="20" />
                </ContentLoader>
            </div>
        )}
    </div>;
}

export default Tabs;
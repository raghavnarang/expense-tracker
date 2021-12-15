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
    isAddLoading?: boolean,
    currentTab?: string
}

const Tabs: React.FC<propsType> = ({ tabs, onTabClick, onTabAdd, currentTab, isAddLoading, children }) => {

    const [newTab, setNewTab] = useState(false);
    const [newTabText, setNewTabText] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setNewTab(false);
            !!onTabAdd && onTabAdd(newTabText);
            setNewTabText('');
        }

        if (e.key === 'Escape') {
            setNewTab(false);
            setNewTabText('');
        }
    };

    const activeClass = (tab: string) => currentTab === tab ? 'border-gray-400 border-b-0 shadow' : 'border-b-0 border-gray-300';

    return <div className={'border-b border-gray-300'}>
        {Object.keys(tabs).map(tab =>
            <div
                className={`px-7 py-3 rounded-t-xl mr-2 cursor-pointer text-sm hover:shadow inline-block border ${activeClass(tab)}`}
                key={tab}
                onClick={() => !!onTabClick && onTabClick(tab)}
            >
                {tabs[tab]}
            </div>
        )}
        {!newTab && <div
            className={'p-0 m-0 w-8 h-8 pb-1 rounded-2xl cursor-pointer border border-gray-300 inline-flex items-center justify-center hover:shadow-md'}
            onClick={() => setNewTab(true)}
        >
            {isAddLoading ? <ContentLoader
                speed={2}
                width={30}
                height={20}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="0" ry="0" width="30" height="20" />
            </ContentLoader> : '+'}
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
        {children}
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
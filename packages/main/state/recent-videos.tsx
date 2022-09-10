import React, {createContext, useContext, useEffect, useState} from 'react';
import {getAllFromDB, removeFromLs, setToLs} from '../data/recent-videos';
import {RecentVideo} from '@app/main/shared';

/* create contexts */
const RecentVideosContext = createContext(null);
const RecentVideosDispatchContext = createContext(null);

/* define hooks for using contexts value */
export function useRecentVideos() {
    return useContext(RecentVideosContext);
}

export function useRecentVideosDispatch() {
    return useContext(RecentVideosDispatchContext);
}

/* define hooks for mutate context value (state) */
export function useAddToRecent() {
    const dispatch = useRecentVideosDispatch();

    return async (file: File) => {
        const data = {
            id: Math.floor(Math.random() * 10000),
            name: file.name,
            elapsedTime: 0,
            file
        };

        await setToLs(data);
        dispatch((p: RecentVideo[]) => [...p, data]);
    };
}

export function useRemoveFromRecent() {
    const dispatch = useRecentVideosDispatch();

    return async (id: number) => {
        await removeFromLs(String(id));
        dispatch((p: RecentVideo[]) => p.filter(item => item.id === id));
    };
}

/* context provider */
export function RecentVideosProvider({children}: {children: React.ReactNode}) {
    const [recent, setRecent] = useState<RecentVideo[]>([]);

    /* initialize state */
    useEffect(() => {
        (async () => {
            setRecent(await getAllFromDB());
        })()
    }, [])

    return (
        <RecentVideosContext.Provider value={recent}>
            <RecentVideosDispatchContext.Provider value={setRecent}>
                {children}
            </RecentVideosDispatchContext.Provider>
        </RecentVideosContext.Provider>
    )
}

/* utils */


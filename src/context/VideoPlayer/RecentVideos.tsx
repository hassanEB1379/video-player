import React, {createContext, useContext, useMemo, useState} from 'react';

export interface RecentVideo {
    id: number;
    name: string;
    elapsedTime: number;
    file: Blob;
}

const recentVideosContext = createContext(null);

export function useRecentVideos() {
    return useContext(recentVideosContext);
}

export default function RecentVideosProvider({children}: {children: React.ReactNode}) {
    const [recent, setRecent] = useState(getFromLs());

    const add = (file: File) => {
        const data = {
            id: Math.floor(Math.random() * 10000),
            name: file.name,
            elapsedTime: 0,
            file
        };

        setToLs(data);
        setRecent((p: RecentVideo[]) => [...p, data]);
    }

    const remove = (id: number) => {
        removeFromLs(id);
        setRecent((p: RecentVideo[]) => p.filter(item => item.id === id));
    }

    const value = useMemo(() => ({
        recent,
        add,
        remove
    }), [recent])

    return (
        <recentVideosContext.Provider value={value}>
            {children}
        </recentVideosContext.Provider>
    )
}

// utils
const KEY = 'recent-videos';

const getFromLs = () => {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

const setToLs = (data: RecentVideo) => {
    localStorage.setItem(KEY, JSON.stringify([...getFromLs(), data]));
}

const removeFromLs = (id: number) => {
    localStorage.setItem(
        KEY,
        JSON.stringify(getFromLs().filter((item: RecentVideo) => item.id === id))
    )
}
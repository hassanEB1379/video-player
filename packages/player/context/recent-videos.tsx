import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import * as localforage from 'localforage';
import 'regenerator-runtime/runtime'

const recentVideosDB = localforage.createInstance({
    name: 'recent-videos'
});

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

export function RecentVideosProvider({children}: {children: React.ReactNode}) {
    const [recent, setRecent] = useState<RecentVideo[]>([]);

    const add = async (file: File) => {
        const data = {
            id: Math.floor(Math.random() * 10000),
            name: file.name,
            elapsedTime: 0,
            file
        };

        await setToLs(data);
        setRecent((p: RecentVideo[]) => [...p, data]);
    }

    const remove = async (id: number) => {
        await removeFromLs(String(id));
        setRecent((p: RecentVideo[]) => p.filter(item => item.id === id));
    }

    const value = useMemo(() => ({
        recent,
        add,
        remove
    }), [recent])

    useEffect(() => {
        (async () => {
            setRecent(await getAllFromDB());
        })()
    }, [])

    return (
        <recentVideosContext.Provider value={value}>
            {children}
        </recentVideosContext.Provider>
    )
}

// utils
const getAllFromDB = async () => {
    const data: RecentVideo[] = [];

    await recentVideosDB.iterate(function (value: RecentVideo) {
        data.push(value);
    })

    return data;
}

const setToLs = async (data: RecentVideo) => {
    await recentVideosDB.setItem(String(data.id), data)
}

const removeFromLs = async (key: string) => {
    await recentVideosDB.removeItem(key)
}
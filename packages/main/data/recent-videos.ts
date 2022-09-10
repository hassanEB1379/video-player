import * as localforage from 'localforage';
import {RecentVideo} from '@app/main/shared';
import 'regenerator-runtime/runtime';

const recentVideosDB = localforage.createInstance({
    name: 'recent-videos'
});

export const getAllFromDB = async () => {
    const data: RecentVideo[] = [];

    await recentVideosDB.iterate(function (value: RecentVideo) {
        data.push(value);
    })

    return data;
}

export const setToLs = async (data: RecentVideo) => {
    await recentVideosDB.setItem(String(data.id), data)
}

export const removeFromLs = async (key: string) => {
    await recentVideosDB.removeItem(key)
}
import React, {createContext, useContext, useState} from 'react';

const VolumeContext = createContext(null);
const VolumeDispatchContext = createContext(null);

export function useVideoVolume() {
    return useContext(VolumeContext);
}

export function useDispatchVideoVolume() {
    return useContext(VolumeDispatchContext);
}

export function VolumeProvider({children}: {children: React.ReactNode}) {
    const [volume, setVolume] = useState(1);

    return (
        <VolumeContext.Provider value={volume}>
            <VolumeDispatchContext.Provider value={setVolume}>
                {children}
            </VolumeDispatchContext.Provider>
        </VolumeContext.Provider>
    )
}

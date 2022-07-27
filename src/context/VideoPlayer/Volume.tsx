import React, {createContext, useContext, useState} from 'react';

const VolumeContext = createContext(null);

export function useVideoVolume() {
    return useContext(VolumeContext);
}

export default function VolumeProvider({children}: {children: React.ReactNode}) {
    const [volume, setVolume] = useState(1);

    return (
        <VolumeContext.Provider value={{volume, setVolume}}>
            {children}
        </VolumeContext.Provider>
    )
}

import React, {createContext, useContext, useState} from 'react';

const videoSrcContext = createContext(null);

export function useVideoSrc() {
    return useContext(videoSrcContext);
}

export function VideoSrcProvider({children}: {children: React.ReactNode}) {
    const [src, setSrc] = useState('');

    const setVideoSrc = (file: File) => {
        setSrc(URL.createObjectURL(file))
    }

    return (
        <videoSrcContext.Provider value={{src, setVideoSrc}}>
            {children}
        </videoSrcContext.Provider>
    )
}
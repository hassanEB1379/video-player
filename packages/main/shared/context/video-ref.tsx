import React, {createContext, useContext} from 'react';

/* create contexts */
const VideoRefContext = createContext(null);

/* define hooks for using contexts value */
export function useVideoRef() {
    return useContext(VideoRefContext);
}

/* context provider */
export function VideoRefProvider({children, value}: ProviderProps) {

    return (
        <VideoRefContext.Provider value={value}>
            {children}
        </VideoRefContext.Provider>
    )
}


interface ProviderProps {
    children: React.ReactNode,
    value: React.MutableRefObject<HTMLVideoElement>
}

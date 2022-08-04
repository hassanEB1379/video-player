import React, {createContext, useContext, useState} from 'react';

/* create contexts */
const SubtitleContext = createContext(null);
const SubtitleDispatchContext = createContext(null);

/* define hooks for using contexts value */
export function useSubtitle() {
    return useContext(SubtitleContext);
}

export function useSubtitleDispatch() {
    return useContext(SubtitleDispatchContext);
}

/* context provider */
export function SubtitleProvider({children}: {children: React.ReactNode}) {
    const [subtitle, setSubtitle] = useState(1);

    return (
        <SubtitleContext.Provider value={subtitle}>
            <SubtitleDispatchContext.Provider value={setSubtitle}>
                {children}
            </SubtitleDispatchContext.Provider>
        </SubtitleContext.Provider>
    )
}

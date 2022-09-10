import React, {createContext, useContext, useState} from 'react';

/* create contexts */
const SpeedContext = createContext(null);
const SpeedDispatchContext = createContext(null);

/* define hooks for using contexts value */
export function useVideoSpeed() {
    return useContext(SpeedContext);
}

export function useDispatchVideoSpeed() {
    return useContext(SpeedDispatchContext);
}

/* context provider */
export function SpeedProvider({children}: {children: React.ReactNode}) {
    const [speed, setSpeed] = useState(1);

    return (
        <SpeedContext.Provider value={speed}>
            <SpeedDispatchContext.Provider value={setSpeed}>
                {children}
            </SpeedDispatchContext.Provider>
        </SpeedContext.Provider>
    )
}

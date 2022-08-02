import React, {createContext, useContext, useState} from 'react';

const SpeedContext = createContext(null);

export function useVideoSpeed() {
    return useContext(SpeedContext);
}

export function SpeedProvider({children}: {children: React.ReactNode}) {
    const [speed, setSpeed] = useState(1);

    return (
        <SpeedContext.Provider value={{speed, setSpeed}}>
            {children}
        </SpeedContext.Provider>
    )
}

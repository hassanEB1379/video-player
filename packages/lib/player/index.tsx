import React, {createContext, Dispatch, MutableRefObject, SetStateAction, useContext, useState} from 'react';

type TRef = MutableRefObject<HTMLMediaElement>

interface IPlayer {
    ref: TRef;
}

interface IPlayerProvider {
    children: React.ReactNode;
    ref: TRef
}

const PlayerContext = createContext<IPlayer | null>(null);
const PlayerDispatcherContext =
    createContext<Dispatch<SetStateAction<IPlayer>> | null>(null);

export const PlayerProvider = ({children, ref}: IPlayerProvider) => {
    const [state, setState] = useState<IPlayer | null>({ref})

    return (
        <PlayerContext.Provider value={state}>
            <PlayerDispatcherContext.Provider value={setState}>
                {children}
            </PlayerDispatcherContext.Provider>
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}

export const usePlayerDispatcher = () => {
    return useContext(PlayerDispatcherContext);
}
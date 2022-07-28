import React, {createContext, useContext, useEffect, useState} from 'react';

const MessageContext = createContext(null);

export function useVideoMessage() {
    return useContext(MessageContext);
}

const MESSAGE_TIMEOUT = 1500;

export default function VideoMessageProvider({children}: {children: React.ReactNode}) {
    const [msg, setMsg] = useState('');

    const pushMessage = (newMsg: string) => {
        setMsg(newMsg);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMsg('');
        }, MESSAGE_TIMEOUT);

        return () => {
            clearTimeout(timeout);
        }
    }, [msg])

    return (
        <MessageContext.Provider value={{msg, pushMessage}}>
            {children}
        </MessageContext.Provider>
    )
}
import React, {createContext, useContext, useEffect, useState} from 'react';

/* create contexts */
const MessageContext = createContext(null);
const MessageDispatchContext = createContext(null);

/* define hooks for using contexts value */
export function useMessage() {
    return useContext(MessageContext);
}

export function useMessageDispatch() {
    return useContext(MessageDispatchContext);
}

/* define hooks for mutate context value (state) */
export function usePushMessage() {
    const dispatch = useMessageDispatch();
    const msg = useMessage();

    const pushMessage = (newMsg: string) => {
        dispatch(newMsg);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch('');
        }, MESSAGE_TIMEOUT);

        return () => {
            clearTimeout(timeout);
        }
    }, [msg])

    return pushMessage;
}

/* context provider */
export function VideoMessageProvider({children}: {children: React.ReactNode}) {
    const [msg, setMsg] = useState('');

    return (
        <MessageContext.Provider value={msg}>
            <MessageDispatchContext.Provider value={setMsg}>
                {children}
            </MessageDispatchContext.Provider>
        </MessageContext.Provider>
    )
}

/* utils */
const MESSAGE_TIMEOUT = 1500;


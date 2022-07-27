import {useEffect} from 'react';

export function useShortcut(shortcut: string, fn: () => void) {
    const keys = shortcut.split('+').map(key => {
        if (key === 'shift' || key === 'alt' || key === 'ctrl') {
            return key + 'Key';
        }

        return key;
    });

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (
                !event.repeat &&
                //@ts-ignore
                keys.every(key => event[key] || event.key.toLowerCase() === key.toLowerCase())
            ){
                fn();
                event.preventDefault();
            }
        }

        document.addEventListener('keydown', listener);

        return () => {
            document.removeEventListener('keydown', listener);
        }
    }, []);

    return fn;
}
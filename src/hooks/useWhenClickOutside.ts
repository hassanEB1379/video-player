import { useEffect } from 'react';

/*
 * 	this hook get an array of ref elements (ref.current) that applied to nodes
 * 	and invoked callback when click outside these nodes
 * */
export function useWhenClickOutside(elements: HTMLElement[], callback: () => void) {
    useEffect(() => {
        const handleEvent = (e: MouseEvent) => {
            for (const elm of elements) {
                // Do nothing if clicking ref's element or descendent elements
                if (!elm || elm.contains(e.target as Node)) {
                    return;
                }
            }

            callback();
        };

        document.addEventListener('mouseup', handleEvent);
        document.addEventListener('touchend', handleEvent);

        return () => {
            document.removeEventListener('mouseup', handleEvent);
            document.removeEventListener('touchend', handleEvent);
        };
    }, [callback, elements]);
}

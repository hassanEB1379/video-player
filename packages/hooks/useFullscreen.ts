import {useEffect, useState} from 'react';
import {isFullScreen as detectFullscreen, toggleFullscreen} from '../utils/toggleFullscreen';

export function useFullscreen() {
    const [isFullscreen, setIsFullscreen] = useState(detectFullscreen());

    useEffect(() => {
        const listener = () => setIsFullscreen(p => !p);

        document.addEventListener('fullscreenchange', listener);

        return () => document.removeEventListener('fullscreenchange', listener)
    }, [])

    return {
        toggleFullscreen,
        isFullscreen
    }
}
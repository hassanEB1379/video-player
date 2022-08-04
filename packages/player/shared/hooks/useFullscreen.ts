// @ts-nocheck
import {useEffect, useState} from 'react';

const fullScreenEnabled = !!(document.fullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled ||
    document.webkitSupportsFullscreen ||
    document.webkitFullscreenEnabled ||
    document.createElement('video').webkitRequestFullScreen
);

export const detectFullscreen = function() {
    return !!(document.fullscreen ||
        document.webkitIsFullScreen ||
        document.mozFullScreen ||
        document.msFullscreenElement ||
        document.fullscreenElement
    );
}

export function toggleFullscreen(elm: HTMLElement) {
    if (!fullScreenEnabled) return;

    if (isFullScreen()) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    }
    else {
        if (elm.requestFullscreen) elm.requestFullscreen();
        else if (elm.mozRequestFullScreen) elm.mozRequestFullScreen();
        else if (elm.webkitRequestFullScreen) elm.webkitRequestFullScreen();
        else if (elm.msRequestFullscreen) elm.msRequestFullscreen();
    }
}

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
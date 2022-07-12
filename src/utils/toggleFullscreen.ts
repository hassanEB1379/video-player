// @ts-nocheck
const fullScreenEnabled = !!(document.fullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled ||
    document.webkitSupportsFullscreen ||
    document.webkitFullscreenEnabled ||
    document.createElement('video').webkitRequestFullScreen
);

export const isFullScreen = function() {
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
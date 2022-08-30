import React, {useEffect, useState} from 'react';

interface Props {
    isFullscreen: boolean,
    showOnMouseMove: (e: MouseEvent) => boolean,
    children: React.ReactNode
}

export const HideOnFullscreen = ({showOnMouseMove, isFullscreen, children}: Props) => {
    const [show, setShow] = useState(isFullscreen);

    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (showOnMouseMove(e)) {
                setShow(true);
            }
        };

        if (isFullscreen) {
            setShow(false);
            document.addEventListener('mousemove', listener);
        }
        else setShow(true)

        return () => {
            if (isFullscreen) document.removeEventListener('mousemove', listener)
        };
    }, [isFullscreen]);

    return (
        <div
            style={{display: show ? 'block' : 'none'}}
            onMouseLeave={() => isFullscreen && setShow(false)}
        >
            {children}
        </div>
    );
};
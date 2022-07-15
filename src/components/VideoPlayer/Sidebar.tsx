import React, {useEffect} from 'react';
import styles from '../../styles/video-player.module.css'

interface Props {
    onHide: () => void,
    onShow: () => void,
    isFullscreen: boolean,
    showSidebar: boolean
}

const Sidebar = ({onHide, onShow, isFullscreen, showSidebar}: Props) => {
    useEffect(() => {
        const listener = (e: MouseEvent) => {
            console.log(e.clientX, window.innerWidth)
            if (e.clientX >= window.innerWidth - 10) {
                onShow();
            }
        };

        if (isFullscreen) {
            onHide();
            document.addEventListener('mousemove', listener);
        }
        else onShow()

        return () => {
            if (isFullscreen) document.removeEventListener('mousemove', listener)
        };
    }, [isFullscreen])

    return (
        <aside
            style={{display: showSidebar ? 'block' : 'none'}}
            onMouseLeave={() => isFullscreen && onHide()}
            className={styles.sidebar}
        >
            <ul>
                <li>Recent</li>
            </ul>
        </aside>
    );
};

export default Sidebar;
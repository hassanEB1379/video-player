import React, {useEffect} from 'react';
import styles from '../../styles/video-player.module.css'
import {RecentVideo, useRecentVideos} from '../../context/VideoPlayer/RecentVideos';
import {useVideoSrc} from '../../context/VideoPlayer/VideoSrc';

interface Props {
    onHide: () => void,
    onShow: () => void,
    isFullscreen: boolean,
    showSidebar: boolean
}

const Sidebar = ({onHide, onShow, isFullscreen, showSidebar}: Props) => {
    const {recent} = useRecentVideos();
    const {setVideoSrc} = useVideoSrc();

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

                {recent.map((item: RecentVideo) => (
                    <li key={item.id}>
                        <button
                            onClick={() => setVideoSrc(item.file)}
                        >
                            {item.name}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
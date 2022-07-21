import React, {useEffect} from 'react';
import styles from '../../styles/video-player.module.css'
import {RecentVideo, useRecentVideos} from '../../context/VideoPlayer/RecentVideos';
import {useVideoSrc} from '../../context/VideoPlayer/VideoSrc';
import {BsImage} from 'react-icons/bs';
import {getFormattedTime} from '../../utils/getFormattedTime';

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
            </ul>

            <ul className={styles.sidebarList}>
                {recent.map((item: RecentVideo) => (
                    <li key={item.id}>
                        <button
                            className={styles.sidebarListItem}
                            onClick={() => setVideoSrc(item.file)}
                        >
                            <BsImage/>
                            {item.name}
                            <p>{getFormattedTime(item.elapsedTime)}</p>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
import React, {useEffect} from 'react';
import {getFormattedTime, RecentVideo} from '@app/player/shared';
import {useRecentVideos} from '../../state/recent-videos';
import {useVideoSrc} from '../../state/video-src';
import {BsImage} from 'react-icons/bs';
import styles from './Sidebar.module.css';

interface Props {
    onHide: () => void,
    onShow: () => void,
    isFullscreen: boolean,
    showSidebar: boolean
}

const Sidebar = ({onHide, onShow, isFullscreen, showSidebar}: Props) => {
    const recent = useRecentVideos();
    const {setVideoSrc} = useVideoSrc();

    useEffect(() => {
        const listener = (e: MouseEvent) => {
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
            <ul className={styles.sidebarTabs}>
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
import React from 'react';
import {getFormattedTime, RecentVideo} from '@app/main/shared';
import {useRecentVideos} from '../state/recent-videos';
import {useVideoSrc} from '../state/video-src';
import {BsImage} from 'react-icons/bs';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const recent = useRecentVideos();
    const {setVideoSrc} = useVideoSrc();

    return (
        <aside className={styles.sidebar}>
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
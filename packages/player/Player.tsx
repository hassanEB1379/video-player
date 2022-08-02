import React, { useRef, useState} from 'react';
import {useFullscreen} from '@app/hooks';
import styles from './Player.module.css';
import Footer from './footer/Footer';
import Sidebar from './sidebar/Sidebar';
import StartMenu from './start-menu/StartMenu';
import Message from './message/Message';
import {useRecentVideos} from './context/recent-videos';
import {useVideoSrc} from './context/video-src';

export const Player = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [subtitleSrc, setSubtitleSrc] = useState('');
    const {src, setVideoSrc} = useVideoSrc();
    const {add: addToRecent} = useRecentVideos();

    const player = useRef<HTMLVideoElement>(null);
    const playerContainer = useRef<HTMLDivElement>(null);

    const {toggleFullscreen, isFullscreen} = useFullscreen();

    const handleToggleSidebar = (state?: boolean | undefined) => {
        setShowSidebar(p => state ?? !p);
    }

    const handleSelectFile = (file: File) => {
        setVideoSrc(file);
        addToRecent(file);
    }

    return (
        <div
            ref={playerContainer}
            className={`${styles.container}`}
        >
            <div className={styles.player}>
                <Message/>

                {!src && <StartMenu onSelectFile={handleSelectFile}/>}

                {src &&
                        <div className={styles.video}>
                            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                            <video
                                preload='metadata'
                                src={src}
                                ref={player}
                                title=''
                                disablePictureInPicture
                                width={854}
                                height={480}
                            >
                                <track
                                    label='subtitles'
                                    src={subtitleSrc}
                                    kind='subtitles'
                                    srcLang='en'
                                    default
                                />
                            </video>
                        </div>}

                <Footer
                    player={player}
                    fullscreenTarget={playerContainer}
                    setSubtitleSrc={setSubtitleSrc}
                    onToggleSidebar={handleToggleSidebar}
                    onToggleFullscreen={toggleFullscreen}
                    isFullscreen={isFullscreen}
                />
            </div>

            <Sidebar
                showSidebar={showSidebar}
                isFullscreen={isFullscreen}
                onShow={() => handleToggleSidebar(true)}
                onHide={() => handleToggleSidebar(false)}
            />
        </div>
    );
};
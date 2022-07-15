import React, { useRef, useState} from 'react';
import styles from '../../styles/video-player.module.css';
import Footer from './Footer';
import Sidebar from './Sidebar';
import StartMenu from './StartMenu';
import {useFullscreen} from '../../hooks/useFullscreen';

const VideoPlayer = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [subtitleSrc, setSubtitleSrc] = useState('');
    const [src, setSrc] = useState('');

    const player = useRef<HTMLVideoElement>(null);
    const playerContainer = useRef<HTMLDivElement>(null);

    const {toggleFullscreen, isFullscreen} = useFullscreen();

    const handleToggleSidebar = (state?: boolean | undefined) => {
        setShowSidebar(p => state ?? !p);
    }

    const handleSelectFile = (file: File) => {
        setSrc(URL.createObjectURL(file))
    }

    return (
        <div
            ref={playerContainer}
            className={`${styles.container} ${isFullscreen ? styles.fullscreen : ''}`}
        >
            <div className={styles.player}>
                {!src && <StartMenu onSelectFile={handleSelectFile}/>}

                {src &&
                    <div className={styles.video}>
                        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                        <video
                            preload='metadata'
                            src={src}
                            ref={player}
                            title=''
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

export default VideoPlayer;
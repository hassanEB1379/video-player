import React, {useEffect, useRef, useState} from 'react';
import Timeline from './Timeline';
import Volume from './Volume';
import Speed from './Speed';
import styles from '../../styles/video-player.module.css';
import {
    BsPlayFill,
    BsArrowClockwise,
    BsArrowCounterclockwise,
    BsPauseFill,
    BsFillVolumeDownFill,
    BsSpeedometer,
    BsFullscreen,
    BsFullscreenExit
} from 'react-icons/bs';
import {useFullscreen} from '../../hooks/useFullscreen';

interface Props {
    src: string;
}

const VideoPlayer = ({src = ''}: Props) => {
    const [paused, setPaused] = useState(true);
    const [showFooter, setShowFooter] = useState(true);

    const player = useRef<HTMLVideoElement>(null);
    const playerContainer = useRef<HTMLDivElement>(null);

    const {toggleFullscreen, isFullscreen} = useFullscreen();

    const play = () => {
        player.current.play().then(() => setPaused(false));
    }

    const pause = () => {
        setPaused(true);
        player.current.pause();
    }

    const goFurther = (s: number) => {
        player.current.currentTime += s;
    }

    const goBack = (s: number) => {
        player.current.currentTime -= s;
    }

    const handleHideFooter = () => {
        if (isFullscreen) setShowFooter(false);
    }

    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (e.clientY >= window.innerHeight - 10) {
                setShowFooter(true);
            }
        };

        if (isFullscreen) document.addEventListener('mousemove', listener);
        else setShowFooter(true);

        return () => {if (isFullscreen) document.removeEventListener('mousemove', listener)};
    }, [isFullscreen])

    return (
        <div
            ref={playerContainer}
            className={`${styles.container} ${isFullscreen ? styles.fullscreen : ''}`}
        >
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <div className={styles.player}>
                <video
                    preload='metadata'
                    src={src}
                    ref={player}
                    title=''
                />
            </div>

            {showFooter &&
                <footer
                    onMouseLeave={handleHideFooter}
                    className={styles.footer}
                >
                    <Timeline video={player.current}/>

                    <div className={styles.controlsContainer}>
                        <div className={styles.buttonGroup}>
                            <button
                                onClick={() => toggleFullscreen(playerContainer.current)}
                                title='fullscreen mode'
                            >
                                {isFullscreen ? <BsFullscreenExit/> : <BsFullscreen/>}
                            </button>
                        </div>

                        <div className={styles.controls}>
                            <button
                                title='20s behind'
                                onClick={() => goBack(20)}
                            >
                                <BsArrowCounterclockwise/>
                            </button>

                            {paused ?
                                <button
                                    title='play'
                                    onClick={play}
                                >
                                    <BsPlayFill/>
                                </button>:
                                <button
                                    title='pause'
                                    onClick={pause}
                                >
                                    <BsPauseFill/>
                                </button>}

                            <button
                                title='20s further'
                                onClick={() => goFurther(20)}
                            >
                                <BsArrowClockwise/>
                            </button>
                        </div>

                        <div className={styles.buttonGroup}>
                            <Speed
                                video={player.current}
                                trigger={(open) => (
                                    <button
                                        onClick={open}
                                        title='speed'
                                    >
                                        <BsSpeedometer size='1.5em'/>
                                    </button>
                                )}
                            />


                            <Volume
                                video={player.current}
                                trigger={(open) => (
                                    <button
                                        title='volume'
                                        onClick={open}
                                    >
                                        <BsFillVolumeDownFill/>
                                    </button>
                                )}
                            />
                        </div>
                    </div>
                </footer>}
        </div>
    );
};

export default VideoPlayer;
import React, {useRef, useState} from 'react';
import Timeline from './Timeline';
import styles from '../../styles/video-player.module.css';
import {
    BsPlayFill,
    BsArrowClockwise,
    BsArrowCounterclockwise,
    BsPauseFill,
    BsFillVolumeDownFill,
    BsSpeedometer,
    BsFullscreen,
    BsWindowDock
} from 'react-icons/bs';
import Volume from './Volume';

interface Props {
    src: string;
}

const VideoPlayer = ({src = ''}: Props) => {
    const [paused, setPaused] = useState(true);

    const ref = useRef<HTMLVideoElement>(null);

    const play = () => {
        ref.current.play().then(() => setPaused(false));
    }

    const pause = () => {
        setPaused(true);
        ref.current.pause();
    }

    const goFurther = (s: number) => {
        ref.current.currentTime += s;
    }

    const goBack = (s: number) => {
        ref.current.currentTime -= s;
    }

    return (
        <div className={styles.container}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <div className={styles.player}>
                <video
                    src={src}
                    ref={ref}
                    title=''
                />
            </div>

            <footer className={styles.footer}>
                <Timeline video={ref.current}/>

                <div className={styles.controlsContainer}>
                    <div className={styles.buttonGroup}>
                        <button title='fullscreen mode'>
                            <BsFullscreen/>
                        </button>
                        <button title='add subtitles'>
                            <BsWindowDock/>
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
                        <button title='speed'>
                            <BsSpeedometer size='1.5em'/>
                        </button>

                        <Volume
                            video={ref.current}
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
            </footer>
        </div>
    );
};

export default VideoPlayer;
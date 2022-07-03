import React, {useRef, useState} from 'react';
import Timeline from './Timeline';
import styles from '../../styles/video-player.module.css';

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

                <div className={styles.controls}>
                    <button
                        onClick={() => goBack(20)}
                        className={styles.control}
                    >
                        20s behind
                    </button>

                    {paused ?
                        <button
                            onClick={play}
                            className={styles.control}
                        >
                            Play
                        </button>:
                        <button
                            onClick={pause}
                            className={styles.control}
                        >
                            Pause
                        </button>}

                    <button
                        className={styles.control}
                        onClick={() => goFurther(20)}
                    >
                        20s ahead
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default VideoPlayer;
import React, {useEffect, useRef, useState} from 'react';
import Timeline from './Timeline';
import Volume from './Volume';
import Speed from './Speed';
import {srt2vtt} from '../../utils/srt2vtt';
import {useFullscreen} from '../../hooks/useFullscreen';
import styles from '../../styles/video-player.module.css';
import {
    BsPlayFill,
    BsArrowClockwise,
    BsArrowCounterclockwise,
    BsPauseFill,
    BsFillVolumeDownFill,
    BsSpeedometer,
    BsFullscreen,
    BsFullscreenExit, BsWindow
} from 'react-icons/bs';

interface Props {
    src: string;
}

const VideoPlayer = ({src = ''}: Props) => {
    const [paused, setPaused] = useState(true);
    const [showFooter, setShowFooter] = useState(true);
    const [subtitleSrc, setSubtitleSrc] = useState('');

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

    const addSubtitles = async () => {
        const options = {
            types: [
                {
                    descriptions: 'Subtitles',
                    accept: {
                        'text/plain': ['.srt'],
                        'text/vtt': ['.vtt']
                    }
                }
            ]
        }

        // @ts-ignore
        const [fileHandle] = await window.showOpenFilePicker(options);

        const file = await fileHandle.getFile();

        const text = await file.text();

        const extension = file.name.substring(file.name.lastIndexOf('.') + 1);

        const src = extension === 'vtt' ? URL.createObjectURL(file) : srt2vtt(text);

        setSubtitleSrc(src)
    }

    const handleHideFooter = () => {
        if (isFullscreen) setShowFooter(false);
    }

    // handle show footer
    useEffect(() => {
        const listener = (e: MouseEvent) => {
            // show when mouse touch bottom edge
            if (e.clientY >= window.innerHeight - 10) {
                setShowFooter(true);
            }
        };

        // set event only in fullscreen mode and reset showFooter state to default value
        // when exit fullscreen
        if (isFullscreen) document.addEventListener('mousemove', listener);
        else setShowFooter(true);

        return () => {if (isFullscreen) document.removeEventListener('mousemove', listener)};
    }, [isFullscreen])

    return (
        <div
            ref={playerContainer}
            className={`${styles.container} ${isFullscreen ? styles.fullscreen : ''}`}
        >
            <div className={styles.player}>
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

                            <button
                                onClick={addSubtitles}
                                title='add subtitles'
                            >
                                <BsWindow/>
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
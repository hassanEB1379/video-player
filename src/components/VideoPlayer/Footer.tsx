import React, {useEffect, useState} from 'react';
import Timeline from './Timeline';
import Speed from './Speed';
import Volume from './Volume';
import {useFullscreen} from '../../hooks/useFullscreen';
import {srt2vtt} from '../../utils/srt2vtt';
import styles from '../../styles/video-player.module.css';
import {
    BsArrowClockwise,
    BsArrowCounterclockwise, BsFillVolumeDownFill,
    BsFullscreen,
    BsFullscreenExit,
    BsPauseFill,
    BsPlayFill, BsSpeedometer,
    BsWindow
} from 'react-icons/bs';

interface Props {
    player: HTMLVideoElement,
    fullscreenTarget: HTMLElement,
    setSubtitleSrc: React.Dispatch<React.SetStateAction<string>>
}

const Footer = ({player, setSubtitleSrc, fullscreenTarget}: Props) => {
    const [paused, setPaused] = useState(true);
    const [showFooter, setShowFooter] = useState(false);

    const {toggleFullscreen, isFullscreen} = useFullscreen();

    const play = () => {
        player.play().then(() => setPaused(false));
    }

    const pause = () => {
        setPaused(true);
        player.pause();
    }

    const goFurther = (s: number) => {
        player.currentTime += s;
    }

    const goBack = (s: number) => {
        player.currentTime -= s;
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
        setShowFooter(false);
    }

    // handle show footer
    useEffect(() => {
        const listener = (e: MouseEvent) => {
            // show when mouse touch bottom edge
            if (e.clientY >= window.innerHeight - 10) {
                setShowFooter(true);
            }
        };

        document.addEventListener('mousemove', listener);

        return () => {document.removeEventListener('mousemove', listener)};
    }, [])

    return (
        <footer
            style={{display: showFooter ? 'block' : 'none'}}
            onMouseLeave={handleHideFooter}
            className={styles.footer}
        >
            <Timeline video={player}/>

            <div className={styles.controlsContainer}>
                <div className={styles.buttonGroup}>
                    <button
                        onClick={() => toggleFullscreen(fullscreenTarget)}
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
                        video={player}
                        trigger={(open) => (
                            <button
                                onClick={open}
                                title='speed'
                            >
                                <BsSpeedometer/>
                            </button>
                        )}
                    />


                    <Volume
                        video={player}
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
    );
};

export default Footer;
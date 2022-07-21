import React, {MutableRefObject, useEffect, useState} from 'react';
import Timeline from './Timeline';
import Speed from './Speed';
import Volume from './Volume';
import {srt2vtt} from '../../utils/srt2vtt';
import styles from '../../styles/video-player.module.css';
import {
    BsArrowClockwise,
    BsArrowCounterclockwise, BsFillVolumeDownFill,
    BsFullscreen,
    BsFullscreenExit,
    BsPauseFill,
    BsPlayFill,
    BsReverseLayoutSidebarReverse,
    BsSpeedometer,
    BsStopFill,
    BsWindow
} from 'react-icons/bs';

interface Props {
    player: MutableRefObject<HTMLVideoElement>,
    fullscreenTarget: MutableRefObject<HTMLElement>,
    setSubtitleSrc: React.Dispatch<React.SetStateAction<string>>,
    onToggleSidebar: () => void,
    onToggleFullscreen: (elm: HTMLElement) => void,
    isFullscreen: boolean
}

const Footer = ({
    player,
    setSubtitleSrc,
    fullscreenTarget,
    onToggleSidebar,
    onToggleFullscreen,
    isFullscreen
}: Props) => {
    const [paused, setPaused] = useState(true);
    const [showFooter, setShowFooter] = useState(true);

    const play = () => {
        player.current.play().then(() => setPaused(false));
    }

    const pause = () => {
        setPaused(true);
        player.current.pause();
    }

    const stop = () => {
        pause();
        player.current.currentTime = 0;
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

        if (isFullscreen) document.addEventListener('mousemove', listener);
        else setShowFooter(true)

        return () => {
            if (isFullscreen) document.removeEventListener('mousemove', listener)
        };
    }, [isFullscreen])

    return (
        <footer
            style={{display: showFooter ? 'block' : 'none'}}
            onMouseLeave={handleHideFooter}
            className={styles.footer}
        >
            <Timeline video={player.current}/>

            <div className={styles.controlsContainer}>
                <div className={styles.buttonGroup}>
                    <button
                        onClick={() => onToggleFullscreen(fullscreenTarget.current)}
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

                <div className={styles.buttonGroup}>
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
                        title='stop'
                        onClick={stop}
                    >
                        <BsStopFill/>
                    </button>

                    <button
                        title='20s further'
                        onClick={() => goFurther(20)}
                    >
                        <BsArrowClockwise/>
                    </button>
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        onClick={() => onToggleSidebar()}
                        title='sidebar'
                    >
                        <BsReverseLayoutSidebarReverse/>
                    </button>

                    <Speed
                        video={player.current}
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
        </footer>
    );
};

export default Footer;
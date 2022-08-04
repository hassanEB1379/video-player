import React, {MutableRefObject, useEffect, useState} from 'react';
import {srt2vtt,shortcuts, useShortcut, useVideoRef} from '@app/player/shared';
import Timeline from '../timeline/Timeline';
import Speed from '../speed/Speed';
import Volume from '../volume/Volume';
import styles from './Footer.module.css';
import {
    BsArrowClockwise,
    BsArrowCounterclockwise, BsFillVolumeDownFill, BsFillVolumeMuteFill, BsFillVolumeUpFill,
    BsFullscreen,
    BsFullscreenExit,
    BsPauseFill,
    BsPlayFill,
    BsReverseLayoutSidebarReverse,
    BsSpeedometer,
    BsStopFill,
    BsWindow
} from 'react-icons/bs';
import {useSubtitleDispatch} from '../../state/subtitle';

interface Props {
    fullscreenTarget: MutableRefObject<HTMLElement>,
    onToggleSidebar: () => void,
    onToggleFullscreen: () => void,
    isFullscreen: boolean,
}

const Footer = ({
    onToggleSidebar,
    onToggleFullscreen,
    isFullscreen,
}: Props) => {
    const [paused, setPaused] = useState(true);
    const [showFooter, setShowFooter] = useState(true);

    const setSubtitle = useSubtitleDispatch();

    const video = useVideoRef();

    const play = useShortcut('shift+x', () => {
        video.current.play().then(() => setPaused(false));
    })

    const pause = () => {
        setPaused(true);
        video.current.pause();
    }

    const stop = () => {
        pause();
        video.current.currentTime = 0;
    }

    const goFurther = useShortcut(shortcuts.GO_FURTHER, () => {
        video.current.currentTime += 20;
    });

    const goBack = useShortcut(shortcuts.GO_BACK, () => {
        video.current.currentTime -= 20;
    });

    const fullscreenToggle = useShortcut(
        shortcuts.FULLSCREEN_TOGGLE,
        onToggleFullscreen
    )

    const sidebarToggle = useShortcut(shortcuts.TOGGLE_SIDEBAR, () => onToggleSidebar());

    const addSubtitles = useShortcut(shortcuts.ADD_SUBTITLE, async () => {
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

        setSubtitle(src)
    });

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
            <Timeline video={video.current}/>

            <div className={styles.controlsContainer}>
                <div className={styles.buttonGroup}>
                    <button
                        onClick={fullscreenToggle}
                        title={`fullscreen (${shortcuts.FULLSCREEN_TOGGLE})`}
                    >
                        {isFullscreen ? <BsFullscreenExit/> : <BsFullscreen/>}
                    </button>

                    <button
                        onClick={addSubtitles}
                        title={`add subtitles (${shortcuts.ADD_SUBTITLE.toUpperCase()})`}
                    >
                        <BsWindow/>
                    </button>
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        title={`20s behind (${shortcuts.GO_BACK})`}
                        onClick={goBack}
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
                        title={`20s further (${shortcuts.GO_FURTHER})`}
                        onClick={goFurther}
                    >
                        <BsArrowClockwise/>
                    </button>
                </div>

                <div className={styles.buttonGroup}>
                    <button
                        onClick={sidebarToggle}
                        title={`sidebar (${shortcuts.TOGGLE_SIDEBAR})`}
                    >
                        <BsReverseLayoutSidebarReverse/>
                    </button>

                    <Speed
                        video={video.current}
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
                        video={video.current}
                        trigger={(open, volume) => (
                            <button
                                title='volume'
                                onClick={open}
                            >
                                {volume > 0.5 ?
                                    <BsFillVolumeUpFill/> :
                                    volume > 0 ?
                                        <BsFillVolumeDownFill/> :
                                        volume === 0 ?
                                            <BsFillVolumeMuteFill/> :
                                            null}
                            </button>
                        )}
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
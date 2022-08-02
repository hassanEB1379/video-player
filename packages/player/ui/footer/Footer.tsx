import React, {MutableRefObject, useEffect, useState} from 'react';
import {srt2vtt,shortcuts} from '@app/utils';
import {useShortcut} from '@app/hooks';
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

interface Props {
    player: MutableRefObject<HTMLVideoElement>,
    fullscreenTarget: MutableRefObject<HTMLElement>,
    setSubtitleSrc: React.Dispatch<React.SetStateAction<string>>,
    onToggleSidebar: () => void,
    onToggleFullscreen: (elm: HTMLElement) => void,
    isFullscreen: boolean,
}

const Footer = ({
    player,
    setSubtitleSrc,
    fullscreenTarget,
    onToggleSidebar,
    onToggleFullscreen,
    isFullscreen,
}: Props) => {
    const [paused, setPaused] = useState(true);
    const [showFooter, setShowFooter] = useState(true);

    const play = useShortcut('shift+x', () => {
        player.current.play().then(() => setPaused(false));
    })

    const pause = () => {
        setPaused(true);
        player.current.pause();
    }

    const stop = () => {
        pause();
        player.current.currentTime = 0;
    }

    const goFurther = useShortcut(shortcuts.GO_FURTHER, () => {
        player.current.currentTime += 20;
    });

    const goBack = useShortcut(shortcuts.GO_BACK, () => {
        player.current.currentTime -= 20;
    });

    const fullscreenToggle = useShortcut(
        shortcuts.FULLSCREEN_TOGGLE,
        () => onToggleFullscreen(fullscreenTarget.current)
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

        setSubtitleSrc(src)
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
            <Timeline video={player.current}/>

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
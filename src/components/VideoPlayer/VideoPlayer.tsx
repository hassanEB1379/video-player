import React, { useRef, useState} from 'react';
import styles from '../../styles/video-player.module.css';
import FilePicker from '../FilePicker/FilePicker';
import Footer from './Footer';

const VideoPlayer = () => {

    const [subtitleSrc, setSubtitleSrc] = useState('');
    const [src, setSrc] = useState('');

    const player = useRef<HTMLVideoElement>(null);
    const playerContainer = useRef<HTMLDivElement>(null);

    const handleSelectFile = (file: File) => {
        setSrc(URL.createObjectURL(file))
    }

    return (
        <div
            ref={playerContainer}
            className={`${styles.container}`}
        >
            <div className={styles.player}>
                {!src &&
                    <ul>
                        <li>
                            Open{' '}
                            <FilePicker
                                label='file'
                                onChange={handleSelectFile}
                            />
                        </li>
                        <li>
                            Open folder
                        </li>
                        <li>
                            Recent viewed
                        </li>
                    </ul>}

                {src &&
                    /* eslint-disable-next-line jsx-a11y/media-has-caption */
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
                    </video>}
            </div>

            <Footer
                player={player.current}
                fullscreenTarget={playerContainer.current}
                setSubtitleSrc={setSubtitleSrc}
            />
        </div>
    );
};

export default VideoPlayer;
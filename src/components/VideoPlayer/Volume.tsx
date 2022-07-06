import React, {useRef, useState} from 'react';
import RangeSlider from '../RangeSlider/RangeSlider';
import {useWhenClickOutside} from '../../hooks/useWhenClickOutside';

import styles from '../../styles/video-player.module.css';

interface Props {
    trigger: (handleOpen: React.MouseEventHandler) => React.ReactNode,
    video: HTMLVideoElement
}

const Volume = ({trigger, video}: Props) => {
    const [volume, setVolume] = useState(video?.volume || 1);

    const ref = useRef<HTMLDivElement>();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleVolumeChange = (changes: number) => {
        if(video && video.volume) {
            video.volume += changes;
            setVolume(p => p + changes);
        }
    }

    useWhenClickOutside([ref.current], () => {
        handleClose();
    })

    return (
        <div
            ref={ref}
            className={styles.volumeContainer}
        >
            {trigger(handleOpen)}

            {open &&
                <div className={styles.volumeBox}>
                    <p>{volume.toFixed(2)}</p>
                    <RangeSlider
                        size={100}
                        max={1}
                        orientation='vertical'
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </div>}
        </div>
    );
};

export default Volume;
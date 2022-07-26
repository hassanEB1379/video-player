import React, {useState} from 'react';
import RangeSlider from '../RangeSlider/RangeSlider';
import Popover from '../Popover/Popover';

import styles from '../../styles/video-player.module.css';

interface Props {
    trigger: (handleOpen: React.MouseEventHandler, volume: number) => React.ReactNode,
    video: HTMLVideoElement
}

const MAX_VOLUME_RATE = 1;

const Volume = ({trigger, video}: Props) => {
    const [volume, setVolume] = useState(video?.volume || 1);

    const handleVolumeChange = (changes: number) => {
        if(video && video.volume) {
            const newVal = video.volume + changes;

            if (newVal >= MAX_VOLUME_RATE) {
                video.volume = MAX_VOLUME_RATE;
                setVolume(MAX_VOLUME_RATE);
                return;
            }

            if (newVal <= 0) {
                video.volume = 0;
                setVolume(0);
                return;
            }

            video.volume += changes;
            setVolume(p => p + changes)
        }
    }

    return (
        <Popover trigger={(open) => trigger(open, volume)}>
            <div className={styles.box}>
                <p>{volume.toFixed(2)}</p>
                <RangeSlider
                    max={MAX_VOLUME_RATE}
                    orientation='vertical'
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
        </Popover>
    )
};

export default Volume;
import React, {useState} from 'react';
import RangeSlider from '../RangeSlider/RangeSlider';
import Popover from '../Popover/Popover';

import styles from '../../styles/video-player.module.css';

interface Props {
    trigger: (handleOpen: React.MouseEventHandler) => React.ReactNode,
    video: HTMLVideoElement
}

const Volume = ({trigger, video}: Props) => {
    const [volume, setVolume] = useState(video?.volume || 1);

    const handleVolumeChange = (changes: number) => {
        if(video && video.volume) {
            video.volume += changes;
            setVolume(p => p + changes);
        }
    }

    return (
        <Popover trigger={trigger}>
            <div className={styles.box}>
                <p>{volume.toFixed(2)}</p>
                <RangeSlider
                    max={1}
                    orientation='vertical'
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
        </Popover>
    )
};

export default Volume;
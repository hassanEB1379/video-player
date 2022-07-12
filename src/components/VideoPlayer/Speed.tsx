import React, {useState} from 'react';
import RangeSlider from '../RangeSlider/RangeSlider';
import Popover from '../Popover/Popover';

import styles from '../../styles/video-player.module.css';

interface Props {
    trigger: (handleOpen: React.MouseEventHandler) => React.ReactNode,
    video: HTMLVideoElement
}

const MAX_SPEED_RATE = 4;
const MIN_SPEED_RATE = 0.1;

const Speed = ({trigger, video}: Props) => {
    const [speed, setSpeed] = useState(video?.playbackRate || 1);

    const handleSpeedChange = (changes: number) => {
        if(video && video.playbackRate) {
            video.playbackRate += changes;
            setSpeed(p => p + changes)
        }
    }

    return (
        <Popover trigger={trigger}>
            <div className={styles.box}>
                <p>{speed.toFixed(2)}</p>
                <RangeSlider
                    max={MAX_SPEED_RATE}
                    min={MIN_SPEED_RATE}
                    orientation='vertical'
                    value={speed}
                    onChange={handleSpeedChange}
                />
            </div>
        </Popover>
    )
};

export default Speed;
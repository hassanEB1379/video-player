import React, {useEffect, useState} from 'react';
import {getFormattedTime} from '../../utils/getFormattedTime';
import styles from '../../styles/video-player.module.css';
import RangeSlider from '../RangeSlider/RangeSlider';

interface Props {
    video: HTMLVideoElement;
}

const Timeline = ({video}: Props) => {
    const [elapsedTime, setElapsedTime] = useState(0);

    const handleChanges = (changes: number) => {
        video.currentTime += changes;
        setElapsedTime(p => p + changes);
    }

    useEffect(() => {
        const handleTimeUpdate = () => setElapsedTime(video?.currentTime)

        video?.addEventListener('timeupdate', handleTimeUpdate)

        return () => {
            video?.removeEventListener('timeupdate', handleTimeUpdate)
        }
    } , [video])

    return (
        <div className={styles.timelineContainer}>
            {/* elapsed time */}
            <p>{getFormattedTime(elapsedTime)}</p>

            <RangeSlider
                value={elapsedTime}
                onChange={handleChanges}
                max={video?.duration}
            />

            {/* total time */}
            <p>{getFormattedTime(video?.duration)}</p>
        </div>
    );
};

export default Timeline;
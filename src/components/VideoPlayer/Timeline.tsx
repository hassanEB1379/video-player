import React, {useEffect, useState} from 'react';
import {getFormattedTime} from '../../utils/getFormattedTime';
import styles from '../../styles/video-player.module.css';

interface Props {
    video: HTMLVideoElement;
}

const Timeline = ({video}: Props) => {
    const [showHoveredTime, setShowHoveredTime] = useState(false);
    const [hoveredTimePos, setHoveredTimePos] = useState(0);
    const [hoveredTime, setHoveredTime] = useState(0);

    // the elapsed time of video in second
    const [elapsedTime, setElapsedTime] = useState(0);

    const handleUpdateHoveredTime = (e: React.MouseEvent<HTMLDivElement>) => {
        let mouseOffset = e.nativeEvent.offsetX;
        // @ts-ignore
        let timelineWidth = e.target.offsetWidth;

        let cofficient = mouseOffset / timelineWidth

        setHoveredTimePos(cofficient * 100);
        setHoveredTime(cofficient * video?.duration)
    }

    const handleShowHoveredTime = () => {
        setShowHoveredTime(true);
    }

    const handleHideHoveredTime = () => {
        setShowHoveredTime(false)
    }

    // update elapsed time of video
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

            <div className={styles.timeline}>
                <div
                    onMouseEnter={handleShowHoveredTime}
                    onMouseMove={handleUpdateHoveredTime}
                    onMouseLeave={handleHideHoveredTime}
                    className={styles.shadowTimeline}
                >
                    {showHoveredTime &&
                        <div
                            style={{left: `${hoveredTimePos}%`}}
                            className={styles.hoveredTime}
                        >
                            {getFormattedTime(hoveredTime)}
                        </div>}
                </div>


                <div
                    style={{width: `${(elapsedTime / video?.duration) * 100}%`}}
                    className={styles.elapsedTime}
                />

                <span
                    style={{left: `${(elapsedTime / video?.duration) * 100}%`}}
                    className={styles.timeIndicator}
                />
            </div>

            {/* total time */}
            <p>{getFormattedTime(video?.duration)}</p>
        </div>
    );
};

export default Timeline;
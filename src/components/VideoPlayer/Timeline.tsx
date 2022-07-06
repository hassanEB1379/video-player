import React, {useEffect, useState, useRef} from 'react';
import {getFormattedTime} from '../../utils/getFormattedTime';
import styles from '../../styles/video-player.module.css';

interface Props {
    video: HTMLVideoElement;
}

const Timeline = ({video}: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    const [hoveredTimePos, setHoveredTimePos] = useState(0);
    const [hoveredTime, setHoveredTime] = useState(0);

    // the elapsed time of video in second
    const [elapsedTime, setElapsedTime] = useState(0);

    const convertTimelinePosToVideoTime = (e: React.MouseEvent<HTMLDivElement>) => {
        let mouseOffset = e.nativeEvent.offsetX;

        let timelineWidth = ref.current.offsetWidth;

        let cofficient = mouseOffset / timelineWidth;

        return {
            inPercent : cofficient * 100,
            inSecond: cofficient * video?.duration
        }
    }

    const handleUpdateHoveredTime = (e: React.MouseEvent<HTMLDivElement>) => {
        let {inPercent, inSecond} = convertTimelinePosToVideoTime(e);
        setHoveredTimePos(inPercent);
        setHoveredTime(inSecond)
    }

    const handleUpdateTime = (e: React.MouseEvent<HTMLDivElement>) => {
        let {inSecond} = convertTimelinePosToVideoTime(e);
        if (video && video.currentTime) video.currentTime = inSecond;
    }

    const handleDragTime = () => {
        const handler = (e: MouseEvent) => {
            let x = e.movementX;
            if (video && video.currentTime) video.currentTime += x;
        }

        window.addEventListener('mousemove', handler);

        const cleanup = () => {
            window.removeEventListener('mousemove', handler);
            window.removeEventListener('mouseup', cleanup);
        }

        window.addEventListener('mouseup', cleanup);
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
                    role='none'
                    onClick={handleUpdateTime}
                    onMouseMove={handleUpdateHoveredTime}
                    className={styles.shadowTimeline}
                    ref={ref}
                >
                    <div
                        style={{left: `${hoveredTimePos}%`}}
                        className={styles.hoveredTime}
                    >
                        {getFormattedTime(hoveredTime)}
                    </div>
                </div>


                <div
                    style={{width: `${(elapsedTime / video?.duration) * 100}%`}}
                    className={styles.elapsedTime}
                />

                <span
                    role='none'
                    data-time={getFormattedTime(elapsedTime)}
                    style={{left: `${(elapsedTime / video?.duration) * 100}%`}}
                    className={styles.timeIndicator}
                    onMouseDown={handleDragTime}
                />
            </div>

            {/* total time */}
            <p>{getFormattedTime(video?.duration)}</p>
        </div>
    );
};

export default Timeline;
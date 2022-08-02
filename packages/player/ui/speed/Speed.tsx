import React from 'react';
import {RangeSlider} from '@app/range-slider';
import {Popover} from '@app/popover';
import {useShortcut} from '@app/hooks';
import {shortcuts} from '@app/utils';
import {useDispatchVideoSpeed, useVideoSpeed} from '../../state/speed';
import {usePushMessage} from '../../state/message';
import styles from '../Player.module.css';

interface Props {
    trigger: (handleOpen: React.MouseEventHandler) => React.ReactNode,
    video: HTMLVideoElement
}

const MAX_SPEED_RATE = 4;
const MIN_SPEED_RATE = 0.1;

const Speed = ({trigger, video}: Props) => {
    const speed = useVideoSpeed();
    const setSpeed = useDispatchVideoSpeed();
    const pushMessage = usePushMessage();

    const changeSpeed = (value: number) => {
        if(video && video.playbackRate) {
            const newVal = video.playbackRate + value;

            if (newVal >= MAX_SPEED_RATE) {
                video.playbackRate = MAX_SPEED_RATE;
                setSpeed(MAX_SPEED_RATE);
                return;
            }

            if (newVal <= MIN_SPEED_RATE) {
                video.playbackRate = MIN_SPEED_RATE;
                setSpeed(MIN_SPEED_RATE);
                return;
            }

            video.playbackRate += value;
            setSpeed((p: number) => p + value)
        }
    }

    const handleSpeedChange = (changes: number) => {
        changeSpeed(changes)
    }

    useShortcut(shortcuts.INCREASE_SPEED, () => {
        changeSpeed(0.1)
        pushMessage(`Speed ${video?.playbackRate?.toFixed(2)}`);
    })

    useShortcut(shortcuts.DECREASE_SPEED, () => {
        changeSpeed(-0.1);
        pushMessage(`Speed ${video?.playbackRate?.toFixed(2)}`);
    })

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
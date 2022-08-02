import React from 'react';
import {RangeSlider} from '@app/range-slider';
import {Popover} from '@app/popover';
import {shortcuts} from '@app/utils';
import {useShortcut} from '@app/hooks';
import {useVideoVolume} from '../context/volume';
import {useVideoMessage} from '../context/message';

import styles from '../Player.module.css';

interface Props {
    trigger: (handleOpen: React.MouseEventHandler, volume: number) => React.ReactNode,
    video: HTMLVideoElement
}

const MAX_VOLUME_RATE = 1;

const Volume = ({trigger, video}: Props) => {
    const {volume, setVolume} = useVideoVolume();
    const {pushMessage} = useVideoMessage();

    const changeVolume = (value: number) => {
        if(video && 'volume' in video) {
            const newVal = video.volume + value;

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

            video.volume += value;
            setVolume((p: number) => p + value);
        }
    }

    const handleVolumeRange = (changes: number) => {
        changeVolume(changes);
    }

    // define shortcuts for increase and decrease volume
    useShortcut(shortcuts.INCREASE_VOLUME, () => {
        changeVolume(0.2)
        pushMessage(`Volume ${video?.volume?.toFixed(2)}`);
    })

    useShortcut(shortcuts.DECREASE_VOLUME, () => {
        changeVolume(-0.2);
        pushMessage(`Volume ${video?.volume?.toFixed(2)}`);
    })

    return (
        <Popover trigger={(open) => trigger(open, volume)}>
            <div className={styles.box}>
                <p>{volume.toFixed(2)}</p>
                <RangeSlider
                    max={MAX_VOLUME_RATE}
                    orientation='vertical'
                    value={volume}
                    onChange={handleVolumeRange}
                />
            </div>
        </Popover>
    )
};

export default Volume;
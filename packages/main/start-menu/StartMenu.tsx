import React from 'react';
import {FilePicker} from '../../lib/file-picker';
import {useAddToRecent} from '../state/recent-videos';
import {useVideoSrc} from '../state/video-src';

import styles from './StartMenu.module.css';

const StartMenu = () => {
    const addToRecent = useAddToRecent();

    const {setVideoSrc} = useVideoSrc();

    const handleSelectFile = (file: File) => {
        setVideoSrc(file);
        addToRecent(file);
    }

    return (
        <div className={styles.startMenu}>
            <ul>
                <li>
                    <FilePicker
                        label='Open file'
                        onChange={handleSelectFile}
                    />
                </li>
                <li>
                    Open folder
                </li>
                <li>
                    Recent viewed
                </li>
            </ul>
        </div>
    );
};

export default StartMenu;
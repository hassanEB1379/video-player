import React from 'react';
import FilePicker from '../FilePicker/FilePicker';
import styles from '../../styles/video-player.module.css';

interface Props {
    onSelectFile: (file: File) => void,
}

const StartMenu = ({onSelectFile}: Props) => {
    return (
        <div className={styles.startMenu}>
            <ul>
                <li>
                    <FilePicker
                        label='Open file'
                        onChange={onSelectFile}
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
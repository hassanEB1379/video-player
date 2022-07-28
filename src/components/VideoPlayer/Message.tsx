import React from 'react';
import styles from '../../styles/video-player.module.css';
import {useVideoMessage} from '../../context/VideoPlayer/Message';

const Message = () => {
    const {msg} = useVideoMessage();

    return (
        msg &&
        <div className={styles.message}>
            {msg}
        </div>
    );
};

export default Message;
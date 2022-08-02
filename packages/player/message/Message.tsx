import React from 'react';
import styles from '../Player.module.css';
import {useVideoMessage} from '../context/message';

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
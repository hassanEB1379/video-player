import React from 'react';
import styles from './Message.module.css';
import {useMessage} from '../../state/message';

const Message = () => {
    const msg = useMessage();

    return (
        msg &&
        <div className={styles.message}>
            {msg}
        </div>
    );
};

export default Message;
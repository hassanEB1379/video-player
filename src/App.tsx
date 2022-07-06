import React, {ChangeEvent, useRef, useState} from 'react';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import Button from './components/Button/Button';
import {IconContext} from 'react-icons';

import './assets/css/normalize.css'
import './assets/css/global.css'
import styles from './styles/app.module.css'

const App = () => {
    const [src, setSrc] = useState('');

    const ref = useRef<HTMLInputElement>(null);

    const handleOpenFileExplorer = () => {
        ref.current.click();
    }

    const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        let file = e.target.files[0];

        setSrc(URL.createObjectURL(file))
    }

    return (
        <IconContext.Provider value={{color: 'white', size: '2em'}}>
            <div className={styles.container}>
                {src ?
                    <VideoPlayer src={src}/>:
                    <div className={styles.dropzone}>
                        <Button onClick={handleOpenFileExplorer}>Choose file</Button>

                        <input
                            onChange={handleSelectFile}
                            ref={ref}
                            name='choose-file'
                            type='file'
                            accept='mkv,mp4'
                            className={styles.input}
                        />
                    </div>}
            </div>
        </IconContext.Provider>
    );
};

export default App;
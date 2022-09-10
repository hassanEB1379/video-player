import React, {forwardRef} from 'react';
import styles from './Video.module.css';
import {useSubtitle} from '../state/subtitle';

interface Props {
    src: string,
}

// eslint-disable-next-line react/display-name
const Video = forwardRef<HTMLVideoElement, Props>((
    {src},
    ref
) => {
    const subtitle = useSubtitle();

    return (
        <div className={styles.video}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
                preload='metadata'
                src={src}
                ref={ref}
                title=''
                disablePictureInPicture
                width={854}
                height={480}
            >
                <track
                    label='subtitles'
                    src={subtitle}
                    kind='subtitles'
                    srcLang='en'
                    default
                />
            </video>
        </div>
    );
});

export default Video;
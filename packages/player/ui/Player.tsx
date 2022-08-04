import React, {useRef} from 'react';
import {withProviders, VideoRefProvider, providers} from '@app/player/shared';
import PlayerLayout from './layout/PlayerLayout';
import StartMenu from './start-menu/StartMenu';
import Video from './video/Video';
import Message from './message/Message';
import {useVideoSrc} from '../state/video-src';

export const Player = withProviders(() => {
    const {src} = useVideoSrc();

    const video = useRef<HTMLVideoElement>(null);

    return (
        <VideoRefProvider value={video}>
            <PlayerLayout>
                <Message/>

                {!src && <StartMenu/>}

                {src &&
                    <Video
                        ref={video}
                        src={src}
                    />}
            </PlayerLayout>
        </VideoRefProvider>
    );
}, providers);
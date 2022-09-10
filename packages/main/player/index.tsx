import React, {useRef} from 'react';
import {withProviders, VideoRefProvider, providers} from '@app/main/shared';
import StartMenu from '../start-menu/StartMenu';
import Video from '../video/Video';
import Message from '../message/Message';
import {useVideoSrc} from '../state/video-src';
import Layout from '@app/main/layout';

export const Player = withProviders(() => {
    const {src} = useVideoSrc();

    const video = useRef<HTMLVideoElement>(null);

    return (
        <VideoRefProvider value={video}>
            <Layout>
                <Message/>

                {!src && <StartMenu/>}

                {src &&
                    <Video
                        ref={video}
                        src={src}
                    />}
            </Layout>
        </VideoRefProvider>
    );
}, providers);
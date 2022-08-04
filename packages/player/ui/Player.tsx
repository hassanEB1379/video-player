import React, {useRef} from 'react';
import PlayerLayout from './layout/PlayerLayout';
import StartMenu from './start-menu/StartMenu';
import Message from './message/Message';
import VideoSection from './video-section/VideoSection';
import {useVideoSrc} from '../state/video-src';
import {withProviders} from '../shared/withProviders';
import {providers} from '../shared/providers';

const Player = () => {
    const {src} = useVideoSrc();

    const player = useRef<HTMLVideoElement>(null);

    return (
        <PlayerLayout player={player}>
            <Message/>

            {!src && <StartMenu/>}

            {src &&
                <VideoSection
                    ref={player}
                    src={src}
                />}
        </PlayerLayout>
    );
};

export const PlayerWithProviders = withProviders(Player, providers)
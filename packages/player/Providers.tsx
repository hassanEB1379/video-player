import React from 'react';
import {RecentVideosProvider} from './state/recent-videos';
import {VideoSrcProvider} from './state/video-src';
import {VideoMessageProvider} from './state/message';
import {SpeedProvider} from './state/speed';
import {VolumeProvider} from './state/volume';
import {Player} from './Player';

export const Providers = () => {
    return (
        <RecentVideosProvider>
            <VideoSrcProvider>
                <VideoMessageProvider>
                    <SpeedProvider>
                        <VolumeProvider>
                            <Player/>
                        </VolumeProvider>
                    </SpeedProvider>
                </VideoMessageProvider>
            </VideoSrcProvider>
        </RecentVideosProvider>
    );
};
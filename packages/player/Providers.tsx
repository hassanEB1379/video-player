import React from 'react';
import {RecentVideosProvider} from './context/recent-videos';
import {VideoSrcProvider} from './context/video-src';
import {VideoMessageProvider} from './context/message';
import {SpeedProvider} from './context/speed';
import {VolumeProvider} from './context/volume';
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
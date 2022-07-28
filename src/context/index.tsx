import React from 'react';
import RecentVideosProvider from './VideoPlayer/RecentVideos';
import ReactIcon from './ReactIcon';
import VideoSrcProvider from './VideoPlayer/VideoSrc';
import VolumeProvider from './VideoPlayer/Volume';
import VideoMessageProvider from './VideoPlayer/Message';
import SpeedProvider from './VideoPlayer/Speed';

const Providers = ({children}: {children: React.ReactNode}) => {
    return (
        <RecentVideosProvider>
            <VideoSrcProvider>
                <VideoMessageProvider>
                    <SpeedProvider>
                        <VolumeProvider>
                            <ReactIcon>
                                {children}
                            </ReactIcon>
                        </VolumeProvider>
                    </SpeedProvider>
                </VideoMessageProvider>
            </VideoSrcProvider>
        </RecentVideosProvider>
    );
};

export default Providers;
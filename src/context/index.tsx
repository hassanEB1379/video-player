import React from 'react';
import RecentVideosProvider from './VideoPlayer/RecentVideos';
import ReactIcon from './ReactIcon';
import VideoSrcProvider from './VideoPlayer/VideoSrc';
import VolumeProvider from './VideoPlayer/Volume';
import VideoMessageProvider from './VideoPlayer/Message';

const Providers = ({children}: {children: React.ReactNode}) => {
    return (
        <RecentVideosProvider>
            <VideoSrcProvider>
                <VideoMessageProvider>
                    <VolumeProvider>
                        <ReactIcon>
                            {children}
                        </ReactIcon>
                    </VolumeProvider>
                </VideoMessageProvider>
            </VideoSrcProvider>
        </RecentVideosProvider>
    );
};

export default Providers;
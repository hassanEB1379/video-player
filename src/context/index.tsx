import React from 'react';
import RecentVideosProvider from './VideoPlayer/RecentVideos';
import ReactIcon from './ReactIcon';
import VideoSrcProvider from './VideoPlayer/VideoSrc';
import VolumeProvider from './VideoPlayer/Volume';

const Providers = ({children}: {children: React.ReactNode}) => {
    return (
        <RecentVideosProvider>
            <VideoSrcProvider>
                <VolumeProvider>
                    <ReactIcon>
                        {children}
                    </ReactIcon>
                </VolumeProvider>
            </VideoSrcProvider>
        </RecentVideosProvider>
    );
};

export default Providers;
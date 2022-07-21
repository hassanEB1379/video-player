import React from 'react';
import RecentVideosProvider from './VideoPlayer/RecentVideos';
import ReactIcon from './ReactIcon';
import VideoSrcProvider from './VideoPlayer/VideoSrc';

const Providers = ({children}: {children: React.ReactNode}) => {
    return (
        <RecentVideosProvider>
            <VideoSrcProvider>
                <ReactIcon>
                    {children}
                </ReactIcon>
            </VideoSrcProvider>
        </RecentVideosProvider>
    );
};

export default Providers;
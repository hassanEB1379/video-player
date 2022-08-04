import {RecentVideosProvider} from '../state/recent-videos';
import {VideoSrcProvider} from '../state/video-src';
import {VideoMessageProvider} from '../state/message';
import {SpeedProvider} from '../state/speed';
import {VolumeProvider} from '../state/volume';
import {SubtitleProvider} from '../state/subtitle';

export const providers = [
    VideoMessageProvider,
    RecentVideosProvider,
    VideoSrcProvider,
    SpeedProvider,
    VolumeProvider,
    SubtitleProvider
]
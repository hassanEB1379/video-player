import React, {useRef, useState} from 'react';
import {useFullscreen} from '@app/hooks';
import Footer from '../footer/Footer';
import Sidebar from '../sidebar/Sidebar';
import styles from './PlayerLayout.module.css'
import {useSubtitleDispatch} from '../../state/subtitle';

interface Props {
    children: React.ReactNode,
    player: React.MutableRefObject<HTMLVideoElement>,
}

const PlayerLayout = ({children, player}: Props) => {
    const [showSidebar, setShowSidebar] = useState(false);

    const setSubtitle = useSubtitleDispatch();

    const playerContainer = useRef<HTMLDivElement>(null);

    const {toggleFullscreen, isFullscreen} = useFullscreen();

    const handleToggleSidebar = (state?: boolean | undefined) => {
        setShowSidebar(p => state ?? !p);
    }

    return (
        <div
            ref={playerContainer}
            className={styles.container}
        >
            <div className={styles.player}>
                {children}

                <Footer
                    player={player}
                    fullscreenTarget={playerContainer}
                    setSubtitleSrc={setSubtitle}
                    onToggleSidebar={handleToggleSidebar}
                    onToggleFullscreen={toggleFullscreen}
                    isFullscreen={isFullscreen}
                />
            </div>

            <Sidebar
                showSidebar={showSidebar}
                isFullscreen={isFullscreen}
                onShow={() => handleToggleSidebar(true)}
                onHide={() => handleToggleSidebar(false)}
            />
        </div>
    );
};

export default PlayerLayout;
import React, {useRef, useState} from 'react';
import {useFullscreen} from '@app/player/shared';
import Footer from '../footer/Footer';
import Sidebar from '../sidebar/Sidebar';
import styles from './PlayerLayout.module.css';

interface Props {
    children: React.ReactNode,
}

const PlayerLayout = ({children}: Props) => {
    const [showSidebar, setShowSidebar] = useState(false);

    const playerContainer = useRef<HTMLDivElement>(null);

    const {toggleFullscreen, isFullscreen} = useFullscreen();

    const handleToggleSidebar = (state?: boolean | undefined) => {
        setShowSidebar(p => state ?? !p);
    }

    const handleToggleFullscreen = () => {
        toggleFullscreen(playerContainer.current)
    }

    return (
        <div
            ref={playerContainer}
            className={styles.container}
        >
            <div className={styles.player}>
                {children}

                <Footer
                    fullscreenTarget={playerContainer}
                    onToggleSidebar={handleToggleSidebar}
                    onToggleFullscreen={handleToggleFullscreen}
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
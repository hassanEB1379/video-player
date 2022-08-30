import React, {useRef} from 'react';
import {useFullscreen, HideOnFullscreen} from '@app/player/shared';
import Footer from '../footer/Footer';
import Sidebar from '../sidebar/Sidebar';
import styles from './PlayerLayout.module.css';

interface Props {
    children: React.ReactNode,
}

const PlayerLayout = ({children}: Props) => {
    const playerContainer = useRef<HTMLDivElement>(null);

    const {toggleFullscreen, isFullscreen} = useFullscreen();

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

                <HideOnFullscreen
                    isFullscreen={isFullscreen}
                    showOnMouseMove={(e) => e.clientY >= window.innerHeight - 10}
                >
                    <Footer
                        isFullscreen={isFullscreen}
                        onToggleFullscreen={handleToggleFullscreen}
                    />
                </HideOnFullscreen>
            </div>

            <HideOnFullscreen
                isFullscreen={isFullscreen}
                showOnMouseMove={(e) => e.clientX >= window.innerWidth - 10}
            >
                <Sidebar/>
            </HideOnFullscreen>
        </div>
    );
};

export default PlayerLayout;
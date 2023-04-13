import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import loading from '@/../../public/assets/loading.json';
import styles from './Loading.module.css';

const LoadingComponent = () => {
    return (
        <div className={styles.overlay}>
            <Player
                autoplay
                loop
                src={loading}
                className={styles.loading}
            />
        </div>
    )
}

export default LoadingComponent;
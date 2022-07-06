import React, {useRef} from 'react';
import styles from '../../styles/range-slider.module.css'

interface Props {
    value: number,
    onChange: (changes: number) => void,
    orientation?: 'vertical' | 'horizontal',
    min?: number,
    max: number,
    size: number
}

const RangeSlider = ({value, onChange, orientation = 'horizontal', min = 0, max, size}: Props) => {
    const range = max - min;
    const valueInPercent = (value/range)*100;

    const ref = useRef<HTMLDivElement>(null);

    const convertMousePosToValue = (e: React.MouseEvent<HTMLElement>): number => {
        let offsetX = e.nativeEvent.offsetX;
        let containerWidth = ref.current.offsetWidth;
        return (offsetX / containerWidth) * range;
    }

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        let newValue = convertMousePosToValue(e);
        onChange(newValue - value);
    }

    return (
        <div
            style={{width: size}}
            className={`${styles.container} ${orientation === 'vertical' ? styles.vertical : ''}`}
        >
            <div
                ref={ref}
                role='none'
                onClick={handleClick}
                className={styles.overlay}
            >

            </div>

            <div
                style={{width: `${valueInPercent}%`}}
                className={styles.fill}
            />

            <div
                style={{left: `${valueInPercent}%`}}
                className={styles.indicator}
            />
        </div>
    );
};

export default RangeSlider;
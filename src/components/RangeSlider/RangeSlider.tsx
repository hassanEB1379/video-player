import React, {useRef} from 'react';
import styles from '../../styles/range-slider.module.css'

interface Props {
    value: number,
    onChange: (changes: number) => void,
    orientation?: 'vertical' | 'horizontal',
    min?: number,
    max: number
}

const RangeSlider = ({value, onChange, orientation = 'horizontal', min = 0, max}: Props) => {
    const range = max - min;
    const valueInPercent = (value/range)*100;

    const ref = useRef<HTMLDivElement>(null);

    const convertMousePosToValue = (pos: number): number => {
        let containerSize = ref.current[orientation === 'vertical' ? 'offsetHeight' : 'offsetWidth'];
        return (pos / containerSize) * range;
    }

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        let pos = orientation === 'vertical' ?
            // offsetY property show distance from top edge
            // but we need to distance from bottom
            // therefore, we subtract it from the total height
            ref.current.offsetHeight - e.nativeEvent.offsetY :
            e.nativeEvent.offsetX;

        let newValue = convertMousePosToValue(pos);

        onChange(newValue - value);
    }

    const handleDrag = (e1: React.MouseEvent<HTMLElement>) => {
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'pointer';

        let startPoint = convertMousePosToValue(e1.nativeEvent[orientation === 'vertical' ? 'offsetY' : 'offsetX']);

        const handler = (e2: MouseEvent) => {
            let currentPoint = convertMousePosToValue(
                e2[orientation === 'vertical' ? 'clientY' : 'clientX'] -
                // @ts-ignore
                e1.target.getBoundingClientRect()[orientation === 'vertical' ? 'top' : 'left']
            );

            let movement = (currentPoint - startPoint) * (orientation === 'vertical' ? -1 : 1);

            onChange(movement)
        }

        const cleanup = () => {
            document.body.style.userSelect = '';
            document.body.style.cursor = '';

            document.removeEventListener('mousemove', handler);
            document.removeEventListener('mouseup', cleanup);
        }

        document.addEventListener('mousemove', handler);
        document.addEventListener('mouseup', cleanup);
    }

    return (
        <div
            className={`${styles.container} ${orientation === 'vertical' ? styles.vertical : ''}`}
        >
            <div
                ref={ref}
                role='none'
                onClick={handleClick}
                className={`${styles.overlay} ${orientation === 'vertical' ? styles.vertical : ''}`}
            >

            </div>

            <div
                style={{[orientation === 'vertical' ? 'height' : 'width']: `${valueInPercent}%`}}
                className={styles.fill}
            />

            <div
                role='none'
                onMouseDown={handleDrag}
                style={{[orientation === 'vertical' ? 'bottom' : 'left']: `${valueInPercent}%`}}
                className={styles.indicator}
            />
        </div>
    );
};

export default RangeSlider;
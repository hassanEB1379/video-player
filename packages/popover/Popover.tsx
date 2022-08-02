import React, {useRef, useState} from 'react';
import {useWhenClickOutside} from '@app/hooks';

interface Props {
    trigger: (open: React.MouseEventHandler) => React.ReactNode,
    children: React.ReactNode,
    className?: string
}

export const Popover = ({trigger, children, className}: Props) => {
    const ref = useRef<HTMLDivElement>();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    useWhenClickOutside([ref.current], () => {
        handleClose();
    })

    return (
        <div
            ref={ref}
            style={{position: 'relative'}}
            className={className}
        >
            {trigger(handleOpen)}

            {open && <div style={{position: 'absolute', bottom: '110%', right: '-50%', }}>{children}</div>}
        </div>
    );
};
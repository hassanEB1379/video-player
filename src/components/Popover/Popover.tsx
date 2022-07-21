import React, {useRef, useState} from 'react';
import {useWhenClickOutside} from '../../hooks/useWhenClickOutside';

interface Props {
    trigger: (open: React.MouseEventHandler) => React.ReactNode,
    children: React.ReactNode,
    className?: string
}

const Popover = ({trigger, children, className}: Props) => {
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

export default Popover;
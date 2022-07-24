import React, {ChangeEvent, useRef} from 'react';

interface Props {
    label: string,
    onChange: (file: File) => void
}

const FilePicker = ({label, onChange}: Props) => {
    const input = useRef<HTMLInputElement>(null);

    const handleOpenFileExplorer = () => {
        input.current.click();
    }

    const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];

        onChange(file)
    }

    return (
        <>
            <span
                role='button'
                onClick={handleOpenFileExplorer}
            >
                {label || 'select file'}
            </span>

            <input
                onChange={handleSelectFile}
                ref={input}
                name='choose-file'
                type='file'
                accept='.mkv, video/*'
                style={{display: 'none'}}
            />
        </>
    );
};

export default FilePicker;
import React from 'react';
import {IconContext} from 'react-icons';

const ReactIcon = ({children}: {children: React.ReactNode}) => {
    return (
        <IconContext.Provider value={{color: 'white', size: '1.2rem'}}>
            {children}
        </IconContext.Provider>
    );
};

export default ReactIcon;
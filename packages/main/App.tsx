import React from 'react';
import {IconContext} from 'react-icons';
import {Player} from '@app/main/player';

const App = () => {
    return (
        <IconContext.Provider value={{color: 'white', size: '1.2rem'}}>
            <Player />
        </IconContext.Provider>
    );
};

export default App;
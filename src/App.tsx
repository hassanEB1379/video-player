import React from 'react';
import {IconContext} from 'react-icons';
import Player from '@app/player';

import 'regenerator-runtime/runtime.js';
import './css/normalize.css'
import './css/global.css'

const App = () => {
    return (
        <IconContext.Provider value={{color: 'white', size: '1.2rem'}}>
            <Player />
        </IconContext.Provider>
    );
};

export default App;
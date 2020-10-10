import React from 'react';

import '../assets/stylesheets/app.css';
import Hangman from '../containers/Hangman';

const app = props => {
    return (
        <div className='App'>
            <Hangman />
        </div>
    );
};

export default app;

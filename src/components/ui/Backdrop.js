import React from 'react';

import '../../assets/stylesheets/backdrop.css';

const backdrop = props => {
    return props.show ? (
        <div className='backdrop' onClick={props.clicked}></div>
    ) : null;
};

export default backdrop;

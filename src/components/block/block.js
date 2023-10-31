import React from 'react';
import PropTypes from 'prop-types';

import './block.css';

function Block({ value, onClick }) {
    return (
        <div className="block" onClick={onClick}>
            {value}
        </div>
    );
}

Block.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
};

export default Block;

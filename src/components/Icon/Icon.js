import React from 'react';
import PropTypes from 'prop-types';
import './Icon.css';

function Icon({ type, onClick, disabled }) {
    let className = 'icon';
    if (type) className += ` icon--${type}`;

    return (
        <button
            type='button'
            onClick={onClick}
            className={className}
            disabled={disabled}
            aria-label={`Button for ${type} the task`}
        />
    );
}

Icon.defaultProps = {
    type: '',
    onClick: () => null,
    disabled: false,
};

Icon.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};

const memoIcon = React.memo(Icon);
export default memoIcon;

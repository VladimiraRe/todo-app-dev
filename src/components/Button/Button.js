import PropTypes from 'prop-types';
import './Button.css';

export default function Button({ name, onClick, isSelected, additionalСlass, disabled }) {
    let className = 'button';
    if (isSelected) className += ' button--selected';
    if (additionalСlass) className += ` ${additionalСlass}`;

    return (
        <button type='button' onClick={onClick} className={className} disabled={disabled}>
            {name}
        </button>
    );
}

Button.defaultProps = {
    name: '',
    isSelected: false,
    onClick: () => null,
};

Button.propTypes = {
    name: PropTypes.string,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
};

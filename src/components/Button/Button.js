import PropTypes from 'prop-types';
import './Button.css';

export default function Button({ name, isSelected, onClick }) {
    let className = 'button';
    if (isSelected) className += ' button--selected';
    return (
        <button type='button' onClick={onClick} className={className}>
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

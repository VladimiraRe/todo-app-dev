import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export default class Button extends PureComponent {
    static defaultProps = {
        name: '',
        isSelected: false,
        onClick: () => null,
    };

    static propTypes = {
        name: PropTypes.string,
        isSelected: PropTypes.bool,
        onClick: PropTypes.func,
    };

    render() {
        const { name, isSelected, onClick } = this.props;
        let className = 'button';
        if (isSelected) className += ' button--selected';
        return (
            <button type='button' onClick={onClick} className={className}>
                {name}
            </button>
        );
    }
}

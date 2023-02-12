import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Icon.css';

export default class Icon extends PureComponent {
    static defaultProps = {
        type: '',
        onClick: () => null,
        disabled: false,
    };

    static propTypes = {
        type: PropTypes.string,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
    };

    render() {
        const { type, onClick, disabled } = this.props;
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
}

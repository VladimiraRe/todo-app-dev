import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Icon.css';

export default class Icon extends PureComponent {
    static defaultProps = {
        type: '',
        onClick: () => null,
    };

    static propTypes = {
        type: PropTypes.string,
        onClick: PropTypes.func,
    };

    render() {
        const { type, onClick } = this.props;
        let className = 'icon';
        if (type) className += ` icon--${type}`;
        return (
            <button type='button' onClick={onClick} className={className} aria-label={`Button for ${type} the task`} />
        );
    }
}

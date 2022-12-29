import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './icon.css';

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
        if (type === 'edit') {
            className += ' icon--edit';
        }
        if (type === 'destroy') {
            className += ' icon--destroy';
        }
        return (
            <button type='button' onClick={onClick} className={className} aria-label={`Button for ${type} the task`} />
        );
    }
}

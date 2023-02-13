import PropTypes from 'prop-types';

import Icon from '../Icon';
import './TaskIcons.css';

export default function TaskIcons({ onEditing, onDeleted }) {
    return (
        <span className='taskIcons'>
            <Icon type='edit' onClick={onEditing} />
            <Icon type='destroy' onClick={onDeleted} />
        </span>
    );
}

TaskIcons.defaultProps = {
    onEditing: () => null,
    onDeleted: () => null,
};

TaskIcons.propTypes = {
    onEditing: PropTypes.func,
    onDeleted: PropTypes.func,
};

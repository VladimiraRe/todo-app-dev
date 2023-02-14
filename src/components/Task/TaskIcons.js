import PropTypes from 'prop-types';

import Icon from '../Icon';

export default function TaskIcons({ onEditing, onDeleted }) {
    return (
        <span className='task_icons'>
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

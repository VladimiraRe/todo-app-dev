import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Icon from '../icon';
import './task.css';

export default function Task({ data: { isDone, description, created }, isEdit, onDeleted, onEditing, onCompleted }) {
    const distanceToNow = formatDistanceToNow(created, {
        includeSeconds: true,
    });

    return (
        <div className={`task${isEdit ? ' task--editing' : ''}`}>
            <label>
                <input onChange={onCompleted} className='task__toggle' type='checkbox' checked={isDone} />
                <span className={`task__description${isDone ? ' task__description--done' : ''}`}>{description}</span>
            </label>
            <span className='task__created'>created {distanceToNow}</span>
            <Icon type='edit' onClick={onEditing} />
            <Icon type='destroy' onClick={onDeleted} />
        </div>
    );
}

Task.defaultProps = {
    isDone: false,
    description: '',
    isEdit: false,
    onDeleted: () => null,
    onCompleted: () => null,
    onEditing: () => null,
    data: {},
};

Task.propTypes = {
    data: PropTypes.shape({
        description: PropTypes.string,
        created: PropTypes.number,
        isDone: PropTypes.bool,
    }),
    isDone: PropTypes.bool,
    description: PropTypes.string,
    isEdit: PropTypes.bool,
    onDeleted: PropTypes.func,
    onCompleted: PropTypes.func,
    onEditing: PropTypes.func,
};

import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Icon from '../Icon';
import Timer from '../Timer';
import './Task.css';

export default function Task({
    data: { isDone, description, created },
    timer,
    isEdit,
    onDeleted,
    onEditing,
    onCompleted,
    onStopTimer,
}) {
    const distanceToNow = formatDistanceToNow(created, {
        includeSeconds: true,
    });

    return (
        <div className={`task${isEdit ? ' task--editing' : ''}`}>
            <label>
                <input onChange={onCompleted} className='task__toggle' type='checkbox' checked={isDone} />
                <span className={`task__description${isDone ? ' task__description--done' : ''}`}>{description}</span>
            </label>
            {timer !== null && <Timer isEdit={isEdit} onStopTimer={onStopTimer} seconds={timer} />}
            <span className='task__created'>created {distanceToNow}</span>
            <span className='task__wrap'>
                <Icon type='edit' onClick={onEditing} />
                <Icon type='destroy' onClick={onDeleted} />
            </span>
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
    onStopTimer: () => null,
    data: {},
    timer: null,
};

Task.propTypes = {
    data: PropTypes.shape({
        description: PropTypes.string,
        created: PropTypes.number,
        isDone: PropTypes.bool,
    }),
    timer: PropTypes.number,
    isDone: PropTypes.bool,
    description: PropTypes.string,
    isEdit: PropTypes.bool,
    onDeleted: PropTypes.func,
    onCompleted: PropTypes.func,
    onEditing: PropTypes.func,
    onStopTimer: PropTypes.func,
};

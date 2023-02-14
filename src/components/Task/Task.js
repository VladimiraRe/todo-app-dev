import PropTypes from 'prop-types';

import Timer from '../Timer';

import TaskIcons from './TaskIcons';
import TaskLabel from './TaskLabel';
import TaskCreationTime from './TaskCreationTime';
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
    return (
        <div className={`task${isEdit ? ' task--editing' : ''}`}>
            <TaskLabel description={description} isDone={isDone} onCompleted={onCompleted} />
            {timer !== null && <Timer isEdit={isEdit} onStopTimer={onStopTimer} seconds={timer} isDone={isDone} />}
            {created && <TaskCreationTime created={created} />}
            <TaskIcons onEditing={onEditing} onDeleted={onDeleted} />
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

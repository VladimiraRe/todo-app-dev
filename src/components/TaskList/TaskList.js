import { useState } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';
import TaskForm from '../TaskForm';
import './TaskList.css';

export default function TaskList({
    data,
    filterNames: [all, active, completed],
    filter,
    onDeleted,
    onCompleted,
    onEditing,
    onStopTimer,
}) {
    const [edit, setEdit] = useState(false);

    const tasks = data
        .filter(
            (el) => (filter === active && !el.isDone) || (filter === completed && el.isDone) || (filter === all && el)
        )
        .map(({ id, description, created, isDone, timer }) => {
            const isEdit = edit === id;
            return (
                <li key={id} className='task-list__item'>
                    <Task
                        data={{ description, created, isDone }}
                        timer={timer}
                        onDeleted={() => onDeleted(id)}
                        onCompleted={() => onCompleted(id)}
                        isEdit={isEdit}
                        onEditing={() => setEdit(id)}
                        onStopTimer={(value) => onStopTimer(id, value)}
                    />
                    {isEdit && (
                        <TaskForm
                            startValue={{ description, timer }}
                            onSubmit={(obj) => onEditing(id, obj)}
                            finishEditing={() => setEdit(false)}
                        />
                    )}
                </li>
            );
        });
    return (
        <ul className='task-list' aria-label='task list'>
            {tasks}
        </ul>
    );
}

TaskList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            description: PropTypes.string,
            created: PropTypes.number,
            isDone: PropTypes.bool,
            timer: PropTypes.number,
        })
    ),
    filter: PropTypes.string,
    filterNames: PropTypes.arrayOf(PropTypes.string),
    onDeleted: PropTypes.func,
    onCompleted: PropTypes.func,
    onEditing: PropTypes.func,
    onStopTimer: PropTypes.func,
};

TaskList.defaultProps = {
    data: [],
    filterNames: ['all'],
    filter: 'all',
    onDeleted: () => null,
    onCompleted: () => null,
    onEditing: () => null,
    onStopTimer: () => null,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from '../task';
import TaskForm from '../task-form';
import './task-list.css';

export default class TaskList extends Component {
    static defaultProps = {
        data: [],
        filterNames: ['all'],
        filter: 'all',
        edit: false,
    };

    static propTypes = {
        data: PropTypes.array,
        filter: PropTypes.string,
        filterNames: PropTypes.arrayOf(PropTypes.string),
        edit: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
        onDeleted: PropTypes.func,
        onCompleted: PropTypes.func,
        onEditing: PropTypes.func,
        onStartOfEditing: PropTypes.func,
    };

    render() {
        const {
            data,
            filter,
            filterNames: [all, active, completed],
            edit,
            onDeleted,
            onCompleted,
            onEditing,
            onStartOfEditing,
        } = this.props;
        const tasks = data
            .filter(
                (el) =>
                    (filter === active && !el.isDone) ||
                    (filter === completed && el.isDone) ||
                    (filter === all && el)
            )
            .map(({ id, ...props }) => {
                let className = 'task-list__item';
                let isEdit = edit === id ? true : false;
                return (
                    <li key={id} className={className}>
                        <Task
                            {...props}
                            onDeleted={() => onDeleted(id)}
                            onCompleted={() => onCompleted(id)}
                            onEditing={() => onStartOfEditing(id)}
                            isEdit={isEdit}
                        />
                        {isEdit && (
                            <TaskForm
                                startValue={props.description}
                                onSubmit={(description) =>
                                    onEditing(id, description)
                                }
                            />
                        )}
                    </li>
                );
            });
        return <ul className='task-list'>{tasks}</ul>;
    }
}

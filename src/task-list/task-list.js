import React, { Component } from 'react';
import Task from '../task';
import TaskForm from '../task-form';
import './task-list.css';

export default class TaskList extends Component {
    render() {
        const { data, onDeleted, onCompleted, filter } = this.props;
        const tasks = data
            .filter(
                (el) =>
                    (filter === 'active' && !el.isDone) ||
                    (filter === 'completed' && el.isDone) ||
                    (filter === 'all' && el)
            )
            .map(({ id, ...props }) => {
                let className = 'task-list__item';
                return (
                    <li key={id} className={className}>
                        <Task
                            {...props}
                            onDeleted={() => onDeleted(id)}
                            onCompleted={() => onCompleted(id)}
                        />
                        <TaskForm type='edit' />
                    </li>
                );
            });
        return <ul className='task-list'>{tasks}</ul>;
    }
}

import React from 'react';
import Task from '../task';
import TaskForm from '../task-form';
import './task-list.css';

export default function TaskList({ data }) {
    const tasks = data.map(({ id, ...props }) => {
        let className = 'task-list__item';
        if (props.isCompleted) className += ' task-list__item--completed';
        return (
            <li key={id} className={className}>
                <Task {...props} />
                <TaskForm type='edit' />
            </li>
        );
    });
    return <ul className='task-list'>{tasks}</ul>;
}

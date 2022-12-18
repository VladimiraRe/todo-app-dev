import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Icon from '../icon';
import './task.css';

export default function Task({ description, created, isCompleted }) {
    created = formatDistanceToNow(created, { includeSeconds: true });
    let classDescr = 'task__description';
    if (isCompleted) classDescr += ' task__description--completed';

    return (
        <div className='task'>
            <input className='task__toggle' type='checkbox' />
            <label>
                <span className={classDescr}>{description}</span>
                <span className='task__created'>created {created}</span>
            </label>
            <Icon type='edit' />
            <Icon type='destroy' />
        </div>
    );
}

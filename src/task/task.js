import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Icon from '../icon';
import './task.css';

export default class Task extends Component {
    state = {
        created: formatDistanceToNow(this.props.created, {
            includeSeconds: true,
        }),
    };

    render() {
        const { isDone, description, onDeleted, onCompleted, onEditing } =
            this.props;
        let classDescr = 'task__description';
        if (isDone) classDescr += ' task__description--done';
        return (
            <div className='task'>
                <input
                    onClick={onCompleted}
                    className='task__toggle'
                    type='checkbox'
                />
                <label>
                    <span className={classDescr}>{description}</span>
                    <span className='task__created'>
                        created {this.state.created}
                    </span>
                </label>
                <Icon type='edit' onClick={onEditing} />
                <Icon type='destroy' onClick={onDeleted} />
            </div>
        );
    }
}

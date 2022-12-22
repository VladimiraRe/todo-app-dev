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
        const {
            isDone,
            description,
            onDeleted,
            onCompleted,
            onEditing,
            isEdit,
        } = this.props;
        return (
            <div className={`task ${isEdit && 'task--editing'}`}>
                <input
                    onClick={onCompleted}
                    className='task__toggle'
                    type='checkbox'
                />
                <label>
                    <span
                        className={`task__description ${
                            isDone && 'task__description--done'
                        }`}
                    >
                        {description}
                    </span>
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

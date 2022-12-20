import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Icon from '../icon';
import './task.css';

export default class Task extends Component {
    state = {
        created: formatDistanceToNow(this.props.created, {
            includeSeconds: true,
        }),
        isCompleted: false,
    };

    completeTask = () => {
        this.setState(({ isCompleted }) => ({ isCompleted: !isCompleted }));
    };

    render() {
        const { isCompleted, created } = this.state;
        let classDescr = 'task__description';
        if (isCompleted) classDescr += ' task__description--completed';
        return (
            <div className='task'>
                <input
                    onClick={this.completeTask}
                    className='task__toggle'
                    type='checkbox'
                />
                <label>
                    <span className={classDescr}>{this.props.description}</span>
                    <span className='task__created'>created {created}</span>
                </label>
                <Icon type='edit' />
                <Icon onDeleted={this.props.onDeleted} type='destroy' />
            </div>
        );
    }
}

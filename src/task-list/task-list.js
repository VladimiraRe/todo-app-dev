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
    };

    static propTypes = {
        data: PropTypes.array,
        filter: PropTypes.string,
        filterNames: PropTypes.arrayOf(PropTypes.string),
        onDeleted: PropTypes.func,
        onCompleted: PropTypes.func,
        onEditing: PropTypes.func,
        onStartOfEditing: PropTypes.func,
    };

    state = {
        edit: false,
    };

    toggleEditStatus = (id) => {
        this.setState({ edit: id });
    };

    render() {
        const {
            data,
            filter,
            filterNames: [all, active, completed],
            onDeleted,
            onCompleted,
            onEditing,
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
                let isEdit = this.state.edit === id ? true : false;
                return (
                    <li key={id} className={className}>
                        <Task
                            {...props}
                            onDeleted={() => onDeleted(id)}
                            onCompleted={() => onCompleted(id)}
                            isEdit={isEdit}
                            onEditing={() => this.toggleEditStatus(id)}
                        />
                        {isEdit && (
                            <TaskForm
                                startValue={props.description}
                                onSubmit={(description) =>
                                    onEditing(id, description)
                                }
                                onEditing={this.toggleEditStatus}
                            />
                        )}
                    </li>
                );
            });
        return <ul className='task-list'>{tasks}</ul>;
    }
}

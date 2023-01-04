import { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';
import TaskForm from '../TaskForm';
import './TaskList.css';

export default class TaskList extends Component {
    static defaultProps = {
        data: [],
        filterNames: ['all'],
        filter: 'all',
        onDeleted: () => null,
        onCompleted: () => null,
        onEditing: () => null,
    };

    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                description: PropTypes.string,
                created: PropTypes.number,
                isDone: PropTypes.bool,
            })
        ),
        filter: PropTypes.string,
        filterNames: PropTypes.arrayOf(PropTypes.string),
        onDeleted: PropTypes.func,
        onCompleted: PropTypes.func,
        onEditing: PropTypes.func,
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
            onEditing,
            onDeleted,
            onCompleted,
        } = this.props;
        const { edit } = this.state;
        const tasks = data
            .filter(
                (el) =>
                    (filter === active && !el.isDone) || (filter === completed && el.isDone) || (filter === all && el)
            )
            .map(({ id, description, created, isDone }) => {
                const className = 'task-list__item';
                const isEdit = edit === id;
                return (
                    <li key={id} className={className}>
                        <Task
                            data={{ description, created, isDone }}
                            onDeleted={() => onDeleted(id)}
                            onCompleted={() => onCompleted(id)}
                            isEdit={isEdit}
                            onEditing={() => this.toggleEditStatus(id)}
                        />
                        {isEdit && (
                            <TaskForm
                                startValue={description}
                                onSubmit={(text) => onEditing(id, text)}
                                onEditing={this.toggleEditStatus}
                            />
                        )}
                    </li>
                );
            });
        return <ul className='task-list'>{tasks}</ul>;
    }
}

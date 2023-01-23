import { Component } from 'react';
import PropTypes from 'prop-types';
import { v1 as uuidv1 } from 'uuid';

import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './TodoApp.css';

export default class TodoApp extends Component {
    static createTask = (obj) => {
        return {
            id: uuidv1(),
            created: new Date().getTime(),
            isDone: false,
            ...obj,
        };
    };

    static defaultProps = {
        data: [1, 2, 3].map(() => TodoApp.createTask({ description: 'Add your task or edit this one', timer: 745 })),
    };

    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                description: PropTypes.string,
                created: PropTypes.number,
                isDone: PropTypes.bool,
                timer: PropTypes.number,
            })
        ),
    };

    filterNames = ['all', 'active', 'completed'];

    state = {
        data: this.props.data,
        filter: this.filterNames[0],
        checked: [],
    };

    addTask = (obj) => {
        this.setState(({ data }) => ({
            data: [...data, TodoApp.createTask(obj)],
        }));
    };

    editTask = (id, obj) => {
        this.setState(({ data }) => {
            return {
                data: data.map((el) => {
                    if (el.id !== id) return el;
                    return { ...el, ...obj };
                }),
            };
        });
    };

    deleteTask = (id) => {
        this.setState(({ data }) => {
            return { data: data.filter((el) => el.id !== id) };
        });
    };

    deleteCompleted = () => {
        this.setState(({ data }) => {
            return { data: data.filter((el) => !el.isDone) };
        });
    };

    completeTask = (id) => {
        this.setState(({ data }) => {
            return {
                data: data.map((task) => {
                    if (task.id !== id) return task;
                    return { ...task, isDone: !task.isDone };
                }),
            };
        });
    };

    changeFilter = (value) => {
        this.setState({ filter: value });
    };

    changeTimer = (id, value) => {
        this.setState(({ data }) => {
            return {
                data: data.map((task) => {
                    if (task.id !== id) return task;
                    return { ...task, timer: value };
                }),
            };
        });
    };

    render() {
        const { data, filter, checked } = this.state;
        const tasksLeft = data.filter((el) => !el.isDone).length;
        return (
            <section className='todoApp'>
                <Header onAdded={this.addTask} />
                <section className='todoApp__main'>
                    <TaskList
                        data={data}
                        onDeleted={this.deleteTask}
                        onCompleted={this.completeTask}
                        onEditing={this.editTask}
                        onStopTimer={this.changeTimer}
                        filter={filter}
                        filterNames={this.filterNames}
                        checked={checked}
                    />
                    <Footer
                        onChange={this.changeFilter}
                        filter={filter}
                        onReset={this.deleteCompleted}
                        tasksLeft={tasksLeft}
                        filterNames={this.filterNames}
                    />
                </section>
            </section>
        );
    }
}

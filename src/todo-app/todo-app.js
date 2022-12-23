import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppHeader from '../app-header';
import TaskList from '../task-list';
import Footer from '../footer';
import './todo-app.css';

export default class TodoApp extends Component {
    maxId = 100;
    filterNames = ['all', 'active', 'completed'];

    static defaultProps = {
        data: [97, 98, 99].map((id) => ({
            id: id,
            description: 'Add your task or edit this one',
            created: new Date().getTime(),
            isDone: false,
        })),
    };

    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                description: PropTypes.string,
                created: PropTypes.number,
                isDone: PropTypes.bool,
            })
        ),
    };

    createTask = (description) => {
        return {
            id: this.maxId++,
            description: description,
            created: new Date().getTime(),
            isDone: false,
        };
    };

    state = {
        data: this.props.data,
        filter: this.filterNames[0],
        edit: false,
    };

    addTask = (description) => {
        this.setState(({ data }) => ({
            data: [...data, this.createTask(description)],
        }));
    };

    startEditTask = (id) => {
        this.setState({ edit: id });
    };

    editTask = (id, description) => {
        this.setState(({ data }) => {
            const inx = data.findIndex((el) => el.id === id);
            return {
                data: [
                    ...data.slice(0, inx),
                    { ...data[inx], description: description },
                    ...data.slice(inx + 1),
                ],
            };
        });
        this.startEditTask(false);
    };

    deleteTask = (id) => {
        this.setState(({ data }) => {
            const inx = data.findIndex((el) => el.id === id);
            return {
                data: [...data.slice(0, inx), ...data.slice(inx + 1)],
            };
        });
    };

    deleteCompleted = () => {
        this.setState(({ data }) => ({
            data: data.filter((el) => !el.isDone),
        }));
    };

    completeTask = (id) => {
        this.setState(({ data }) => {
            const inx = data.findIndex((el) => el.id === id);
            return {
                data: [
                    ...data.slice(0, inx),
                    { ...data[inx], isDone: !data[inx].isDone },
                    ...data.slice(inx + 1),
                ],
            };
        });
    };

    changeFilter = (value) => {
        this.setState({ filter: value });
    };

    render() {
        const { data, filter } = this.state;
        const tasksLeft = data.filter((el) => !el.isDone).length;
        return (
            <section className='todoApp'>
                <AppHeader onAdded={this.addTask} />
                <section className='todoApp__main'>
                    <TaskList
                        data={data}
                        onDeleted={this.deleteTask}
                        onCompleted={this.completeTask}
                        onEditing={this.editTask}
                        onStartOfEditing={this.startEditTask}
                        edit={this.state.edit}
                        filter={filter}
                        filterNames={this.filterNames}
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

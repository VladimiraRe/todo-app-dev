import React, { Component } from 'react';
import AppHeader from '../app-header';
import TaskList from '../task-list';
import Footer from '../footer';
import './todo-app.css';

export default class TodoApp extends Component {
    maxId = 100;

    createTask = (description) => {
        return {
            id: this.maxId++,
            description: description,
            created: new Date().getTime(),
            isDone: false,
        };
    };

    state = {
        data: [
            this.createTask('Wake Up'),
            this.createTask('Drink Coffe'),
            this.createTask('Learn React'),
        ],
        filter: 'all',
    };

    addTask = (description) => {
        this.setState(({ data }) => ({
            data: [...data, this.createTask(description)],
        }));
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
                        filter={filter}
                    />
                    <Footer
                        onChange={this.changeFilter}
                        filter={filter}
                        onReset={this.deleteCompleted}
                        tasksLeft={tasksLeft}
                    />
                </section>
            </section>
        );
    }
}

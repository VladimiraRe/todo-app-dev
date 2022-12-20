import React, { Component } from 'react';
import AppHeader from '../app-header';
import TaskList from '../task-list';
import Footer from '../footer';
import './todo-app.css';

export default class TodoApp extends Component {
    state = {
        data: [
            {
                id: 1,
                description: 'Completed task',
                created: new Date('Sat Dec 17 2022 23:03:59'),
            },
            {
                id: 2,
                description: 'Active task',
                created: new Date('Sat Dec 17 2022 23:03:59'),
            },
            {
                id: 3,
                description: 'Active task',
                created: new Date('Sat Dec 17 2022 23:03:59'),
            },
        ],
    };

    deleteTask = (id) => {
        this.setState(({ data }) => {
            const inx = data.findIndex((el) => el.id === id);
            return {
                data: [...data.slice(0, inx), ...data.slice(inx + 1)],
            };
        });
    };

    render() {
        return (
            <section className='todoApp'>
                <AppHeader />
                <section className='todoApp__main'>
                    <TaskList
                        data={this.state.data}
                        onDeleted={this.deleteTask}
                    />
                    <Footer />
                </section>
            </section>
        );
    }
}

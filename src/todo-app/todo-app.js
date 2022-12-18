import React from 'react';
import AppHeader from '../app-header';
import TaskList from '../task-list';
import Footer from '../footer';
import './todo-app.css';

export default function TodoApp() {
    const data = [
        {
            id: 1,
            description: 'Completed task',
            created: new Date('Sat Dec 17 2022 23:03:59'),
            isCompleted: true,
        },
        {
            id: 2,
            description: 'Active task',
            created: new Date('Sat Dec 17 2022 23:03:59'),
            isCompleted: false,
        },
        {
            id: 3,
            description: 'Active task',
            created: new Date('Sat Dec 17 2022 23:03:59'),
            isCompleted: false,
        },
    ];

    return (
        <section className='todoApp'>
            <AppHeader />
            <section className='todoApp__main'>
                <TaskList data={data} />
                <Footer />
            </section>
        </section>
    );
}

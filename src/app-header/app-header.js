import React from 'react';
import TaskForm from '../task-form';
import './app-header.css';

export default function AppHeader({ onAdded }) {
    return (
        <header className='header'>
            <h1 className='header__title'>todos</h1>
            <TaskForm onSubmit={onAdded} />
        </header>
    );
}

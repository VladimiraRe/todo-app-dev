import React from 'react';
import './task-form.css';

export default function TaskForm({ type }) {
    let className = 'task-form';
    let placeholder;
    if (type === 'new') {
        className += ' task-form__new';
        placeholder = 'What needs to be done?';
    }
    if (type === 'edit') {
        className += ' task-form__edit';
        placeholder = 'Edditing task';
    }
    return (
        <input
            type='text'
            className={className}
            placeholder={placeholder}
            autoFocus
        />
    );
}

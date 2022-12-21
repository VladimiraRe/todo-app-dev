import React from 'react';
import TasksFilter from '../tasks-filter';
import './footer.css';

export default function Footer({ tasksLeft, onChange, filter, onReset }) {
    return (
        <footer className='footer'>
            <span className='footer__todo-count'>{tasksLeft} items left</span>
            <TasksFilter onChange={onChange} filter={filter} />
            <button onClick={onReset} className='footer__clear-completed'>
                Clear completed
            </button>
        </footer>
    );
}

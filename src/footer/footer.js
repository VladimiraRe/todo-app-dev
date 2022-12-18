import React from 'react';
import TasksFilter from '../tasks-filter';
import './footer.css';

export default function Footer({ howMany = 1 }) {
    return (
        <footer className='footer'>
            <span className='footer__todo-count'>{howMany} items left</span>
            <TasksFilter />
            <button className='footer__clear-completed'>Clear completed</button>
        </footer>
    );
}

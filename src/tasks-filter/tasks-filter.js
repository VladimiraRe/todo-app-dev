import React from 'react';
import './tasks-filter.css';

export default function TasksFilter() {
    return (
        <ul className='tasksFilter'>
            <li className='tasksFilter__item'>
                <button className='tasksFilter__btn tasksFilter__btn--selected'>
                    All
                </button>
            </li>
            <li className='tasksFilter__item'>
                <button className='tasksFilter__btn'>Active</button>
            </li>
            <li className='tasksFilter__item'>
                <button className='tasksFilter__btn'>Completed</button>
            </li>
        </ul>
    );
}

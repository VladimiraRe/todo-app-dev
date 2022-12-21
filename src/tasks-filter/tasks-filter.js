import React from 'react';
import Button from '../button';
import './tasks-filter.css';

export default function TasksFilter({ onChange, filter }) {
    const btnsNames = ['all', 'active', 'completed'];
    let key = 1;
    const btnsArr = btnsNames.map((name) => {
        return (
            <li key={key++} className='tasksFilter__item'>
                <Button name={name} onChange={onChange} filter={filter} />
            </li>
        );
    });
    return <ul className='tasksFilter'>{btnsArr}</ul>;
}

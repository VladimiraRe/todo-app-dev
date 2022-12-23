import React from 'react';
import Button from '../button';
import './tasks-filter.css';

export default function TasksFilter({ onChange, filter, filterNames }) {
    let key = 1;
    const btnsArr = filterNames.map((name) => {
        const isSelected = name === filter ? true : false;
        return (
            <li key={key++} className='tasksFilter__item'>
                <Button
                    name={name}
                    onClick={() => onChange(name)}
                    isSelected={isSelected}
                />
            </li>
        );
    });
    return <ul className='tasksFilter'>{btnsArr}</ul>;
}

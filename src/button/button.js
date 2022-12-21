import React from 'react';
import './button.css';

export default function Button({ name, filter, onChange }) {
    let className = 'button';
    if (filter === name) className += ' button--selected';
    return (
        <button onClick={() => onChange(name)} className={className}>
            {name}
        </button>
    );
}

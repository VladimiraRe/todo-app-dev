import React from 'react';
import './button.css';

export default function Button({ name, isSelected, onClick }) {
    let className = 'button';
    if (isSelected) className += ' button--selected';
    return (
        <button onClick={() => onClick(name)} className={className}>
            {name}
        </button>
    );
}

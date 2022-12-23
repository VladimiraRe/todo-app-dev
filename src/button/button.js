import React from 'react';
import './button.css';

export default function Button({ name, isSelected, onClick }) {
    let className = 'button';
    if (isSelected) className += ' button--selected';
    return (
        <button onClick={onClick} className={className}>
            {name}
        </button>
    );
}

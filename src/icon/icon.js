import React from 'react';
import './icon.css';

export default function Icon({ type, onDeleted, onEditing = null }) {
    let className = 'icon';
    let onClick;
    if (type === 'edit') {
        className += ' icon--edit';
        onClick = onEditing;
    }
    if (type === 'destroy') {
        className += ' icon--destroy';
        onClick = onDeleted;
    }
    return <button onClick={onClick} className={className}></button>;
}

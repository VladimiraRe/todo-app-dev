import React from 'react';
import './icon.css';

export default function Icon({ type, onDeleted }) {
    let className = 'icon';
    if (type === 'edit') className += ' icon--edit';
    if (type === 'destroy') className += ' icon--destroy';
    return <button onClick={onDeleted} className={className}></button>;
}

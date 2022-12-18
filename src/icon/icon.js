import React from 'react';
import './icon.css';

export default function Icon({ type }) {
    let className = 'icon';
    if (type === 'edit') className += ' icon--edit';
    if (type === 'destroy') className += ' icon--destroy';
    return <button className={className}></button>;
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './icon.css';

export default class Icon extends Component {
    static defaultProp = {
        type: '',
    };

    static propTypes = {
        type: PropTypes.string,
        onClick: PropTypes.func,
    };

    render() {
        const { type, onClick } = this.props;
        let className = 'icon';
        if (type === 'edit') {
            className += ' icon--edit';
        }
        if (type === 'destroy') {
            className += ' icon--destroy';
        }
        return <button onClick={onClick} className={className}></button>;
    }
}

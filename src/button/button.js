import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './button.css';

export default class Button extends Component {
    static defaultProp = {
        name: '',
        isSelected: false,
    };

    static propTypes = {
        name: PropTypes.string,
        isSelected: PropTypes.bool,
        onClick: PropTypes.func,
    };

    render() {
        const { name, isSelected, onClick } = this.props;
        let className = 'button';
        if (isSelected) className += ' button--selected';
        return (
            <button onClick={onClick} className={className}>
                {name}
            </button>
        );
    }
}

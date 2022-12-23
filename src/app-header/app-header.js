import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskForm from '../task-form';
import './app-header.css';

export default class AppHeader extends Component {
    static propTypes = {
        onAdded: PropTypes.func,
    };

    render() {
        return (
            <header className='header'>
                <h1 className='header__title'>todos</h1>
                <TaskForm onSubmit={this.props.onAdded} />
            </header>
        );
    }
}

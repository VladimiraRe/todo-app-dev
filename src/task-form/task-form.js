import React, { Component } from 'react';
import './task-form.css';

export default class TaskForm extends Component {
    state = {
        value: '',
    };

    className = 'task-form__input';
    placeholder;

    onChange = (e) => {
        this.setState({ value: e.target.value });
    };

    onSubmit = (e, edit) => {
        e.preventDefault();
        if (this.state.value === '') return;
        this.props.onAdded(this.state.value);
        this.setState({ value: '' });
    };

    render() {
        const { type } = this.props;
        if (type === 'new') {
            this.className += ' task-form__input--new';
            this.placeholder = 'What needs to be done?';
        } else if (type === 'edit') {
            this.className += ' task-form__input--edit';
            this.placeholder = 'Edditing task';
        }
        return (
            <form
                onSubmit={(e) => this.onSubmit(e, this.edit)}
                className='task-form'
            >
                <input
                    type='text'
                    className={this.className}
                    value={this.state.value}
                    onChange={(e) => this.onChange(e)}
                    placeholder={this.placeholder}
                    autoFocus
                />
            </form>
        );
    }
}

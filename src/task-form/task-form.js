import React, { Component } from 'react';
import './task-form.css';

export default class TaskForm extends Component {
    startValue = this.props.startValue;

    state = {
        value: this.startValue,
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.value === '') return;
        this.props.onSubmit(this.state.value);
        if (!this.startValue) this.setState({ value: '' });
    };

    onChange = (e) => {
        this.setState({ value: e.target.value });
    };

    onCancellation = (e) => {
        if (e.key === 'Escape') {
            if (this.startValue) {
                this.props.onSubmit(this.startValue);
            } else {
                if (this.state.value === '') return;
                this.setState({ value: this.startValue });
            }
        }
    };

    render() {
        let className = 'task-form__input';
        let placeholder;
        if (this.startValue) {
            className += ' task-form__input--edit';
            placeholder = 'Edditing task';
        } else {
            className += ' task-form__input--new';
            placeholder = 'What needs to be done?';
        }
        return (
            <form
                onKeyDown={this.onCancellation}
                onSubmit={(e) => this.onSubmit(e)}
                className='task-form'
            >
                <input
                    type='text'
                    className={className}
                    value={this.state.value}
                    onChange={(e) => this.onChange(e)}
                    placeholder={placeholder}
                    autoFocus
                />
            </form>
        );
    }
}

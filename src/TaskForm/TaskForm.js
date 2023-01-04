import { Component } from 'react';
import PropTypes from 'prop-types';
import './TaskForm.css';

export default class TaskForm extends Component {
    static defaultProps = {
        startValue: '',
        onSubmit: () => null,
        onEditing: () => null,
    };

    static propTypes = {
        startValue: PropTypes.string,
        onSubmit: PropTypes.func,
        onEditing: PropTypes.func,
    };

    startValue = this.props.startValue;

    state = {
        value: this.startValue,
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { value } = this.state;
        if (value === '' || value.split(' ').join('') === '') return;
        this.props.onSubmit(value);
        if (!this.startValue) {
            this.setState({ value: '' });
        } else {
            this.props.onEditing(false);
        }
    };

    onChange = (e) => {
        this.setState({ value: e.target.value });
    };

    onCancellation = (e) => {
        if (e.key === 'Escape') {
            if (this.startValue) {
                this.props.onSubmit(this.startValue);
                this.props.onEditing(false);
            } else {
                if (this.state.value === '') return;
                this.setState({ value: this.startValue });
            }
        }
    };

    render() {
        const { value } = this.state;
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
            <form onSubmit={(e) => this.onSubmit(e)} className='task-form'>
                <input
                    type='text'
                    className={className}
                    value={value}
                    onChange={(e) => this.onChange(e)}
                    onKeyDown={this.onCancellation}
                    placeholder={placeholder}
                    autoFocus
                />
            </form>
        );
    }
}

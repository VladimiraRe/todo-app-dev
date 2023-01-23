import { Component } from 'react';
import PropTypes from 'prop-types';
// import { format } from 'date-fns';

import './TaskForm.css';

export default class TaskForm extends Component {
    static defaultProps = {
        startValue: { description: '', timer: null },
        onSubmit: () => null,
        onEditing: () => null,
    };

    static propTypes = {
        startValue: PropTypes.shape({
            description: PropTypes.string,
            timer: PropTypes.number,
        }),
        onSubmit: PropTypes.func,
        onEditing: PropTypes.func,
    };

    secIn = { hour: 3600, minute: 60 };

    startValue = this.props.startValue;

    state = {
        description: '',
    };

    componentDidMount() {
        const { startValue } = this.props;
        if (startValue.description) {
            this.setState({
                ...this.formatSecToTimer(startValue.timer),
                description: startValue.description,
            });
        }
    }

    componentDidUpdate({ startValue: { timer: prevPropsTimer } }) {
        const {
            startValue: { timer },
        } = this.props;
        if (timer !== prevPropsTimer) {
            this.startValue.timer = timer;
            this.setState({ ...this.formatSecToTimer(timer) });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { description: startDescr, timer: startTimer } = this.startValue;
        const { description, ...timerProps } = this.state;
        let timer = this.formatTimerToSec(timerProps);

        if (description === '' || description.split(' ').join('') === '') return;
        if (!timer) timer = null;

        const newValue = {};
        if (description !== startDescr) newValue.description = description;
        if (timer !== startTimer) newValue.timer = timer;
        if (Object.keys(newValue).length !== 0) this.props.onSubmit(newValue);

        if (!startDescr) {
            this.setState({ description: '', hours: null, minutes: null, seconds: null });
        } else {
            this.props.onEditing(false);
        }
    };

    onChange = (e) => {
        const { name, value } = e.target;
        let res;
        if (name !== 'description' && value.search(/[^0-9]/) !== -1) return;
        if (name === 'seconds' || name === 'minutes') {
            const newValue = value.length === 1 ? `0${value}` : value.slice(-2);
            res = { [name]: newValue > 60 ? `0${newValue.slice(-1)}` : newValue };
        } else res = { [name]: value };
        this.setState(res);
    };

    onCancellation = (e) => {
        if (e.key === 'Escape') {
            if (this.startValue.description) {
                const { description, timer } = this.startValue;
                this.props.onSubmit({ description, timer });
                this.props.onEditing(false);
            } else {
                const { description, ...timerProps } = this.state;
                if (description === '' && !Object.keys(timerProps).find((el) => el !== null)) return;
                this.setState({ description: '', hours: null, minutes: null, seconds: null });
            }
        }
    };

    formatTimerToSec = (obj) => {
        let { hours, minutes, seconds } = obj;
        if (hours === null && minutes === null && seconds === null) return null;
        hours = +hours || 0;
        minutes = +minutes || 0;
        seconds = +seconds || 0;

        return hours * this.secIn.hour + minutes * this.secIn.minute + seconds;
    };

    formatSecToTimer = (sec) => {
        if (sec === null) return { hours: null, minutes: null, seconds: null };
        if (sec === 0) return { hours: null, minutes: null, seconds: null };

        let seconds;
        let minutes;
        let hours;
        if (sec >= this.secIn.hour) {
            hours = Math.trunc(sec / this.secIn.hour);
            seconds = sec % this.secIn.hour;
            minutes = Math.trunc(seconds / this.secIn.minute);
            seconds %= this.secIn.minute;
        } else if (sec >= this.secIn.minute) {
            minutes = Math.trunc(sec / this.secIn.minute);
            seconds = sec % this.secIn.minute;
            hours = null;
        } else {
            hours = null;
            minutes = 0;
            seconds = sec;
        }

        if (minutes < 10) minutes = `0${minutes}`;
        if (seconds < 10) seconds = `0${seconds}`;

        return { hours, minutes, seconds };
    };

    render() {
        const { description, hours, minutes, seconds } = this.state;
        let className = 'task-form';
        let placeholder;

        if (this.startValue.description) {
            className += ' task-form--edit';
            placeholder = 'Edditing task';
        } else {
            className += ' task-form--new';
            placeholder = 'What needs to be done?';
        }

        return (
            <form onSubmit={(e) => this.onSubmit(e)} className={className}>
                <input
                    name='description'
                    type='text'
                    value={description}
                    onChange={(e) => this.onChange(e)}
                    onKeyDown={this.onCancellation}
                    placeholder={placeholder}
                    autoFocus
                />
                <span className='task-form__timer'>
                    <input
                        name='hours'
                        placeholder='Hrs'
                        value={hours || ''}
                        onChange={(e) => this.onChange(e)}
                        onKeyDown={this.onCancellation}
                        style={hours ? { width: `${(hours.length + 1) * 11}px` } : null}
                    />
                    <span className={`task-form__colon${hours ? ' task-form__colon--timer' : ''}`}>:</span>
                    <input
                        name='minutes'
                        placeholder='Min'
                        value={minutes || ''}
                        onChange={(e) => this.onChange(e)}
                        onKeyDown={this.onCancellation}
                    />
                    <span className={`task-form__colon${seconds ? ' task-form__colon--timer' : ''}`}>:</span>
                    <input
                        name='seconds'
                        placeholder='Sec'
                        value={seconds || ''}
                        onChange={(e) => this.onChange(e)}
                        onKeyDown={this.onCancellation}
                    />
                </span>
                <input type='submit' />
            </form>
        );
    }
}

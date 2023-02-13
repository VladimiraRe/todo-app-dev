import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import './TaskForm.css';

export default function TaskForm({ startValue, onSubmit, finishEditing }) {
    const secIn = useMemo(() => ({ hour: 3600, minute: 60 }), []);

    const [description, setDescription] = useState('');
    const [timer, setTimer] = useState({ hours: null, minutes: null, seconds: null });

    useEffect(() => {
        if (startValue.description) {
            setDescription(startValue.description);
        }
    }, [startValue.description]);

    useEffect(() => {
        setTimer(formatSecToTimer(startValue.timer));

        function formatSecToTimer(sec) {
            if (sec === null) return { hours: null, minutes: null, seconds: null };
            if (sec === 0) return { hours: null, minutes: null, seconds: null };

            let seconds;
            let minutes;
            let hours;
            if (sec >= secIn.hour) {
                hours = Math.trunc(sec / secIn.hour);
                seconds = sec % secIn.hour;
                minutes = Math.trunc(seconds / secIn.minute);
                seconds %= secIn.minute;
            } else if (sec >= secIn.minute) {
                minutes = Math.trunc(sec / secIn.minute);
                seconds = sec % secIn.minute;
                hours = null;
            } else {
                hours = null;
                minutes = 0;
                seconds = sec;
            }

            if (minutes < 10) minutes = `0${minutes}`;
            if (seconds < 10) seconds = `0${seconds}`;

            return { hours, minutes, seconds };
        }
    }, [startValue.timer, secIn.hour, secIn.minute]);

    function formatTimerToSec(obj) {
        let { hours, minutes, seconds } = obj;
        if (hours === null && minutes === null && seconds === null) return null;
        hours = +hours || 0;
        minutes = +minutes || 0;
        seconds = +seconds || 0;

        return hours * secIn.hour + minutes * secIn.minute + seconds;
    }

    function resetState() {
        setDescription('');
        setTimer({ hours: null, minutes: null, seconds: null });
    }

    function newOnSubmit(e) {
        e.preventDefault();

        const { description: startDescr, timer: startTimerInSec } = startValue;
        let timerInSec = formatTimerToSec(timer);

        if (description === '' || description.split(' ').join('') === '') return;
        if (!timerInSec) timerInSec = null;

        const newValue = {};
        if (description !== startDescr) newValue.description = description;
        if (timerInSec !== startTimerInSec) newValue.timer = timerInSec;
        if (Object.keys(newValue).length !== 0) onSubmit(newValue);

        if (!startDescr) {
            resetState();
        } else {
            finishEditing();
        }
    }

    function onChange(e) {
        const { name, value } = e.target;
        if (name === 'description') return setDescription(value);
        if (value.search(/[^0-9]/) !== -1) return false;
        if (name === 'hours' && value > 999999999) return false;
        let res;
        if (name === 'seconds' || name === 'minutes') {
            const newValue = value.length === 1 ? `0${value}` : value.slice(-2);
            res = { [name]: newValue > 60 ? `0${newValue.slice(-1)}` : newValue };
        } else res = { [name]: value };
        return setTimer((oldTimer) => ({ ...oldTimer, ...res }));
    }

    function onCancellation(e) {
        if (e.key === 'Escape') {
            if (startValue.description) {
                const { description: startDescr, timer: startTimer } = startValue;
                onSubmit({ startDescr, startTimer });
                finishEditing();
            } else {
                if (description === '' && !Object.keys(timer).find((el) => el !== null)) return;
                resetState();
            }
        }
    }

    let className = 'task-form';
    let placeholder;

    if (startValue.description) {
        className += ' task-form--edit';
        placeholder = 'Edditing task';
    } else {
        className += ' task-form--new';
        placeholder = 'What needs to be done?';
    }

    return (
        <form onSubmit={(e) => newOnSubmit(e)} className={className}>
            <input
                name='description'
                type='text'
                value={description}
                onChange={(e) => onChange(e)}
                onKeyDown={onCancellation}
                placeholder={placeholder}
                autoFocus
            />
            <span className='task-form__timer'>
                <input
                    name='hours'
                    placeholder='Hrs'
                    value={timer.hours || ''}
                    onChange={(e) => onChange(e)}
                    onKeyDown={onCancellation}
                    style={timer.hours ? { width: `${(String(timer.hours).length + 1) * 11}px` } : null}
                />
                <span className={`task-form__colon${timer.hours ? ' task-form__colon--timer' : ''}`}>:</span>
                <input
                    name='minutes'
                    placeholder='Min'
                    value={timer.minutes || ''}
                    onChange={(e) => onChange(e)}
                    onKeyDown={onCancellation}
                />
                <span className={`task-form__colon${timer.seconds ? ' task-form__colon--timer' : ''}`}>:</span>
                <input
                    name='seconds'
                    placeholder='Sec'
                    value={timer.seconds || ''}
                    onChange={(e) => onChange(e)}
                    onKeyDown={onCancellation}
                />
            </span>
            <input type='submit' />
        </form>
    );
}

TaskForm.defaultProps = {
    startValue: { description: '', timer: null },
    onSubmit: () => null,
    finishEditing: () => null,
};

TaskForm.propTypes = {
    startValue: PropTypes.shape({
        description: PropTypes.string,
        timer: PropTypes.number,
    }),
    onSubmit: PropTypes.func,
    finishEditing: PropTypes.func,
};

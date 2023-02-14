import { useEffect, useMemo, useState } from 'react';

export default function useTaskForm(startValue, { onSubmit, finishEditing }) {
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

            return { hours: hours === null ? null : String(hours), minutes: String(minutes), seconds: String(seconds) };
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

    return {
        description,
        timer,
        newOnSubmit,
        onChange,
        onCancellation,
    };
}

import { useEffect, useMemo, useState } from 'react';

import { formatSecToTimer, formatTimerToSec } from '../../../utils/formatTimer';

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
    }, [startValue.timer, secIn.hour, secIn.minute]);

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
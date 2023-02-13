import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';

import Icon from '../Icon';
import './Timer.css';

export default function Timer({ seconds, isEdit, isDone, onStopTimer }) {
    const [sec, setSec] = useState(seconds);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const timer = useRef(null);

    useEffect(() => setSec(seconds), [seconds]);

    useEffect(() => {
        if (isTimerOn && sec && !isDone && !timer.current && !isEdit) {
            timer.current = setInterval(() => setSec((prevSec) => prevSec - 1), 1000);
        }
        if ((!isTimerOn && timer.current) || (isTimerOn && (isEdit || sec === 0 || isDone))) {
            clearInterval(timer.current);
            timer.current = null;
            setIsTimerOn(false);
            onStopTimer(sec);
        }
    }, [isTimerOn, isEdit, sec, isDone, onStopTimer]);

    useEffect(() => {
        return () => {
            if (timer.current) clearInterval(timer.current);
        };
    }, []);

    let displayTimer = format(new Date(2014, 6, 2, 0, 0, sec), 'mm:ss');
    displayTimer = sec >= 3600 ? `${Math.trunc(sec / 3600)}:${displayTimer}` : `0:${displayTimer}`;

    return (
        <span className='timer'>
            <span className='timer__display'>{displayTimer}</span>
            {isTimerOn ? (
                <Icon type='pause' disabled={!isTimerOn || !sec || isDone} onClick={() => setIsTimerOn(false)} />
            ) : (
                <Icon type='play' disabled={isTimerOn || !sec || isDone} onClick={() => setIsTimerOn(true)} />
            )}
        </span>
    );
}

Timer.defaultProps = {
    seconds: null,
    isEdit: false,
    isDone: false,
    onStopTimer: () => null,
};

Timer.propTypes = {
    seconds: PropTypes.number,
    isEdit: PropTypes.bool,
    isDone: PropTypes.bool,
    onStopTimer: PropTypes.func,
};

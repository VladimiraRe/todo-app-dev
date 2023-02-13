import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';

export default function useTimer(seconds, { isEdit, isDone, onStopTimer }) {
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

    return { sec, displayTimer, isTimerOn, setIsTimerOn };
}

import PropTypes from 'prop-types';

import useTimer from './hooks/useTimer';
import TimerIcons from './TimerIcons';
import './Timer.css';

export default function Timer({ seconds, isEdit, isDone, onStopTimer }) {
    const { sec, displayTimer, isTimerOn, setIsTimerOn } = useTimer(seconds, { isEdit, isDone, onStopTimer });

    return (
        <span className='timer'>
            <span className='timer__display'>{displayTimer}</span>
            <TimerIcons isTimerOn={isTimerOn} setIsTimerOn={setIsTimerOn} sec={sec} isDone={isDone} />
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

import PropTypes from 'prop-types';

import Icon from '../Icon';

export default function TimerIcons({ isTimerOn, setIsTimerOn, sec, isDone }) {
    return isTimerOn ? (
        <Icon type='pause' disabled={!isTimerOn || !sec || isDone} onClick={() => setIsTimerOn(false)} />
    ) : (
        <Icon type='play' disabled={isTimerOn || !sec || isDone} onClick={() => setIsTimerOn(true)} />
    );
}

TimerIcons.defaultProps = {
    isTimerOn: false,
    setIsTimerOn: () => null,
    sec: 0,
    isDone: false,
};

TimerIcons.propTypes = {
    isTimerOn: PropTypes.bool,
    setIsTimerOn: PropTypes.func,
    sec: PropTypes.number,
    isDone: PropTypes.bool,
};

import { Component } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Icon from '../Icon';
import './Timer.css';

export default class Timer extends Component {
    static defaultProps = {
        seconds: null,
        isEdit: false,
        isDone: false,
        onStopTimer: () => null,
    };

    static propTypes = {
        seconds: PropTypes.number,
        isEdit: PropTypes.bool,
        isDone: PropTypes.bool,
        onStopTimer: PropTypes.func,
    };

    state = {
        seconds: this.props.seconds,
        isTimerOn: false,
    };

    componentDidUpdate({ seconds: prevPropsSeconds, isEdit: prevPropsIsEdit }) {
        const { seconds, isEdit } = this.props;
        if (seconds !== prevPropsSeconds) {
            this.setState({ seconds });
        }
        if (isEdit !== prevPropsIsEdit && isEdit) {
            this.stopTimer();
        }
    }

    componentWillUnmount() {
        const { seconds, isTimerOn } = this.state;
        if (isTimerOn) {
            clearInterval(this.interval);
            const { onStopTimer } = this.props;
            onStopTimer(seconds);
        }
    }

    runTimer = () => {
        if (!this.state.seconds) return;
        this.setState({ isTimerOn: true });
        this.interval = setInterval(
            () =>
                this.setState(({ seconds: prevSec }) => {
                    const seconds = prevSec - 1;
                    if (seconds === 0) {
                        clearInterval(this.interval);
                        this.props.onStopTimer(0);
                        return { seconds, isTimerOn: false };
                    }
                    if (this.props.isDone) {
                        clearInterval(this.interval);
                        this.props.onStopTimer(seconds);
                        return { seconds, isTimerOn: false };
                    }
                    return { seconds };
                }),
            1000
        );
    };

    stopTimer = () => {
        clearInterval(this.interval);
        this.setState({ isTimerOn: false });
        this.props.onStopTimer(this.state.seconds);
    };

    render() {
        const { seconds, isTimerOn } = this.state;
        let timer = format(new Date(2014, 6, 2, 0, 0, seconds), 'mm:ss');
        timer = seconds >= 3600 ? `${Math.trunc(seconds / 3600)}:${timer}` : `0:${timer}`;

        return (
            <span className='timer'>
                <span className='timer__display'>{timer}</span>
                {isTimerOn ? (
                    <Icon type='pause' onClick={this.stopTimer} />
                ) : (
                    <Icon type='play' onClick={this.runTimer} />
                )}
            </span>
        );
    }
}

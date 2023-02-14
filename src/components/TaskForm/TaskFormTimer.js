import PropTypes from 'prop-types';

export default function TaskFormTimer({ timer: { hours, minutes, seconds }, onChange, onCancellation }) {
    return (
        <span className='task-form__timer'>
            <input
                name='hours'
                placeholder='Hrs'
                value={hours || ''}
                onChange={(e) => onChange(e)}
                onKeyDown={onCancellation}
                style={hours ? { width: `${(String(hours).length + 1) * 11}px` } : null}
            />
            <span className={`task-form__colon${hours ? ' task-form__colon--timer' : ''}`}>:</span>
            <input
                name='minutes'
                placeholder='Min'
                value={minutes || ''}
                onChange={(e) => onChange(e)}
                onKeyDown={onCancellation}
            />
            <span className={`task-form__colon${seconds ? ' task-form__colon--timer' : ''}`}>:</span>
            <input
                name='seconds'
                placeholder='Sec'
                value={seconds || ''}
                onChange={(e) => onChange(e)}
                onKeyDown={onCancellation}
            />
        </span>
    );
}

TaskFormTimer.defaultProps = {
    timer: { hours: '0', minutes: '00', seconds: '00' },
    onChange: () => null,
    onCancellation: () => null,
};

TaskFormTimer.propTypes = {
    timer: PropTypes.objectOf(PropTypes.string),
    onChange: PropTypes.func,
    onCancellation: PropTypes.func,
};

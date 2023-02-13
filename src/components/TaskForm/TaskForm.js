import PropTypes from 'prop-types';

import useTaskForm from '../../hooks/useTaskForm';
import './TaskForm.css';

export default function TaskForm({ startValue, onSubmit, finishEditing }) {
    const { description, timer, newOnSubmit, onChange, onCancellation } = useTaskForm(startValue, {
        onSubmit,
        finishEditing,
    });

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

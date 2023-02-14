import PropTypes from 'prop-types';

import './TaskForm.css';
import useTaskForm from './hooks/useTaskForm';
import TaskFormTimer from './TaskFormTimer';
import TaskFormWrap from './TaskFormWrap';

export default function TaskForm({ startValue, onSubmit, finishEditing }) {
    const { description, timer, newOnSubmit, onChange, onCancellation } = useTaskForm(startValue, {
        onSubmit,
        finishEditing,
    });

    return (
        <TaskFormWrap
            startDescription={startValue.description}
            description={description}
            onChange={onChange}
            onCancellation={onCancellation}
            newOnSubmit={newOnSubmit}
        >
            <TaskFormTimer timer={timer} onChange={onChange} onCancellation={onCancellation} />
        </TaskFormWrap>
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

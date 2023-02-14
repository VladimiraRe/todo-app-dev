import PropTypes from 'prop-types';

export default function TaskLabel({ description, isDone, onCompleted }) {
    return (
        <label>
            <input onChange={onCompleted} className='task__toggle' type='checkbox' checked={isDone} />
            <span className={`task__description${isDone ? ' task__description--done' : ''}`}>{description}</span>
        </label>
    );
}

TaskLabel.defaultProps = {
    description: '',
    isDone: false,
    onCompleted: () => null,
};

TaskLabel.propTypes = {
    description: PropTypes.string,
    isDone: PropTypes.bool,
    onCompleted: PropTypes.func,
};

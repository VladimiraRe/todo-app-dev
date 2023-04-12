import PropTypes from 'prop-types';

export default function TaskFormWrap({
    startDescription,
    description,
    onChange,
    onCancellation,
    newOnSubmit,
    ...props
}) {
    let className = 'task-form';
    let placeholder;

    if (startDescription) {
        className += ' task-form--edit';
        placeholder = 'Edditing task';
    } else {
        className += ' task-form--new';
        placeholder = 'What needs to be done?';
    }

    return (
        <form onSubmit={(e) => newOnSubmit(e)} className={className} aria-label='task form'>
            <input
                name='description'
                type='text'
                value={description}
                onChange={(e) => onChange(e)}
                onKeyDown={onCancellation}
                placeholder={placeholder}
                autoFocus
            />
            {props.children}
            <input type='submit' />
        </form>
    );
}

TaskFormWrap.defaultProps = {
    startDescription: '',
    description: '',
    onChange: () => null,
    onCancellation: () => null,
    newOnSubmit: () => null,
};

TaskFormWrap.propTypes = {
    startDescription: PropTypes.string,
    description: PropTypes.string,
    onChange: PropTypes.func,
    onCancellation: PropTypes.func,
    newOnSubmit: PropTypes.func,
};

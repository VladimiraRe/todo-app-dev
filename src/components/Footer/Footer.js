import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';
import Button from '../Button';
import './Footer.css';

export default function Footer({ filter, filterNames, tasksLeft, onChange, onReset, disabled }) {
    return (
        <footer className='footer'>
            <span className='footer__todo-count'>{tasksLeft} items left</span>
            <TasksFilter onChange={onChange} filter={filter} filterNames={filterNames} />
            <Button
                name='Clear completed'
                onClick={onReset}
                disabled={disabled}
                additionalСlass='footer__clear-completed'
            />
        </footer>
    );
}

Footer.defaultProps = {
    filter: 'all',
    filterNames: ['all'],
    tasksLeft: 0,
    disabled: false,
    onChange: () => null,
    onReset: () => null,
};

Footer.propTypes = {
    filter: PropTypes.string,
    filterNames: PropTypes.arrayOf(PropTypes.string),
    tasksLeft: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onReset: PropTypes.func,
};

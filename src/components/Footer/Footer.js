import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';
import './Footer.css';

export default function Footer({ filter, filterNames, tasksLeft, onChange, onReset, disabled }) {
    return (
        <footer className='footer'>
            <span className='footer__todo-count'>{tasksLeft} items left</span>
            <TasksFilter onChange={onChange} filter={filter} filterNames={filterNames} />
            <button type='button' onClick={onReset} disabled={disabled} className='footer__clear-completed'>
                Clear completed
            </button>
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

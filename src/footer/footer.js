import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../tasks-filter';
import './footer.css';

export default class Footer extends Component {
    static defaultProps = {
        filter: 'all',
        filterNames: ['all'],
        tasksLeft: 0,
    };

    static propTypes = {
        filter: PropTypes.string,
        filterNames: PropTypes.arrayOf(PropTypes.string),
        tasksLeft: PropTypes.number,
        onChange: PropTypes.func,
        onReset: PropTypes.func,
    };

    render() {
        const { tasksLeft, onChange, filter, onReset, filterNames } =
            this.props;
        return (
            <footer className='footer'>
                <span className='footer__todo-count'>
                    {tasksLeft} items left
                </span>
                <TasksFilter
                    onChange={onChange}
                    filter={filter}
                    filterNames={filterNames}
                />
                <button onClick={onReset} className='footer__clear-completed'>
                    Clear completed
                </button>
            </footer>
        );
    }
}

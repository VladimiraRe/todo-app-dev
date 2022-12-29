import { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Icon from '../icon';
import './task.css';

export default class Task extends Component {
    static defaultProps = {
        isDone: false,
        description: '',
        isEdit: false,
        onDeleted: () => null,
        onCompleted: () => null,
        onEditing: () => null,
    };

    static propTypes = {
        isDone: PropTypes.bool,
        description: PropTypes.string,
        isEdit: PropTypes.bool,
        onDeleted: PropTypes.func,
        onCompleted: PropTypes.func,
        onEditing: PropTypes.func,
    };

    state = {
        created: formatDistanceToNow(this.props.data.created, {
            includeSeconds: true,
        }),
    };

    render() {
        const {
            data: { id, isDone, description },
            isEdit,
            onDeleted,
            onEditing,
            onCompleted,
        } = this.props;
        const { created } = this.state;
        return (
            <div className={`task${isEdit ? ' task--editing' : ''}`}>
                <input
                    onChange={onCompleted}
                    className='task__toggle'
                    type='checkbox'
                    id={`task__toggle${id}`}
                    checked={isDone}
                />
                <label htmlFor={`task__toggle${id}`}>
                    <span className={`task__description${isDone ? ' task__description--done' : ''}`}>
                        {description}
                    </span>
                    <span className='task__created'>created {created}</span>
                </label>
                <Icon type='edit' onClick={onEditing} />
                <Icon type='destroy' onClick={onDeleted} />
            </div>
        );
    }
}

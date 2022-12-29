import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TaskForm from '../task-form';
import './app-header.css';

export default class AppHeader extends PureComponent {
    static propTypes = {
        onAdded: PropTypes.func,
    };

    static defaultProps = {
        onAdded: () => null,
    };

    render() {
        const { onAdded } = this.props;
        return (
            <header className='header'>
                <h1 className='header__title'>todos</h1>
                <TaskForm onSubmit={onAdded} />
            </header>
        );
    }
}

import PropTypes from 'prop-types';

import TaskForm from '../TaskForm';
import './Header.css';

export default function Header({ onAdded }) {
    return (
        <header className='header'>
            <h1 className='header__title'>todos</h1>
            <TaskForm onSubmit={onAdded} />
        </header>
    );
}

Header.propTypes = {
    onAdded: PropTypes.func,
};

Header.defaultProps = {
    onAdded: () => null,
};

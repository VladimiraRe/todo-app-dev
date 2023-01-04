import PropTypes from 'prop-types';
import { v1 as uuidv1 } from 'uuid';

import Button from '../Button';
import './TasksFilter.css';

export default function TasksFilter({ onChange, filter, filterNames }) {
    const btnsArr = filterNames.map((name) => {
        const isSelected = name === filter;
        return (
            <li key={uuidv1()} className='tasksFilter__item'>
                <Button name={name} onClick={() => onChange(name)} isSelected={isSelected} />
            </li>
        );
    });
    return <ul className='tasksFilter'>{btnsArr}</ul>;
}

TasksFilter.defaultProps = {
    onChange: () => {},
    filterNames: ['all'],
    filter: 'all',
};

TasksFilter.propTypes = {
    onChange: PropTypes.func,
    filterNames: PropTypes.arrayOf(PropTypes.string),
    filter: PropTypes.string,
};

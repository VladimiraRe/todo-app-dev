import PropTypes from 'prop-types';

import Button from '../Button';
import './TasksFilter.css';

export default function TasksFilter({ onChange, filter, filterNames }) {
    let key = 1;
    const btnsArr = filterNames.map((name) => {
        const isSelected = name === filter;
        key += 1;
        return (
            <li key={key} className='tasksFilter__item'>
                <Button name={name} onClick={() => onChange(name)} isSelected={isSelected} />
            </li>
        );
    });
    return <ul className='tasksFilter'>{btnsArr}</ul>;
}

TasksFilter.defaultProps = {
    onChange: () => {},
    filterNames: [],
    filter: '',
};

TasksFilter.propTypes = {
    onChange: PropTypes.func,
    filterNames: PropTypes.arrayOf(PropTypes.string),
    filter: PropTypes.string,
};

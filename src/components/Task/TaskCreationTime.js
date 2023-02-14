import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

export default function TaskCreationTime({ created }) {
    const distanceToNow = formatDistanceToNow(created, {
        includeSeconds: true,
    });

    return <span className='task__created'>created {distanceToNow}</span>;
}

TaskCreationTime.defaultProps = {
    created: null,
};

TaskCreationTime.propTypes = {
    created: PropTypes.number,
};

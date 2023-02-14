import PropTypes from 'prop-types';

import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';

import useData from './hooks/useData';
import useFilter from './hooks/useFilter';
import './TodoApp.css';

export default function TodoApp({ initialData }) {
    const { data, addTask, editTask, deleteTask, deleteCompleted, completeTask, changeTimer, tasksLeft, isCanDelete } =
        useData(initialData);

    const { filterNames, filter, setFilter } = useFilter();

    return (
        <section className='todoApp'>
            <Header onAdded={addTask} />
            <section className='todoApp__main'>
                <TaskList
                    data={data}
                    onDeleted={deleteTask}
                    onCompleted={completeTask}
                    onEditing={editTask}
                    onStopTimer={changeTimer}
                    filter={filter}
                    filterNames={filterNames}
                />
                <Footer
                    onChange={(value) => setFilter(value)}
                    filter={filter}
                    onReset={deleteCompleted}
                    tasksLeft={tasksLeft}
                    filterNames={filterNames}
                    disabled={isCanDelete}
                />
            </section>
        </section>
    );
}

TodoApp.defaultProps = {
    initialData: null,
};

TodoApp.propTypes = {
    initialData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            description: PropTypes.string,
            created: PropTypes.number,
            isDone: PropTypes.bool,
            timer: PropTypes.number,
        })
    ),
};

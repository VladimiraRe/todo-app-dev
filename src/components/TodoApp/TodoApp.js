import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { v1 as uuidv1 } from 'uuid';

import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './TodoApp.css';

export default function TodoApp({ startData }) {
    const filterNames = ['all', 'active', 'completed'];

    const [data, setData] = useState(startData);
    const [filter, setFilter] = useState(filterNames[0]);

    const addTask = useCallback((obj) => {
        setData((prevData) => [...prevData, createTask(obj)]);
    }, []);

    const editTask = useCallback((id, obj) => {
        setData((prevData) =>
            prevData.map((task) => {
                if (task.id !== id) return task;
                return { ...task, ...obj };
            })
        );
    }, []);

    const deleteTask = useCallback((id) => {
        setData((prevData) => prevData.filter((task) => task.id !== id));
    }, []);

    const deleteCompleted = useCallback(() => {
        setData((prevData) => prevData.filter((task) => !task.isDone));
    }, []);

    const completeTask = useCallback((id) => {
        setData((prevData) =>
            prevData.map((task) => {
                if (task.id !== id) return task;
                return { ...task, isDone: !task.isDone };
            })
        );
    }, []);

    const changeTimer = useCallback((id, value) => {
        setData((prevData) =>
            prevData.map((task) => {
                if (task.id !== id) return task;
                return { ...task, timer: value };
            })
        );
    }, []);

    const doneTasks = data.filter((el) => el.isDone).length;
    const tasksLeft = data.length - doneTasks;
    const isCanDelete = doneTasks === 0;

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

function createTask(obj) {
    return {
        id: uuidv1(),
        created: new Date().getTime(),
        isDone: false,
        ...obj,
    };
}

TodoApp.defaultProps = {
    startData: [1, 2, 3].map(() => createTask({ description: 'Add your task or edit this one', timer: 745 })),
};

TodoApp.propTypes = {
    startData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            description: PropTypes.string,
            created: PropTypes.number,
            isDone: PropTypes.bool,
            timer: PropTypes.number,
        })
    ),
};

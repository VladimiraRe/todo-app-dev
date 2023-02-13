import { useState, useCallback } from 'react';
import { v1 as uuidv1 } from 'uuid';

export default function useData(initialData) {
    const [data, setData] = useState(
        initialData || [1, 2, 3].map(() => createTask({ description: 'Add your task or edit this one', timer: 745 }))
    );

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

    return {
        data,
        addTask,
        editTask,
        deleteTask,
        deleteCompleted,
        completeTask,
        changeTimer,
        tasksLeft,
        isCanDelete,
    };
}

function createTask(obj) {
    return {
        id: uuidv1(),
        created: new Date().getTime(),
        isDone: false,
        ...obj,
    };
}

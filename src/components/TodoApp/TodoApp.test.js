import { fireEvent, render, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { formatTimerToSec } from '../../utils/formatTimer';

import TodoApp from './TodoApp';

const initialTimer = { hours: '', minutes: '12', seconds: '25' };
const initialFormValues = { description: 'task', ...initialTimer };
const initialData = [
    {
        description: initialFormValues.description,
        timer: formatTimerToSec(initialTimer),
        id: '0',
    },
];
const dataForEditing = ['new task', '1', '20', '30'];

describe('TodoApp:', () => {
    test('renders without crashing', () => {
        const { app } = setup();
        expect(app).toBeTruthy();
    });

    test('when the app is launched for the first time it has three tasks as an example', () => {
        const { getTasks } = setup();
        expect(getTasks().length).toBe(3);
    });

    test('task can be edited', async () => {
        const { form } = await startEditing();
        expect(form).toHaveFormValues(initialFormValues);
    });

    test('the edited task is saved when enter is pressed', async () => {
        await checkEditing(dataForEditing, dataForEditing, '[Enter]');
    });

    test('the edited task returns to original value when escape is pressed', async () => {
        await checkEditing(dataForEditing, Object.values(initialFormValues), '[Escape]');
    });

    test('add new task', async () => {
        const { user, addForm, getTasks, getFormInputs } = setup();
        const startLength = getTasks().length;
        await fillInputs(getFormInputs(addForm), dataForEditing, user, '[Enter]');
        expect(getTasks().length).toBe(startLength + 1);
    });

    test('delete task', async () => {
        const { user, getTasks, getTaskBtns } = setup();
        const startTasks = getTasks();
        const [, , deleteBtn] = getTaskBtns(startTasks[0]);
        await user.click(deleteBtn);
        expect(getTasks().length).toBe(startTasks.length - 1);
    });

    test('timer works correctly', async () => {
        const { getTasks, getTaskBtns } = setup();
        const [task] = getTasks();
        const [timerBtn] = getTaskBtns(task);

        const timerInSec = 5;
        const newTimerValue = Object.values(initialTimer);
        newTimerValue[2] = `${newTimerValue[2] - timerInSec}`;

        jest.useFakeTimers();
        fireEvent.click(timerBtn);
        setTimeout(() => fireEvent.click(timerBtn), timerInSec * 1000);
        act(() => jest.advanceTimersByTime(timerInSec * 1000));

        expect(within(task).queryByText(`${+newTimerValue[0]}:${newTimerValue[1]}:${newTimerValue[2]}`)).toBeTruthy();
    });
});

function setup(data) {
    const user = userEvent.setup();
    const app = render(<TodoApp initialData={data} />);
    const addForm = within(app.getByRole('banner')).getByRole('form');
    const taskList = app.getByRole('list', { name: 'task list' });
    const getTasks = () => within(taskList).queryAllByRole('listitem');
    const getTaskBtns = (task) => within(task).queryAllByRole('button');
    const getTaskForm = (task) => within(task).queryByRole('form');
    const getFormInputs = (form) => within(form).queryAllByRole('textbox');
    return { app, user, addForm, taskList, getTasks, getTaskBtns, getTaskForm, getFormInputs };
}

async function startEditing() {
    const { user, getTasks, getTaskBtns, getTaskForm, getFormInputs } = setup(initialData);
    const [task] = getTasks();
    const [, editBtn] = getTaskBtns(task);
    await user.click(editBtn);
    const form = getTaskForm(task);
    return { task, form, getFormInputs, user };
}

async function checkEditing(newData, dataForCheck, key) {
    const { task, form, getFormInputs, user } = await startEditing();
    const inputs = getFormInputs(form);
    await fillInputs(inputs, newData, user, key, true);
    expect(within(task).queryByText(dataForCheck[0])).toBeTruthy();
    expect(within(task).queryByText(`${+dataForCheck[1]}:${dataForCheck[2]}:${dataForCheck[3]}`)).toBeTruthy();
}

async function fillInputs(inputs, data, user, key, withClear) {
    if (withClear) {
        for (let i = 0; i < inputs.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            await user.clear(inputs[i]);
        }
    }
    for (let i = 0; i < inputs.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        await user.type(inputs[i], data[i]);
    }
    if (key) {
        fireEvent.focus(inputs[0]);
        await user.keyboard(key);
    }
}

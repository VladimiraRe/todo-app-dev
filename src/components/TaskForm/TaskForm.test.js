import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TaskForm from './TaskForm';

describe('TaskForm:', () => {
    function setup(startValue) {
        const onSubmit = jest.fn();
        const finishEditing = jest.fn();
        const taskForm = render(<TaskForm startValue={startValue} onSubmit={onSubmit} finishEditing={finishEditing} />);

        const [textInput, ...timerInputs] = taskForm.getAllByRole('textbox');

        const user = userEvent.setup();
        const typeTextInput = async (text) => {
            await user.type(textInput, text);
        };
        const typeTimerInputs = async (timer) => {
            for (let i = 0; i < timerInputs.length; i++) {
                // eslint-disable-next-line no-await-in-loop
                await user.type(timerInputs[i], timer[i]);
            }
        };
        const clearTextInput = async () => {
            await user.clear(textInput);
        };
        const clearTimerInputs = async () => {
            for (let i = 0; i < timerInputs.length; i++) {
                // eslint-disable-next-line no-await-in-loop
                await user.clear(timerInputs[i]);
            }
        };
        const submit = async () => {
            fireEvent.focus(textInput);
            await user.keyboard('[Enter]');
        };

        return {
            textInput,
            timerInputs,
            typeTextInput,
            typeTimerInputs,
            clearTextInput,
            clearTimerInputs,
            onSubmit,
            finishEditing,
            submit,
            user,
        };
    }

    async function completedForm() {
        const { textInput, timerInputs, typeTextInput, typeTimerInputs, user, submit } = setup();
        const text = 'learn jest';
        const timer = ['1', '20', '30'];
        await typeTextInput(text);
        await typeTimerInputs(timer);
        return { textInput, timerInputs, text, timer, user, submit };
    }

    test('data input', async () => {
        const { textInput, timerInputs, text, timer } = await completedForm();
        expect(textInput).toHaveValue(text);
        timerInputs.forEach((input, id) => expect(input).toHaveValue(timer[id]));
    });

    test('correct timer display when min and sec over 60', async () => {
        const { timerInputs, typeTimerInputs } = setup();
        const inputValue = ['1', '567', '619'];
        const outputValue = ['1', '07', '19'];
        await typeTimerInputs(inputValue);
        timerInputs.forEach((input, id) => expect(input).toHaveValue(outputValue[id]));
    });

    test('only numbers can be entered in the timer field', async () => {
        const { timerInputs, typeTimerInputs } = setup();
        const invalidTimer = ['Abc', '-!:', '#$12'];
        const outputValue = ['', '', '12'];
        await typeTimerInputs(invalidTimer);
        timerInputs.forEach((input, id) => expect(input).toHaveValue(outputValue[id]));
    });

    test('can submit form with task but without timer', async () => {
        const { typeTextInput, onSubmit, submit } = setup();
        await typeTextInput('learn jest');
        await submit();
        expect(onSubmit).toBeCalled();
    });

    test("can't submit form with empty field for task", async () => {
        const { typeTimerInputs, onSubmit, submit } = setup();
        const timer = ['1', '20', '30'];
        await typeTimerInputs(timer);
        await submit();
        expect(onSubmit).not.toBeCalled();
    });

    test('clearing the completed form when empty start value and the Escape is pressed', async () => {
        const { textInput, timerInputs, user } = await completedForm();
        await user.keyboard('[Escape]');
        expect(textInput).toHaveValue('');
        timerInputs.forEach((input) => expect(input).toHaveValue(''));
    });

    test('clearing the form after submitting', async () => {
        const { textInput, timerInputs, submit } = await completedForm();
        await submit();
        expect(textInput).toHaveValue('');
        timerInputs.forEach((input) => expect(input).toHaveValue(''));
    });
});

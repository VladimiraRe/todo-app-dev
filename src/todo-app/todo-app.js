import { Component } from 'react';
import PropTypes from 'prop-types';

import AppHeader from '../app-header';
import TaskList from '../task-list';
import Footer from '../footer';
import './todo-app.css';

export default class TodoApp extends Component {
    maxId = 100;

    filterNames = ['all', 'active', 'completed'];

    static defaultProps = {
        data: [97, 98, 99].map((id) => ({
            id,
            description: 'Add your task or edit this one',
            created: new Date().getTime(),
            isDone: false,
        })),
    };

    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                description: PropTypes.string,
                created: PropTypes.number,
                isDone: PropTypes.bool,
            })
        ),
    };

    state = {
        data: this.props.data,
        filter: this.filterNames[0],
        checked: [],
    };

    createTask = (description) => {
        this.maxId += 1;
        return {
            id: this.maxId,
            description,
            created: new Date().getTime(),
            isDone: false,
        };
    };

    addTask = (description) => {
        this.setState(({ data }) => ({
            data: [...data, this.createTask(description)],
        }));
    };

    editTask = (id, description) => {
        this.setState(({ data }) => {
            const inx = data.findIndex((el) => el.id === id);
            return {
                data: [...data.slice(0, inx), { ...data[inx], description }, ...data.slice(inx + 1)],
            };
        });
    };

    deleteTask = (id) => {
        this.setState(({ data, checked }) => {
            const dataInx = data.findIndex((el) => el.id === id);
            const checkedInx = checked.findIndex((el) => el === id);
            return {
                data: [...data.slice(0, dataInx), ...data.slice(dataInx + 1)],
                checked: [...checked.slice(0, checkedInx), ...checked.slice(checkedInx + 1)],
            };
        });
    };

    deleteCompleted = () => {
        this.setState(({ data, checked }) => {
            const newData = data.filter((el) => !el.isDone);
            const newChecked = checked.filter((id) => newData.find((el) => el.id === id) === -1);
            return { data: newData, checked: newChecked };
        });
    };

    completeTask = (id) => {
        this.setState(({ data, checked }) => {
            const dataInx = data.findIndex((el) => el.id === id);
            const checkedInx = checked.findIndex((el) => el === id);
            return {
                data: [
                    ...data.slice(0, dataInx),
                    { ...data[dataInx], isDone: !data[dataInx].isDone },
                    ...data.slice(dataInx + 1),
                ],
                checked:
                    checkedInx !== -1
                        ? [...checked.slice(0, checkedInx), ...checked.slice(checkedInx + 1)]
                        : [...checked, id],
            };
        });
    };

    changeFilter = (value) => {
        this.setState({ filter: value });
    };

    render() {
        const { data, filter, checked } = this.state;
        const tasksLeft = data.filter((el) => !el.isDone).length;
        return (
            <section className='todoApp'>
                <AppHeader onAdded={this.addTask} />
                <section className='todoApp__main'>
                    <TaskList
                        data={data}
                        onDeleted={this.deleteTask}
                        onCompleted={this.completeTask}
                        onEditing={this.editTask}
                        filter={filter}
                        filterNames={this.filterNames}
                        checked={checked}
                    />
                    <Footer
                        onChange={this.changeFilter}
                        filter={filter}
                        onReset={this.deleteCompleted}
                        tasksLeft={tasksLeft}
                        filterNames={this.filterNames}
                    />
                </section>
            </section>
        );
    }
}

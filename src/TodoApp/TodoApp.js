import { Component } from 'react';
import PropTypes from 'prop-types';
import { v1 as uuidv1 } from 'uuid';

import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './TodoApp.css';

export default class TodoApp extends Component {
    static createTask = (description) => {
        return {
            id: uuidv1(),
            description,
            created: new Date().getTime(),
            isDone: false,
        };
    };

    static defaultProps = {
        data: [1, 2, 3].map(() => TodoApp.createTask('Add your task or edit this one')),
    };

    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                description: PropTypes.string,
                created: PropTypes.number,
                isDone: PropTypes.bool,
            })
        ),
    };

    filterNames = ['all', 'active', 'completed'];

    state = {
        data: this.props.data,
        filter: this.filterNames[0],
        checked: [],
    };

    addTask = (description) => {
        this.setState(({ data }) => ({
            data: [...data, TodoApp.createTask(description)],
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
        this.setState(({ data }) => {
            const inx = data.findIndex((el) => el.id === id);
            return {
                data: [...data.slice(0, inx), ...data.slice(inx + 1)],
            };
        });
    };

    deleteCompleted = () => {
        this.setState(({ data }) => {
            return { data: data.filter((el) => !el.isDone) };
        });
    };

    completeTask = (id) => {
        this.setState(({ data }) => {
            const inx = data.findIndex((el) => el.id === id);
            return {
                data: [...data.slice(0, inx), { ...data[inx], isDone: !data[inx].isDone }, ...data.slice(inx + 1)],
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
                <Header onAdded={this.addTask} />
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

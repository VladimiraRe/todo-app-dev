import { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './TodoApp.css';

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

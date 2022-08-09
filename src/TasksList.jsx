import { Component } from 'react';
import Task from './Task';
import CreateTaskInput from './CreateTaskInput';
import TaskService from './server';



class TasksList extends Component {


    taskService = new TaskService();


    state = {
        tasks: []
    }

    componentDidMount() {
        this.taskService.getTaskList().then(res => {
            this.setState({
                tasks: res
            });
        });
    }

    onCreate = textValue => {
        const newTask = {
            text: textValue,
            done: false,
            id: Math.random()
        };

        this.taskService.postTask(newTask).then(res => {
            if (res.ok){
                this.taskService.getTaskList().then(res => {
                    this.setState({
                        tasks: res
                    });
                });
            }
            else{
                throw new Error("Failed to create task");
            }
        })
    }

    toggleCheckbox = id => {
        const task = this.state.tasks.find(task => task.id === id);
        this.taskService.updateTask(task).then(res => {
            if (res.ok){
                this.taskService.getTaskList().then(res => {
                    this.setState({
                        tasks: res
                    });
                });
            }
            else{
                throw new Error("Failed to update task");
            }
        })
    }

    onDelete = id => {
        const taskToDelete = this.state.tasks.find(task => task.id === id);
        this.taskService.deleteTask(taskToDelete.id)
        .then(res => {
            if (res.ok){
                this.taskService.getTaskList().then(res => {
                    this.setState({
                        tasks: res
                    });
                });
            }
            else{
                throw new Error("Task delete failed");
            }
        })
    }

    render(){
        const sortedList = this.state.tasks.slice().sort((curElem, nextElem) => curElem.done - nextElem.done)
        return (
            <div className='todo-list'>
                <CreateTaskInput onCreate={this.onCreate}/>
                <ul className="list">
                    {sortedList.map(task => (
                        <Task key={task.id} {...task} toggleCheckbox={this.toggleCheckbox} onDelete={this.onDelete}/>
                    ))}
                </ul>
            </div>
        );
    }

}

export default TasksList;
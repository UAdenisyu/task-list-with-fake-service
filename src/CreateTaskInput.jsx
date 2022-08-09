import { Component } from 'react';

class CreateTaskInput extends Component {
    
    state = {
        inputText: ''
    }

    updateData = ({target}) => {
        this.setState({
            inputText: target.value
        })
    }

    createTask = () => {
        const { inputText } = this.state;
        if (inputText !== '') {
            this.props.onCreate(inputText);
            this.setState({ inputText: '' });
        }
    }

    render() {
        return (
            <div className='create-task'>
                <input
                        type="text"
                        className='create-task__input'
                        onChange={this.updateData}
                        value={this.state.inputText}/>
                <button className="btn create-task__btn" onClick={this.createTask}>Create</button>
            </div>
        );
    }
}

export default CreateTaskInput;
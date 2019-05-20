import React, {useState} from 'react';

const Todo = props => {
    const [todoName, setTodoName] = useState(''); //provide initial state value, this will return an array whose 0 index is having value
                                     // and first index is having a function
    const [todoList, setTodoList] = useState([]);

    // const [todoState, setTodoState] = useState({userInput: ' ', todoList: []});

    // const inputChangeHandler = event =>{
    //     setTodoState({
    //         userInput:event.target.value,
    //         todoList:todoState.todoList});
    // };

    // const todoAddHandler = () => {
    //     setTodoState({
    //         userInput:todoState.userInput,
    //         todoList:todoState.todoList.concat(todoState.userInput)});
    // }

    const inputChangeHandler = event =>{
        setTodoName(event.target.value);
    }

    const todoAddHandler = () => {
        setTodoList(todoList.concat(todoName));
    }

    return(
        <React.Fragment>
            <input 
                type="text" 
                placeholder="Todo"
                value={todoName}
                onChange={inputChangeHandler} 
            />
            <button 
                type="button"
                onClick={todoAddHandler}
            >
                Add</button>
            <ul>
                {todoList.map(todo => <li key={todo}>{todo}</li>)}
            </ul>
        </React.Fragment>
    )
};

export default Todo;
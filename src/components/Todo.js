import React, {useState, useEffect} from 'react';
import axios from 'axios';

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


    //useEffect we get triggered on every render of the component
    // we pass [] then react will not look for any change of data in the component and useEffect will be called only once
    // we pass the state whose change, useEffect should be called. in this case
    // for every element change useEffect will be called.
    useEffect(() => {
        axios.get('https://test-a1537.firebaseio.com/todos.json').then(result => {
            console.log(result);
            const todoData = result.data;
            const todo = [];
            for(const key in todoData){
                todo.push({id: key, name:todoData[key].name})
            }
            setTodoList(todo);
        })
    }, []);

    const inputChangeHandler = event =>{
        setTodoName(event.target.value);
    }

    const todoAddHandler = () => {
        setTodoList(todoList.concat(todoName));
        axios.post('https://test-a1537.firebaseio.com/todos.json',{name:todoName})
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
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
                {todoList.map(todo => <li key={todo.id}>{todo.name}</li>)}
            </ul>
        </React.Fragment>
    )
};

export default Todo;
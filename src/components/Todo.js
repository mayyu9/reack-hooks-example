import React, {useState, useEffect, useReducer, useRef} from 'react';
import axios from 'axios';

const Todo = props => {
    //const [todoName, setTodoName] = useState(''); //provide initial state value, this will return an array whose 0 index is having value
                                     // and first index is having a function
    //const [todoList, setTodoList] = useState([]);

    //const [submittedTodo, setSubmittedTodo] = useState(null); // fix the delay problem

    const todoInputRef = useRef();

    const todoReducer = (state, action) => {
        switch(action.type){
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter( (todo) => todo.id !== action.payload);
            default:
                return state;
        }
    };

    const [todoList, dispatch] = useReducer(todoReducer, []);

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
            //setTodoList(todo);
            dispatch({type: 'SET', payload:todo});
        });

        // return a callback function, this will trigger everytime useEffect gets applied.
        // first react will execute this cleanup function then it will apply the useEffect hook.
        return () => {
            console.log('cleanup');
        };
    }, []);

    // useEffect( () => {
    //     if(submittedTodo){ // avoid error on first time execution
    //         //setTodoList(todoList.concat(submittedTodo))
    //         dispatch({type: 'ADD', payload:submittedTodo})
    //     }
    // },[submittedTodo])

    // const inputChangeHandler = event =>{
    //     setTodoName(event.target.value);
    // }

    //problem: here when we add simultaneously 2 todos and assume backend takes little time then ui will reflect last added todo
    //reason: as Addhandler function is clouser it holds the todolist will comprises of old values only hence thise issue.
    const todoAddHandler = () => {
        const todoName = todoInputRef.current.value;
        axios.post('https://test-a1537.firebaseio.com/todos.json',{name:todoName})
            .then(res => {
                const todoItem = {id: res.data.name, name: todoName}
                //setTodoList(todoList.concat(todoItem));
                //setSubmittedTodo(todoItem);
                dispatch({type: 'ADD', payload:todoItem});
            })
            .catch(err => console.log(err));
    }

    const removeHandler = (todoId) => {
        axios.delete(`https://test-a1537.firebaseio.com/todos/${todoId}.json`)
            .then(res => {
                dispatch({type: 'REMOVE', payload:todoId})
            })
            .catch(err => {
                console.log(err);
            })
    }

    return(
        <React.Fragment>
            {/* <input 
                type="text" 
                placeholder="Todo"
                value={todoName}
                onChange={inputChangeHandler} 
            /> */}
             <input 
                type="text" 
                placeholder="Todo"
                ref={todoInputRef}
            />
            <button 
                type="button"
                onClick={todoAddHandler}
            >
                Add</button>
            <ul>
                {todoList.map(todo => 
                    <li 
                        key={todo.id}
                        onClick={removeHandler.bind(this,todo.id)}
                    >{todo.name}</li>)}
            </ul>
        </React.Fragment>
    )
};

export default Todo;
import { useContext } from 'react';

import {MyContext} from '../../context/MyContext';
import TodoItem from '../TodoItem/TodoItem';

import './ToDoList.scss';

const ToDolist = () => {
    const {state} = useContext(MyContext);
    return (
        <div className="todolist">
            <h2 className="todolist_title">{state.length !== 0 ? 'Your tasks to complete' : null}</h2>
            <ul className='todolist_list'>
                {state.length !== 0 ? state.map(item => {
                    return <TodoItem text={item.task} data={item.data} id={item.id} key={item.id}/>
                }) : null}
            </ul>
        </div>
    )
}

export default ToDolist;
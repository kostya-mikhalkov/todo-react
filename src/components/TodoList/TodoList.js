
import TodoItem from '../TodoItem/TodoItem';

import './ToDoList.scss';

const ToDolist = () => {
    return (
        <div className="todolist">
            <h2 className="todolist_title">Your tasks to complete</h2>
            <ul className='todolist_list'>
                <TodoItem />
            </ul>
        </div>
    )
}

export default ToDolist;
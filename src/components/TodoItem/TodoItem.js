import { useState, useContext } from 'react';

import { MyContext } from '../../context/MyContext';
import '../TodoItem/TodoItem.scss';

const TodoItem = ({text, data, id}) => {
    const [completed, setCompleted] = useState(false);
    const [editTask, setEditTask] = useState(text);
    const [edit, setEdit] = useState(false);
    const {setState} = useContext(MyContext);

    const editTaskChange = (e) => {
        setEditTask(e.target.value);
      };

    const saveTask = () => {
        setState((state) =>
            state.map((item) =>
            item.id === id ? { ...item, task: editTask } : item
            )
        );
    };

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            saveTask()
        }
    }
    

    return (
        <li className={`todolist_flex ${completed ? "completed" : null}`}
            id={id}>
            <label className="custom-checkbox">
                <input type="checkbox" 
                       checked={completed} 
                       onChange={() => setCompleted(!completed)}/>
                <span className="checkmark"></span>
            </label>
            {!edit ? <div className={`todolist_item_descr ${completed ? 'todolist_item_descr__complete' : null}`}>{text}</div> : 
                     <input className='todolist_item_descr'
                            onChange={(e) => editTaskChange(e)}
                            onKeyDown={handleKey}/>}
            <div className='todolist_item_date'>
                <h6 className='todolist_item_date_descr'>{data ? 'End time' : 'No execution time'}</h6>
                <span className='todolist_item_date_time'>{data}</span>
            </div>
            <button type="button"
                    className='edit_btn'
                    onClick={() => {
                            saveTask()
                            setEdit(!edit)}}></button>
            <button type="button"
                    className='delete_btn'></button>
        </li>
    )
}

export default TodoItem;
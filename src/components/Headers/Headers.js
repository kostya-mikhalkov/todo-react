import { useState, useContext } from 'react';
import uuid from 'react-uuid';

import DatePicker from 'react-datepicker';
import { MyContext } from '../../context/MyContext';

import 'react-datepicker/dist/react-datepicker.css';
import '../Headers/Headers.scss';

const Headers = () => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [task, setTask] = useState("");
    const {setState} = useContext(MyContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const regexp = /[A-Za-zА-Яа-я0-9.-]+/;
        if (!regexp.test(task)) {
            setTask("");
            return;
        }
        setState(state => [...state, {task, id: uuid()}]);
        setTask("");
    };

    return (
        <div className='header'
             onSubmit={handleSubmit}>
            <h1 className='header_title'>To Do list</h1>
            <form className="task">
                <label htmlFor="addTask"
                       className="task_label">Add a new task</label>
                <input type="text"
                       name="addTask"
                       required
                       className="task_input"
                       value={task}
                       onChange={e => setTask(e.target.value)}/>
                <button className="calendar"
                        onClick={() => setShowDatePicker(!showDatePicker)}></button>
                <button className="task_button"
                        type="submit">
                </button>
                {showDatePicker ? <DatePicker 
                          onChange={() => setShowDatePicker(false)}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Выберите дату завершения"/> : null}
            </form>
        </div>
    )
}

export default Headers;
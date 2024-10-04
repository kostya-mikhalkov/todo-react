import { useState, useContext, useRef, useEffect } from 'react';
import uuid from 'react-uuid';

import DatePicker from 'react-datepicker';
import { MyContext } from '../../context/MyContext';

import 'react-datepicker/dist/react-datepicker.css';
import '../Headers/Headers.scss';

const Headers = () => {
    const [datePicker, setDatePicker] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [task, setTask] = useState("");
    const {setState} = useContext(MyContext);
    const datePickerRef = useRef(null);
    const refBtn = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                datePickerRef.current && 
                !datePickerRef.current.contains(e.target) && 
                refBtn.current && 
                !refBtn.current.contains(e.target)
            ) {
                setShowDatePicker(false); 
                console.dir(refBtn.current)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const regexp = /[A-Za-zА-Яа-я0-9.-]+/;
        if (!regexp.test(task)) {
            setTask("");
            return;
        }
        setState(state => [...state, {task, id: uuid(), data: formatedDate(datePicker)}]);
        setTask("");
        setDatePicker("");
    };
    const handleChange = (date) => {
        setShowDatePicker(false);
        setDatePicker(date);
    }

    const formatedDate = (date) => {
        if (date === "") {
            return undefined;
        }
        const newDate = new Date(date);
        const day = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        
        return `${day}.${month}.${year}`;
    }

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
                        type="button"
                        ref={refBtn}
                        onClick={() => setShowDatePicker(!showDatePicker)}></button>
                <button className="task_button"
                        type="submit">
                </button>
                {showDatePicker ?   <div className="datepicker-wrapper"
                                         ref={datePickerRef}>
                                                <DatePicker onChange={handleChange}
                                                            selected={datePicker}
                                                            inline
                                                />
                                    </div> : null}
            </form>
        </div>
    )
}


export default Headers;
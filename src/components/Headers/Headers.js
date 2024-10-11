import { useState, useContext, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import uuid from 'react-uuid';

import DatePicker from 'react-datepicker';
import { MyContext } from '../../context/MyContext';

import complete_icon from '../../assets/complete-icon.png';
import 'react-datepicker/dist/react-datepicker.css';
import '../Headers/Headers.scss';

const Headers = () => {
    const [datePicker, setDatePicker] = useState("");
    const [taskIcon, setTaskIcon] = useState(false);
    const [dateIcon, setDateIcon] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [task, setTask] = useState("");
    const {state, setState} = useContext(MyContext);
    const datePickerRef = useRef(null);
    const refBtn = useRef(null);

    useEffect(() => {
        const arr = JSON.parse(localStorage.getItem('obj'));
        if (arr && arr.length >= 1) {
            setState(state => [...state, ...arr]);
        }
    }, [setState]);

    useEffect(() => {
        localStorage.setItem('obj', JSON.stringify(state));
    }, [state])

    const dateNow = (dataCalendar) => {
        const dataBoolean = new Date() < dataCalendar;
        return dataBoolean;
    }

    useEffect(() => {
        setTaskIcon(task !== "");
        setDateIcon(datePicker !== "");
    }, [task, datePicker]);

    useEffect(() => {
        if (!dateNow(datePicker)) {
            setDatePicker("");
        }
    }, [datePicker])

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
                {task ? <CSSTransition in={taskIcon}
                                       timeout={800}
                                       classNames="icon"
                                       unmountOnExit>
                            <img src={complete_icon}
                                className='icon_complete_input' 
                                alt="icon"/>
                        </CSSTransition> : null}
                <input type="text"
                       name="addTask"
                       required
                       className="task_input"
                       value={task}
                       onChange={e => setTask(e.target.value)}/>
                {datePicker ? <CSSTransition in={dateIcon}
                                       timeout={800}
                                       classNames="icon"
                                       unmountOnExit>
                            <img src={complete_icon}
                                 className='icon_complete' 
                                 alt="icon"/>
                        </CSSTransition>: null}
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
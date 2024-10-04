
import Headers from '../Headers/Headers';
import ToDolist from '../TodoList/TodoList';

import '../TodoApp/TodoApp.scss';

const TodoApp = () => {
    return (
        <div className="todo">
            <Headers />
            <ToDolist />
        </div>
    )
}

export default TodoApp;
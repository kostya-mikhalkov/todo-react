import { useState } from "react";

import { MyContext } from "./context/MyContext";
import TodoApp from "./components/TodoApp/TodoApp";

function App() {
  const [state, setState] = useState("");
  return (
    <div className="App">
      <MyContext.Provider value={{state, setState}}>
        <TodoApp />
      </MyContext.Provider>
    </div>
  );
}

export default App;

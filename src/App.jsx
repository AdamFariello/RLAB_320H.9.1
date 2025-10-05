import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import initTaskList from "./todos/example.mjs"


function DisplayTODO() {
    return(<>
      <input type="checkbox"></input>
      New entry
      {/*TODO: add onClick property*/}
      <button>Edit</button>
      <button>Delete</button>
    </>) 
}

function listReducer(state, action) {
  switch (action.type) {

      default: {
        throw Error("Unknown Action: " + action.type);
      }
  }
}


function App() { 
  //console.log(initialState)
  const [task, setTask] = useState("");
  const [taskList, dispatcher] = useReducer()

  //console.log(task);

  return (<>
      <h2>Create TODO List</h2>
      <div>
        <input text="type" value={task} placeholder="Enter Task" 
          onChange={(e) => setTask(e.target.value)}    
        />
        {/*TODO: add onClick property*/}
        <button>Add</button>
      </div>
      <DisplayTODO />
  </>);
}

export default App

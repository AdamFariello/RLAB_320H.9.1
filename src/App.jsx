import { useState, useReducer } from 'react'
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

function listReducer(state, {type, payload: {name}}) {
  switch (type) {
      case "addTask":
        console.log(name);
        break;
      default: {
        throw Error("Unknown Action: " + type);
      }
  }
}

function Button({children, onClick, className}) {
  return <button onClick={onClick} className={"button " + className}>
    {children}
  </button>
}


function App() { 
  const [task, setTask] = useState("");
  const [taskList, dispatch] = useReducer(listReducer, initTaskList)

  //console.log(taskList);

  return (<>
      <h2>Create TODO List</h2>
      <div>
        <input text="type" value={task} placeholder="Enter Task" 
          onChange={(e) => setTask(e.target.value)}    
        />
        {/*TODO: add onClick property*/}
        {/*TODO: check if you can't send a function as a property for HTML components, (unlike React)*/}
        <button 
          onClick={() => dispatch({type: "addTask", payload: {task} })}
        >Add</button>
      </div>
      <DisplayTODO />
  </>);
}

export default App

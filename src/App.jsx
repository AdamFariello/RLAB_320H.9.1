import { useState, useReducer } from 'react'
import './App.css'

import initTaskList from "./todos/example.mjs"


function DisplayTask({taskListEntry}) {
    return(<>
      <div style={{ width: "100%", textAlign: "center", marginBottom: "0px" }}>
        <input type="checkbox"></input>
        {taskListEntry.title}
        {/*TODO: add onClick property*/}
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </>) 
}

function listReducer(state, {type, payload: {task}}) {
  switch (type) {
      case "addTask":
        if (task) { //TODO: make it so it uses largest id # + 1 instead
          const newTask = {
            "userId": 1,
            "id": initTaskList.length + 1,
            "title": task,
            "completed": false
          }
          return [...state, newTask]; 
        }
        return state;
      default: {
        throw Error("Unknown Action: " + type);
      }
  }
}

function Button({children, className, dispatch, type, payload}) {
  //console.log(payload)
  return <button 
    onClick={() => dispatch({type: type, payload: payload })}
    className={"button " + className}>
    {children}
  </button>
}


function App() { 
  const [task, setTask] = useState("");
  const [taskList, dispatch] = useReducer(listReducer, initTaskList)
  const taskListEntries = taskList.map((taskEntry) => {
    return <DisplayTask key={taskEntry.id} taskListEntry={taskEntry} />
  });

  return (<>
      <h2>Create TODO List</h2>
      <div>
        <input text="type" value={task} placeholder="Enter Task" 
          onChange={(e) => setTask(e.target.value)}    
        />
        <button onClick={() => dispatch({type: "addTask", payload: {task} })}>
          Add
        </button>
      </div>
      <div>
        {taskListEntries}
      </div>
  </>);
}

export default App

import { useState, useReducer } from 'react'
import './App.css'

import initTaskList from "./todos/example.mjs"


function DisplayTask({taskListEntry, dispatch}) {
    return(<>
      <div style={{ width: "100%", textAlign: "center", marginBottom: "0px" }}>
        <input type="checkbox"></input>
        {taskListEntry.title}
        {/*TODO: add onClick property*/}
        <button>Edit</button>
        <button onClick={() => dispatch({type:"deleteTask", payload:{task:taskListEntry}})}>
          Delete
        </button>
      </div>
    </>) 
}

function listReducer(taskList, {type, payload: {task}}) {
  switch (type) {
      case "addTask":
        if (task) { //TODO: make it so it uses largest id # + 1 instead
          const newTask = {
            "userId": 1,
            "id": taskList.length + 1,
            "title": task,
            "completed": false
          }
          return [...taskList, newTask]; 
        }
        return taskList;
      case "deleteTask":
          // "Takes 20 lines of assembly code to format a hard drive"
          // "It only takes 5 to delete a file"
          // -- spanska, 1997 
          return taskList.filter((t) => t.id != task.id);
      default: {
        throw Error("Unknown Action: " + type);
        return taskList;
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
  const [isReverse, setReverse] = useState(true); 

  //TODO: add a reverse list function (lmao in what time left?) nvm
  let taskListEntries;
  if (isReverse) {
    //toReverse so it doesn't change state 
    //https://stackoverflow.com/questions/36415904/is-there-a-way-to-use-map-on-an-array-in-reverse-order-with-javascript#36415958
    taskListEntries = taskList.toReversed().map((taskEntry) => { 
      return <DisplayTask key={taskEntry.id} taskListEntry={taskEntry} dispatch={dispatch}/>
    });
  } else {
    taskListEntries = taskList.map((taskEntry) => { 
      return <DisplayTask key={taskEntry.id} taskListEntry={taskEntry} dispatch={dispatch}/>
    });
  }
  

  return (<>
      <h2>Create TODO List</h2>
      <div>
        <input text="type" value={task} placeholder="Enter Task" 
          onChange={(e) => setTask(e.target.value)}    
        />
        <button onClick={() => dispatch({type: "addTask", payload: {task} })}>
          Add
        </button>
        <button onClick={() => setReverse(!isReverse)}>
          Reverse
        </button>
      </div>
      <div>
        {taskListEntries}
      </div>
  </>);
}

export default App

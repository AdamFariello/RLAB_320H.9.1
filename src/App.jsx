import { useState, useReducer } from 'react'
import './App.css'

import initTaskList from "./todos/example.mjs"

{/*TODO: pass state to this funciton, and put the hook on the function below*/}
function DisplayTaskLine({isBeingEdited, taskEntry}) {
  const [task, setTask] = useState(taskEntry);

  if (isBeingEdited) {
    console.log("edit mode for: ", taskEntry)
    return(<>
      <input text="type" value={task}  
        onChange={(e) => setTask(e.target.value)}>
      </input>
    </>)         
  } else {
    //return {taskListEntry.title}
    return (taskEntry);
  }
}

function DisplayTask({taskListEntry, dispatch}) {
    const [isDelAllow, setDelAllow] = useState(false);
    const [isBeingEdited, setEdit] = useState(false);
    
    
    const [task, setTask] = useState(taskListEntry.title);
    let displayTaskLine;
    if (isBeingEdited) {
      displayTaskLine = <>
        <input text="type" value={task}  
          onChange={(e) => setTask(e.target.value)}>
        </input>
      </>;
    } else {
      displayTaskLine = task; 
    }

    
    return(<>
      {/*TODO: Make it so you can only edit one line at a time*/}
      
      <div style={{ width: "100%", textAlign: "center", marginBottom: "0px" }}>
        <input type="checkbox" onClick={() => setDelAllow(!isDelAllow)}>
        </input>

        {/*
        <DisplayTaskLine isBeingEdited={isBeingEdited} taskEntry={taskListEntry.title} />      
        */}

        {displayTaskLine}

        {/*TODO: add onClick property*/}
        <button onClick={() => {
          if (isBeingEdited) {
            setEdit(!isBeingEdited);
            if (task != taskListEntry.title) {
              dispatch({type:"editTask", payload:{task:taskListEntry, newTask:task}});
              //setTask(taskListEntry.title); //TODO: figure out how to re-render to make this value only reflect the value stored
            }
          } else {
            setEdit(!isBeingEdited);
          }
        }}>
          Edit
        </button>
        <button 
          onClick={() => 
            dispatch({type:"deleteTask", payload:{task:taskListEntry, isAllow:isDelAllow}})
          }
          style={{
            visibility: isDelAllow? "visible" : "hidden"
          }}
        >
          Delete
        </button>
      </div>
    </>) 
}

function listReducer(taskList, {type, payload: {task, isAllow, newTask}}) { //TODO: get rid of payload word
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
          if (isAllow) {
            return taskList.filter((t) => t.id != task.id);
          } else {
            return taskList;
          }
      case "editTask": 
        return taskList.map((t) => {
          if (t.id == task.id) {
            t.title = newTask;
          } 
          return t
        });
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

  console.log(taskList)

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
          {isReverse ? "sort by old instead" : "sort by new instead"}
        </button>
      </div>
      <div>
        {taskListEntries}
      </div>
  </>);
}

export default App

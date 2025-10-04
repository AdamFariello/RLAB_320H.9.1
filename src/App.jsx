import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (<>
      <h2>Create TODO List</h2>
      <div>
        <input text="type" placeholder="Enter Task"></input>
        {/*TODO: add onClick property*/}
        <button>Add</button>
      </div>
  </>)
}

export default App

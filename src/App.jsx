import TaskForm from './components/TaskForm'
import TaskListWithTimer from './components/TaskListWithTimer'
import ProgressTracker from './components/ProgressTracker'
import ProductivityDashboard from './components/ProductivityDashboard'
import './Style.css'
import { useEffect, useState } from 'react'


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks))
  });

  const addTask = (task)=>{
    const newTask = { 
      ...task, 
      timeLogged: 0,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask])
  }

  const updateTask = (updatedTask, index)=>{
    const newtask = [...tasks];
    newtask[index] = updatedTask;
    setTasks(newtask);
  }

  const deleteTask = (index)=>{
    setTasks(tasks.filter((_, i) => i !=index))
  }

  const handleTimeLogged = (taskIndex, minutes) => {
    const updatedTask = { ...tasks[taskIndex] };
    updatedTask.timeLogged = (updatedTask.timeLogged || 0) + minutes;
    updateTask(updatedTask, taskIndex);
  }

  const clearTasks = () => {
    setTasks([]);
  }
 
  return (
    <div className='App'>
      <header className='app-header'>
        <img src="/logo.png" alt="Planurday Logo" className="app-logo" />
        <div className="app-header-text">
          <h1 className='title'>Planurday</h1>
          <p className='tagline'>Your friendly Task Manager + Pomodoro Timer</p>
        </div>
      </header>
      
      <div className="nav-buttons">
        <button 
          className={`nav-btn ${!showAnalytics ? 'active' : ''}`}
          onClick={() => setShowAnalytics(false)}
        >
          📋 Tasks
        </button>
        <button 
          className={`nav-btn ${showAnalytics ? 'active' : ''}`}
          onClick={() => setShowAnalytics(true)}
        >
          📊 Analytics
        </button>
      </div>

      {!showAnalytics ? (
        <>
          <TaskForm addTask = {addTask}/>
          <TaskListWithTimer 
            tasks = {tasks} 
            updateTask = {updateTask} 
            deleteTask = {deleteTask}
            onTimeLogged = {handleTimeLogged}
          />
          <ProgressTracker tasks = {tasks}/>
          {tasks.length>0 && (<button onClick={clearTasks} className='clear-btn'>Clear all Tasks</button>)}
        </>
      ) : (
        <ProductivityDashboard tasks = {tasks}/>
      )}
    </div>
  )
}

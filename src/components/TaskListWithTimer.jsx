import PomodoroTimer from './PomodoroTimer'
import { useState } from 'react'

export default function TaskListWithTimer({ tasks, updateTask, deleteTask, onTimeLogged }) {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null)

  const toggleComplete = (index) => {
    const updatedTask = { ...tasks[index], completed: !tasks[index].completed }
    updateTask(updatedTask, index)
  }

  const handleStartTimer = (index) => {
    setSelectedTaskIndex(index)
  }

  const handleCloseTimer = () => {
    setSelectedTaskIndex(null)
  }

  return (
    <>
      <div className='task-list'>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed': ''}>
              <div className="task-info">
                <span>{task.text}</span>
                <small> ({task.priority}, {task.category})</small>
                {task.timeLogged > 0 && (
                  <span className="time-badge">⏱️ {task.timeLogged}min</span>
                )}
              </div>
              <div className="task-actions">
                {!task.completed && (
                  <button 
                    className="timer-btn-task"
                    onClick={() => handleStartTimer(index)}
                    title="Start Pomodoro Timer"
                  >
                    ⏱️ Timer
                  </button>
                )}
                <button onClick={() => toggleComplete(index)} className="complete-btn">
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => deleteTask(index)} className="delete-btn">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedTaskIndex !== null && (
        <PomodoroTimer
          task={tasks[selectedTaskIndex]}
          taskIndex={selectedTaskIndex}
          onTimeLogged={onTimeLogged}
          onClose={handleCloseTimer}
        />
      )}
    </>
  )
}

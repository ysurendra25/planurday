import { useState, useEffect } from 'react'

export default function PomodoroTimer({ task, taskIndex, onTimeLogged, onClose }) {
  const [seconds, setSeconds] = useState(1500) // 25 minutes
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)

  useEffect(() => {
    let interval = null

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(s => s - 1)
      }, 1000)
    } else if (seconds === 0 && isRunning) {
      handleSessionComplete()
    }

    return () => clearInterval(interval)
  }, [isRunning, seconds])

  const handleSessionComplete = () => {
    if (!isBreak) {
      // Work session complete
      setSessionsCompleted(s => s + 1)
      const minutesWorked = 25
      onTimeLogged(taskIndex, minutesWorked)
      
      // Start break
      setIsBreak(true)
      setSeconds(300) // 5 minute break
      setIsRunning(false)
      alert('🎉 Great work! Take a 5-minute break.')
    } else {
      // Break complete
      setIsBreak(false)
      setSeconds(1500) // Reset to 25 minutes
      setIsRunning(false)
      alert('Break over! Ready for another session?')
    }
  }

  const toggleTimer = () => setIsRunning(!isRunning)

  const resetTimer = () => {
    setSeconds(isBreak ? 300 : 1500)
    setIsRunning(false)
  }

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60)
    const s = secs % 60
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="pomodoro-modal">
      <div className="pomodoro-content">
        <h2>⏱️ Pomodoro Timer</h2>
        <p className="task-name">{task.text}</p>
        
        <div className="timer-display">
          <h1 className={isBreak ? 'break-time' : 'work-time'}>
            {formatTime(seconds)}
          </h1>
          <p className="timer-status">{isBreak ? '☕ Break Time' : '💼 Work Time'}</p>
        </div>

        <div className="timer-controls">
          <button 
            className="timer-btn play-btn"
            onClick={toggleTimer}
          >
            {isRunning ? '⏸ Pause' : '▶ Start'}
          </button>
          <button 
            className="timer-btn reset-btn"
            onClick={resetTimer}
          >
            🔄 Reset
          </button>
          <button 
            className="timer-btn close-btn"
            onClick={onClose}
          >
            ✕ Close
          </button>
        </div>

        <div className="sessions-info">
          <p>Sessions Completed: <strong>{sessionsCompleted}</strong></p>
          <p>Time Logged: <strong>{sessionsCompleted * 25} min</strong></p>
        </div>
      </div>
    </div>
  )
}

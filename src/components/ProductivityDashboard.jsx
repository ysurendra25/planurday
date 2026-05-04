import { useState } from 'react'

export default function ProductivityDashboard({ tasks }) {
  const [timeView, setTimeView] = useState('category') // 'category' or 'priority'

  const calculateTotalTime = () => {
    return tasks.reduce((total, task) => total + (task.timeLogged || 0), 0)
  }

  const calculateTimeByCategory = () => {
    const categories = {}
    tasks.forEach(task => {
      if (!categories[task.category]) {
        categories[task.category] = 0
      }
      categories[task.category] += task.timeLogged || 0
    })
    return categories
  }

  const calculateTimeByPriority = () => {
    const priorities = {}
    tasks.forEach(task => {
      if (!priorities[task.priority]) {
        priorities[task.priority] = 0
      }
      priorities[task.priority] += task.timeLogged || 0
    })
    return priorities
  }

  const calculateCompletionRate = () => {
    if (tasks.length === 0) return 0
    const completed = tasks.filter(t => t.completed).length
    return Math.round((completed / tasks.length) * 100)
  }

  const calculateAvgTimePerTask = () => {
    if (tasks.length === 0) return 0
    const totalTime = calculateTotalTime()
    return Math.round(totalTime / tasks.length)
  }

  const timeByCategory = calculateTimeByCategory()
  const timeByPriority = calculateTimeByPriority()
  const totalTime = calculateTotalTime()
  const completionRate = calculateCompletionRate()
  const avgTime = calculateAvgTimePerTask()

  const getMaxValue = () => {
    const currentData = timeView === 'category' ? timeByCategory : timeByPriority
    return Math.max(...Object.values(currentData), 1)
  }

  const currentData = timeView === 'category' ? timeByCategory : timeByPriority
  const maxValue = getMaxValue()

  return (
    <div className="productivity-dashboard">
      <h2>📊 Productivity Analytics</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Time Logged</span>
          <span className="stat-value">{totalTime} min</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Completion Rate</span>
          <span className="stat-value">{completionRate}%</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Avg Time/Task</span>
          <span className="stat-value">{avgTime} min</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{tasks.length}</span>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-controls">
          <button
            className={`chart-btn ${timeView === 'category' ? 'active' : ''}`}
            onClick={() => setTimeView('category')}
          >
            By Category
          </button>
          <button
            className={`chart-btn ${timeView === 'priority' ? 'active' : ''}`}
            onClick={() => setTimeView('priority')}
          >
            By Priority
          </button>
        </div>

        <div className="chart">
          {Object.entries(currentData).length > 0 ? (
            Object.entries(currentData).map(([name, value]) => (
              <div key={name} className="chart-bar-container">
                <label className="chart-label">{name}</label>
                <div className="chart-bar-wrapper">
                  <div
                    className="chart-bar"
                    style={{ width: `${(value / maxValue) * 100}%` }}
                  >
                    <span className="bar-value">{value}min</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No time data yet. Start a Pomodoro session!</p>
          )}
        </div>
      </div>

      <div className="productivity-tips">
        {/* <h3>💡 Tips</h3>
        <ul>
          <li>Use Pomodoro timer for focused work sessions</li>
          <li>Average {avgTime}min per task - stay consistent</li>
          <li>Complete more high-priority tasks first</li>
          <li>Take breaks after each 25-min session</li>
        </ul> */}
        <h2>***Thank You for Visiting,Explore more with us***</h2>
      </div>
    </div>
  )
}

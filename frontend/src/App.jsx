import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Tracker from './pages/Tracker.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-6">
          <span className="font-bold text-lg text-indigo-600">JobAgent</span>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium ${isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-800'}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/tracker"
            className={({ isActive }) =>
              `text-sm font-medium ${isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-800'}`
            }
          >
            Tracker
          </NavLink>
        </nav>
        <main className="max-w-6xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tracker" element={<Tracker />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

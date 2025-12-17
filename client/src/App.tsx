import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import MakePicksPage from './pages/MakePicksPage'
import LeaguesPage from './pages/LeaguesPage'
import LeaderboardPage from './pages/LeaderboardPage'
import RaceSchedulePage from './pages/RaceSchedulePage'
import ScoringBreakdownPage from './pages/ScoringBreakdownPage'
import HistoryPage from './pages/HistoryPage'
import AuthPage from './pages/AuthPage'

type PageId =
  | 'home'
  | 'make-picks'
  | 'leagues'
  | 'leaderboard'
  | 'schedule'
  | 'scoring'
  | 'history'
  | 'auth'

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'make-picks':
        return <MakePicksPage />
      case 'leagues':
        return <LeaguesPage />
      case 'leaderboard':
        return <LeaderboardPage />
      case 'schedule':
        return <RaceSchedulePage />
      case 'scoring':
        return <ScoringBreakdownPage />
      case 'history':
        return <HistoryPage />
      case 'auth':
        return <AuthPage />
      case 'home':
      default:
        return <HomePage />
    }
  }

  return (
    <div className="app-shell">
      <header>
        <h1>P10 Pick</h1>
        <nav>
          <button type="button" onClick={() => setCurrentPage('home')}>
            Home
          </button>
          <button type="button" onClick={() => setCurrentPage('make-picks')}>
            Make Picks
          </button>
          <button type="button" onClick={() => setCurrentPage('leagues')}>
            Leagues
          </button>
          <button type="button" onClick={() => setCurrentPage('leaderboard')}>
            Leaderboard
          </button>
          <button type="button" onClick={() => setCurrentPage('schedule')}>
            Race Schedule
          </button>
          <button type="button" onClick={() => setCurrentPage('scoring')}>
            Scoring Breakdown
          </button>
          <button type="button" onClick={() => setCurrentPage('history')}>
            History
          </button>
          <button type="button" onClick={() => setCurrentPage('auth')}>
            Sign In
          </button>
        </nav>
      </header>

      {renderPage()}
    </div>
  )
}

export default App

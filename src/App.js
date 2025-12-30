import React, { useState } from 'react';
import { Brain, LogOut } from 'lucide-react';
import LoginScreen from './components/LoginScreen';
import Navigation from './components/Navigation';
import GameSelection from './components/GameSelection';
import TestScreen from './components/TestScreen';
import ResultsScreen from './components/ResultsScreen';
import HistoryView from './components/HistoryView';
import AccountInfo from './components/AccountInfo';
import Progression from './components/Progression';
import { createOrLoginUser, loadUserHistory, saveResult } from './utils/storage';

const App = () => {
  const [appState, setAppState] = useState('login'); // login, dashboard, playing, finished
  const [currentView, setCurrentView] = useState('games'); // games, history, account, progression
  const [currentUser, setCurrentUser] = useState(null);
  const [userHistory, setUserHistory] = useState([]);
  const [results, setResults] = useState(null);

  const handleLogin = async (name, age, gender) => {
    const user = await createOrLoginUser(name, age, gender);
    if (user) {
      setCurrentUser(user);
      setAppState('dashboard');
      loadHistory(user.id);
    }
  };

  const loadHistory = async (userId) => {
    const history = await loadUserHistory(userId);
    setUserHistory(history);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAppState('login');
    setCurrentView('games');
    setUserHistory([]);
  };

  const handleSelectGame = (gameId) => {
    if (gameId === 'nback') {
      setAppState('playing');
    }
  };

  const handleTestComplete = async (resultData) => {
    setResults(resultData);
    if (currentUser) {
      await saveResult(currentUser.id, currentUser.name, currentUser.age, currentUser.gender, resultData);
      await loadHistory(currentUser.id);
    }
    setAppState('finished');
  };

  const handleBackToDashboard = () => {
    setAppState('dashboard');
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const handleUpdateUser = async (updatedUser) => {
    await createOrLoginUser(updatedUser.name, updatedUser.age, updatedUser.gender);
    setCurrentUser(updatedUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-4xl w-full border border-gray-100">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-2xl">
              <Brain className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Memory Test</h1>
          </div>
          
          {appState === 'dashboard' && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-lg">Logout</span>
            </button>
          )}
        </div>

        {appState === 'login' && <LoginScreen onLogin={handleLogin} />}

        {appState === 'dashboard' && (
          <>
            <Navigation currentView={currentView} onNavigate={handleNavigate} />
            
            {currentView === 'games' && <GameSelection onSelectGame={handleSelectGame} />}
            {currentView === 'history' && <HistoryView userHistory={userHistory} onBack={() => handleNavigate('games')} />}
            {currentView === 'account' && <AccountInfo currentUser={currentUser} onUpdateUser={handleUpdateUser} />}
            {currentView === 'progression' && <Progression userHistory={userHistory} />}
          </>
        )}

        {appState === 'playing' && (
          <TestScreen onTestComplete={handleTestComplete} />
        )}

        {appState === 'finished' && results && (
          <ResultsScreen 
            results={results}
            onBackToDashboard={handleBackToDashboard}
          />
        )}
      </div>
    </div>
  );
};

export default App;
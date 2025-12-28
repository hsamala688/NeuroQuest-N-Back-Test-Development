import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import TestScreen from './components/TestScreen';
import ResultsScreen from './components/ResultsScreen';
import HistoryView from './components/HistoryView';
import { createOrLoginUser, loadUserHistory, saveResult } from './utils/storage';

const App = () => {
  const [appState, setAppState] = useState('login'); // login, dashboard, playing, finished
  const [currentUser, setCurrentUser] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [userHistory, setUserHistory] = useState([]);
  const [results, setResults] = useState(null);

  const handleLogin = async (name, age) => {
    const user = await createOrLoginUser(name, age);
    if (user) {
      setCurrentUser(user);
      setAppState('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAppState('login');
    setShowHistory(false);
  };

  const handleStartTest = () => {
    setAppState('playing');
    setShowHistory(false);
  };

  const handleViewHistory = async () => {
    if (currentUser) {
      const history = await loadUserHistory(currentUser.id);
      setUserHistory(history);
      setShowHistory(true);
    }
  };

  const handleTestComplete = async (resultData) => {
    setResults(resultData);
    if (currentUser) {
      await saveResult(currentUser.id, currentUser.name, currentUser.age, resultData);
    }
    setAppState('finished');
  };

  const handleBackToDashboard = () => {
    setAppState('dashboard');
    setShowHistory(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl w-full border border-gray-100">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="bg-blue-100 p-3 rounded-2xl">
            <Brain className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Memory Test</h1>
        </div>

        {appState === 'login' && <LoginScreen onLogin={handleLogin} />}

        {appState === 'dashboard' && !showHistory && (
          <Dashboard 
            currentUser={currentUser}
            onStartTest={handleStartTest}
            onViewHistory={handleViewHistory}
            onLogout={handleLogout}
          />
        )}

        {appState === 'dashboard' && showHistory && (
          <HistoryView 
            userHistory={userHistory}
            onBack={() => setShowHistory(false)}
          />
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
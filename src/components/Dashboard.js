import React from 'react';
import { LogOut, History } from 'lucide-react';

const Dashboard = ({ currentUser, onStartTest, onViewHistory, onLogout }) => {
  return (
    <div className="space-y-8">
      <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-100 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Hello, {currentUser.name}!</h2>
          <p className="text-gray-600 text-lg">Age: {currentUser.age}</p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-lg">Logout</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={onStartTest}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-8 px-8 rounded-2xl text-2xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Start New Test
        </button>

        <button
          onClick={onViewHistory}
          className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-8 px-8 rounded-2xl text-2xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
        >
          <History className="w-8 h-8" />
          View History
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
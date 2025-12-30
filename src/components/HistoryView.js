import React from 'react';
import { ArrowLeft } from 'lucide-react';

const HistoryView = ({ userHistory, onBack }) => {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-lg">Back to Dashboard</span>
      </button>
      {userHistory.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-gray-200">
          <p className="text-gray-600 text-xl">No test results yet. Take your first test!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {userHistory.map((result, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{result.accuracy}%</p>
                  <p className="text-gray-600 text-lg">{result.nBack}-Back Test</p>
                </div>
                <p className="text-gray-500 text-lg">
                  {new Date(result.timestamp).toLocaleDateString()} {new Date(result.timestamp).toLocaleTimeString()}
                </p>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-xl font-bold text-green-700">{result.hits}</p>
                  <p className="text-xs text-green-600">Hits</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                  <p className="text-xl font-bold text-red-700">{result.misses}</p>
                  <p className="text-xs text-red-600">Misses</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                  <p className="text-xl font-bold text-orange-700">{result.falseAlarms}</p>
                  <p className="text-xs text-orange-600">False</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <p className="text-xl font-bold text-slate-700">{result.correctRejections}</p>
                  <p className="text-xs text-slate-600">Correct</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
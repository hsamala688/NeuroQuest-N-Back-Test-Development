import React from 'react';

const ResultsScreen = ({ results, onBackToDashboard }) => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-10 text-center border-2 border-blue-200 shadow-lg">
        <div className="text-7xl font-bold text-blue-600 mb-3">
          {results.accuracy}%
        </div>
        <div className="text-gray-700 text-2xl font-semibold">
          Overall Accuracy ({results.nBack}-Back Test)
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200 shadow-md">
          <div className="text-4xl font-bold text-green-700 mb-2">{results.hits}</div>
          <div className="text-lg font-semibold text-green-600">Correct Matches</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200 shadow-md">
          <div className="text-4xl font-bold text-red-700 mb-2">{results.misses}</div>
          <div className="text-lg font-semibold text-red-600">Missed Matches</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200 shadow-md">
          <div className="text-4xl font-bold text-orange-700 mb-2">{results.falseAlarms}</div>
          <div className="text-lg font-semibold text-orange-600">False Alarms</div>
        </div>
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border-2 border-slate-200 shadow-md">
          <div className="text-4xl font-bold text-slate-700 mb-2">{results.correctRejections}</div>
          <div className="text-lg font-semibold text-slate-600">Correct Rejections</div>
        </div>
      </div>

      <button
        onClick={onBackToDashboard}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 px-8 rounded-2xl text-3xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ResultsScreen;
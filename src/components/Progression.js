import React from 'react';
import { TrendingUp, Award, Target, Calendar } from 'lucide-react';

const Progression = ({ userHistory }) => {
  // Calculate stats
  const totalTests = userHistory.length;
  const avgAccuracy = totalTests > 0
    ? (userHistory.reduce((sum, test) => sum + test.accuracy, 0) / totalTests).toFixed(1)
    : 0;
  
  const recentTests = userHistory.slice(0, 5);
  const bestScore = totalTests > 0
    ? Math.max(...userHistory.map(test => test.accuracy))
    : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Progress</h2>

      {totalTests === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-gray-200">
          <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-xl">Take your first test to see your progress!</p>
        </div>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
              <Calendar className="w-10 h-10 text-blue-600 mb-3" />
              <p className="text-4xl font-bold text-blue-600 mb-1">{totalTests}</p>
              <p className="text-gray-600 text-lg font-semibold">Tests Taken</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
              <TrendingUp className="w-10 h-10 text-green-600 mb-3" />
              <p className="text-4xl font-bold text-green-600 mb-1">{avgAccuracy}%</p>
              <p className="text-gray-600 text-lg font-semibold">Average Score</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border-2 border-yellow-200">
              <Award className="w-10 h-10 text-yellow-600 mb-3" />
              <p className="text-4xl font-bold text-yellow-600 mb-1">{bestScore}%</p>
              <p className="text-gray-600 text-lg font-semibold">Best Score</p>
            </div>
          </div>

          {/* Recent Performance */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Recent Performance</h3>
            <div className="space-y-3">
              {recentTests.map((test, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <div>
                    <p className="text-lg font-bold text-gray-800">{test.accuracy}%</p>
                    <p className="text-sm text-gray-600">
                      {test.nBack}-Back | {new Date(test.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                      {test.hits} hits
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">
                      {test.misses} misses
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Progression;
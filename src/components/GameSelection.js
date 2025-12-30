import React from 'react';
import { Brain, Music, Target, Zap } from 'lucide-react';

const GameSelection = ({ onSelectGame }) => {
  const games = [
    {
      id: 'nback',
      name: 'N-Back Test',
      description: 'Test your working memory',
      icon: Brain,
      color: 'blue',
      available: true
    },
    {
      id: 'rhythm',
      name: 'Rhythm Memory',
      description: 'Coming soon',
      icon: Music,
      color: 'purple',
      available: false
    },
    {
      id: 'spatial',
      name: 'Spatial Memory',
      description: 'Coming soon',
      icon: Target,
      color: 'green',
      available: false
    },
    {
      id: 'speed',
      name: 'Processing Speed',
      description: 'Coming soon',
      icon: Zap,
      color: 'yellow',
      available: false
    }
  ];

  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 border-blue-200 hover:shadow-blue-200',
    purple: 'from-purple-50 to-purple-100 border-purple-200',
    green: 'from-green-50 to-green-100 border-green-200',
    yellow: 'from-yellow-50 to-yellow-100 border-yellow-200'
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Select a Game</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <button
              key={game.id}
              onClick={() => game.available && onSelectGame(game.id)}
              disabled={!game.available}
              className={`bg-gradient-to-br ${colorClasses[game.color]} rounded-2xl p-8 border-2 transition-all shadow-md ${
                game.available
                  ? 'hover:shadow-xl transform hover:scale-105 cursor-pointer'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <Icon className={`w-16 h-16 mx-auto mb-4 text-${game.color}-600`} />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{game.name}</h3>
              <p className="text-gray-600 text-lg">{game.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GameSelection;
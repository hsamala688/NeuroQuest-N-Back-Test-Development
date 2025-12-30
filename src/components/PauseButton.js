import React from 'react';
import { Pause, Play } from 'lucide-react';

const PauseButton = ({ isPaused, onTogglePause }) => {
  return (
    <button
      onClick={onTogglePause}
      className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-xl text-xl transition-all shadow-lg"
    >
      {isPaused ? (
        <>
          <Play className="w-6 h-6" />
          Resume
        </>
      ) : (
        <>
          <Pause className="w-6 h-6" />
          Pause
        </>
      )}
    </button>
  );
};

export default PauseButton;
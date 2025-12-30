import React, { useState, useEffect, useRef } from 'react';
import { Pause } from 'lucide-react';
import PauseButton from './PauseButton';
import { generateSequence, calculateResults, NUM_TRIALS, LETTER_DURATION, BLANK_DURATION } from '../utils/testLogic';

const TestScreen = ({ onTestComplete }) => {
  const [currentLetter, setCurrentLetter] = useState('');
  const [trialIndex, setTrialIndex] = useState(0);
  const [nBack, setNBack] = useState(2);
  const [sequence, setSequence] = useState([]);
  const [responses, setResponses] = useState([]);
  const [showingLetter, setShowingLetter] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const responseWindowRef = useRef(false);
  const currentTrialResponseRef = useRef(false);

  useEffect(() => {
    // Initialize test
    const n = Math.floor(Math.random() * 3) + 1;
    setNBack(n);
    
    const { sequence: seq, matches } = generateSequence(n);
    setSequence(seq);
    setResponses(matches.map(isMatch => ({ expected: isMatch, actual: false })));
  }, []);

  useEffect(() => {
    if (trialIndex >= NUM_TRIALS) {
      const results = calculateResults(responses, NUM_TRIALS);
      onTestComplete({ ...results, nBack });
      return;
    }

    if (isPaused) return;

    responseWindowRef.current = true;
    currentTrialResponseRef.current = false;
    setShowingLetter(true);
    setCurrentLetter(sequence[trialIndex]);

    const letterTimer = setTimeout(() => {
      setShowingLetter(false);
      setCurrentLetter('');
    }, LETTER_DURATION);

    const nextTrialTimer = setTimeout(() => {
      responseWindowRef.current = false;
      setTrialIndex(prev => prev + 1);
    }, LETTER_DURATION + BLANK_DURATION);

    return () => {
      clearTimeout(letterTimer);
      clearTimeout(nextTrialTimer);
    };
  }, [trialIndex, sequence, isPaused, responses, onTestComplete, nBack]);

  const handleResponse = () => {
    if (!responseWindowRef.current || currentTrialResponseRef.current || isPaused) {
      return;
    }
    
    currentTrialResponseRef.current = true;
    setResponses(prev => {
      const updated = [...prev];
      updated[trialIndex] = { ...updated[trialIndex], actual: true };
      return updated;
    });
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (!isPaused) {
          handleResponse();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPaused]);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="text-gray-700 font-semibold text-2xl bg-slate-50 py-4 px-6 rounded-2xl border-2 border-slate-200">
          {nBack}-Back Test | Trial {trialIndex + 1} of {NUM_TRIALS}
        </div>
        
        <PauseButton isPaused={isPaused} onTogglePause={togglePause} />
      </div>
      
      {isPaused ? (
        <div className="flex items-center justify-center h-64 bg-yellow-50 rounded-3xl border-4 border-yellow-200">
          <div className="text-center">
            <Pause className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-700">Test Paused</p>
            <p className="text-xl text-gray-600 mt-2">Click Resume to continue</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl border-4 border-blue-200 shadow-inner">
          {showingLetter && (
            <span className="text-9xl font-bold text-blue-600 animate-pulse">
              {currentLetter}
            </span>
          )}
        </div>
      )}

      <button
        onClick={handleResponse}
        disabled={isPaused}
        className={`w-full font-bold py-8 px-8 rounded-2xl text-4xl transition-all shadow-xl border-4 ${
          isPaused
            ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-700 hover:shadow-2xl active:scale-95'
        }`}
      >
        MATCH
      </button>
      
      <p className="text-center text-gray-600 text-xl font-medium">
        Press SPACE or click button when you see a match
      </p>
    </div>
  );
};

export default TestScreen;
// Test logic and sequence generation

export const LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ'.split('');
export const NUM_TRIALS = 25;
export const LETTER_DURATION = 800;
export const BLANK_DURATION = 1200;
export const MATCH_PROBABILITY = 0.3;

export const generateSequence = (n) => {
  const seq = [];
  const matches = [];
  
  // First n letters can't be matches
  for (let i = 0; i < n; i++) {
    seq.push(LETTERS[Math.floor(Math.random() * LETTERS.length)]);
    matches.push(false);
  }
  
  // Generate remaining trials
  for (let i = n; i < NUM_TRIALS; i++) {
    const shouldMatch = Math.random() < MATCH_PROBABILITY;
    
    if (shouldMatch) {
      seq.push(seq[i - n]);
      matches.push(true);
    } else {
      // Pick a letter that doesn't match n-back
      let letter;
      do {
        letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      } while (letter === seq[i - n]);
      seq.push(letter);
      matches.push(false);
    }
  }
  
  return { sequence: seq, matches };
};

export const calculateResults = (responses, numTrials) => {
  let hits = 0;
  let misses = 0;
  let falseAlarms = 0;
  let correctRejections = 0;

  responses.forEach(({ expected, actual }) => {
    if (expected && actual) hits++;
    else if (expected && !actual) misses++;
    else if (!expected && actual) falseAlarms++;
    else correctRejections++;
  });

  const accuracy = ((hits + correctRejections) / numTrials * 100).toFixed(1);

  return {
    hits,
    misses,
    falseAlarms,
    correctRejections,
    accuracy: parseFloat(accuracy)
  };
};
// Storage utility functions for user and result management

// Check if we're in Claude.ai artifact environment or local development
const isClaudeEnvironment = typeof window !== 'undefined' && window.storage;

export const loadUsers = async () => {
  try {
    if (isClaudeEnvironment) {
      const result = await window.storage.list('user:', false);
      if (result && result.keys) {
        const userPromises = result.keys.map(async (key) => {
          const userData = await window.storage.get(key, false);
          return userData ? JSON.parse(userData.value) : null;
        });
        const loadedUsers = (await Promise.all(userPromises)).filter(u => u !== null);
        return loadedUsers;
      }
    } else {
      // Local development - use localStorage
      const users = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('user:')) {
          const userData = JSON.parse(localStorage.getItem(key));
          users.push(userData);
        }
      }
      return users;
    }
    return [];
  } catch (error) {
    console.log('No existing users found');
    return [];
  }
};

export const createOrLoginUser = async (name, age, gender) => {
  console.log('Creating user with:', { name, age, gender });
  
  const userId = name.toLowerCase().replace(/\s+/g, '_');
  const user = { id: userId, name, age, gender, createdAt: Date.now() };
  
  console.log('User object:', user);
  
  try {
    if (isClaudeEnvironment) {
      const result = await window.storage.set(`user:${userId}`, JSON.stringify(user), false);
      console.log('Storage result:', result);
    } else {
      // Local development - use localStorage
      localStorage.setItem(`user:${userId}`, JSON.stringify(user));
      console.log('Saved to localStorage');
    }
    return user;
  } catch (error) {
    console.error('Error saving user:', error);
    console.error('Error details:', error.message);
    return null;
  }
};

export const loadUserHistory = async (userId) => {
  try {
    if (isClaudeEnvironment) {
      const result = await window.storage.list(`result:${userId}:`, false);
      if (result && result.keys) {
        const historyPromises = result.keys.map(async (key) => {
          const resultData = await window.storage.get(key, false);
          return resultData ? JSON.parse(resultData.value) : null;
        });
        const history = (await Promise.all(historyPromises))
          .filter(r => r !== null)
          .sort((a, b) => b.timestamp - a.timestamp);
        return history;
      }
    } else {
      // Local development - use localStorage
      const history = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(`result:${userId}:`)) {
          const resultData = JSON.parse(localStorage.getItem(key));
          history.push(resultData);
        }
      }
      return history.sort((a, b) => b.timestamp - a.timestamp);
    }
    return [];
  } catch (error) {
    console.log('No history found');
    return [];
  }
};

export const saveResult = async (userId, userName, userAge, userGender, resultData) => {
  const timestamp = Date.now();
  const resultKey = `result:${userId}:${timestamp}`;
  const dataToSave = {
    ...resultData,
    timestamp,
    userName,
    userAge,
    userGender
  };
  
  try {
    if (isClaudeEnvironment) {
      await window.storage.set(resultKey, JSON.stringify(dataToSave), false);
    } else {
      // Local development - use localStorage
      localStorage.setItem(resultKey, JSON.stringify(dataToSave));
    }
    return true;
  } catch (error) {
    console.error('Error saving result:', error);
    return false;
  }
};
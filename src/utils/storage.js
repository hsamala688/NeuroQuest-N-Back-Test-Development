// Storage utility functions for user and result management

export const loadUsers = async () => {
  try {
    const result = await window.storage.list('user:', false);
    if (result && result.keys) {
      const userPromises = result.keys.map(async (key) => {
        const userData = await window.storage.get(key, false);
        return userData ? JSON.parse(userData.value) : null;
      });
      const loadedUsers = (await Promise.all(userPromises)).filter(u => u !== null);
      return loadedUsers;
    }
    return [];
  } catch (error) {
    console.log('No existing users found');
    return [];
  }
};

export const createOrLoginUser = async (name, age) => {
  const userId = name.toLowerCase().replace(/\s+/g, '_');
  const user = { id: userId, name, age, createdAt: Date.now() };
  
  try {
    await window.storage.set(`user:${userId}`, JSON.stringify(user), false);
    return user;
  } catch (error) {
    console.error('Error saving user:', error);
    return null;
  }
};

export const loadUserHistory = async (userId) => {
  try {
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
    return [];
  } catch (error) {
    console.log('No history found');
    return [];
  }
};

export const saveResult = async (userId, userName, userAge, resultData) => {
  const timestamp = Date.now();
  const resultKey = `result:${userId}:${timestamp}`;
  const dataToSave = {
    ...resultData,
    timestamp,
    userName,
    userAge
  };
  
  try {
    await window.storage.set(resultKey, JSON.stringify(dataToSave), false);
    return true;
  } catch (error) {
    console.error('Error saving result:', error);
    return false;
  }
};
import React, { use, useState } from 'react';
import { User } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && age) {
      onLogin(name.trim(), parseInt(age), gender);
    }
  };

  return (
    <div className="text-center space-y-8">
      <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-100">
        <User className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h2>
        <p className="text-gray-600 text-lg">Enter your information to begin</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-left text-gray-700 text-xl font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label className="block text-left text-gray-700 text-xl font-semibold mb-2">
            Age
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
            placeholder="Enter your age"
            min="1"
            max="120"
            required
          />
        </div>

        <div>
          <label className="block text-left text-gray-700 text-xl font-semibold mb-2">
            Gender Assigned at Birth
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-6 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-8 rounded-2xl text-2xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
import React, { useState } from 'react';
import { User, Edit2, Save, X } from 'lucide-react';

const AccountInfo = ({ currentUser, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [age, setAge] = useState(currentUser.age);
  const [gender, setGender] = useState(currentUser.gender);

  const handleSave = () => {
    onUpdateUser({ ...currentUser, name, age, gender });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(currentUser.name);
    setAge(currentUser.age);
    setGender(currentUser.gender);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Account Information</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
          >
            <Edit2 className="w-5 h-5" />
            Edit
          </button>
        )}
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-blue-200 p-4 rounded-full">
            <User className="w-12 h-12 text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{currentUser.name}</h3>
            <p className="text-gray-600">Member since {new Date(currentUser.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-lg font-semibold mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-lg font-semibold mb-2">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                min="1"
                max="120"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-lg font-semibold mb-2">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-blue-200">
              <span className="text-gray-600 text-lg font-semibold">Name:</span>
              <span className="text-gray-800 text-lg">{currentUser.name}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-blue-200">
              <span className="text-gray-600 text-lg font-semibold">Age:</span>
              <span className="text-gray-800 text-lg">{currentUser.age}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-blue-200">
              <span className="text-gray-600 text-lg font-semibold">Gender:</span>
              <span className="text-gray-800 text-lg capitalize">{currentUser.gender}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600 text-lg font-semibold">User ID:</span>
              <span className="text-gray-800 text-lg">{currentUser.id}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountInfo;
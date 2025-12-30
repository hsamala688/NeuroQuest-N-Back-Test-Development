import React from 'react';
import { Brain, History, User, TrendingUp, Gamepad2 } from 'lucide-react';

const Navigation = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'history', label: 'History', icon: History },
    { id: 'account', label: 'Account', icon: User },
    { id: 'progression', label: 'Progress', icon: TrendingUp },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`p-6 rounded-2xl font-bold text-xl transition-all shadow-md ${
              isActive
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
            }`}
          >
            <Icon className="w-8 h-8 mx-auto mb-2" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default Navigation;
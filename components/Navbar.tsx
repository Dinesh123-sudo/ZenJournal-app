
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#2D5A27] rounded-lg flex items-center justify-center text-white font-bold">
            Z
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight font-serif">ZenJournal</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <div className="hidden md:block text-sm text-gray-600">
                Welcome back, <span className="font-semibold text-gray-800">{user.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-[#2D5A27] transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-[#2D5A27] text-white text-sm font-bold rounded-xl hover:bg-[#1E3E1A] transition-all">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

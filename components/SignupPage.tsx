
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });

      if (authError) throw authError;
      
      // Supabase usually requires email confirmation in real projects, 
      // but session might be auto-created depending on settings.
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 px-4">
      <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#2D5A27] rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
            Z
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-serif">Create Account</h1>
          <p className="text-gray-500">Start your journey of self-reflection.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-[#2D5A27]/20 focus:ring-4 focus:ring-[#2D5A27]/5 transition-all outline-none text-gray-900"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-[#2D5A27]/20 focus:ring-4 focus:ring-[#2D5A27]/5 transition-all outline-none text-gray-900"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-[#2D5A27]/20 focus:ring-4 focus:ring-[#2D5A27]/5 transition-all outline-none text-gray-900"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 bg-[#2D5A27] text-white font-bold rounded-2xl hover:bg-[#1E3E1A] transition-all transform active:scale-[0.98] shadow-lg shadow-green-900/10 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-500 text-sm">
          Already have an account? <Link to="/login" className="text-[#2D5A27] font-bold hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

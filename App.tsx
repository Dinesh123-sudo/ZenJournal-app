
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthState, User } from './types';
import { supabase } from './services/supabaseClient';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import EntryEditor from './components/EntryEditor';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuth({
          user: {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User'
          },
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        setAuth(prev => ({ ...prev, isLoading: false }));
      }
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth({
          user: {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User'
          },
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        setAuth({ user: null, isAuthenticated: false, isLoading: false });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAF9]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2D5A27]"></div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-[#F8FAF9]">
        <Navbar user={auth.user} onLogout={logout} />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={auth.isAuthenticated ? <Dashboard userId={auth.user?.id || ''} /> : <LandingPage />} 
            />
            <Route 
              path="/login" 
              element={!auth.isAuthenticated ? <LoginPage /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!auth.isAuthenticated ? <SignupPage /> : <Navigate to="/" />} 
            />
            <Route 
              path="/entry/new" 
              element={auth.isAuthenticated ? <EntryEditor userId={auth.user?.id || ''} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/entry/edit/:id" 
              element={auth.isAuthenticated ? <EntryEditor userId={auth.user?.id || ''} /> : <Navigate to="/login" />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-100">
          <div className="container mx-auto px-4">
            <p className="mb-2 font-serif font-bold text-gray-500">ZenJournal</p>
            <p>&copy; {new Date().getFullYear()} Your thoughts, securely grounded with Supabase.</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;

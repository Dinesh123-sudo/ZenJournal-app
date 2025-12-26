
import React from 'react';
import { Link } from 'react-router-dom';
import { ICONS } from '../constants';

const LandingPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <div className="inline-block px-4 py-1.5 mb-6 bg-[#E8F3E9] text-[#2D5A27] rounded-full text-sm font-bold tracking-wide">
          ✨ Powered by Gemini AI
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 font-serif leading-tight">
          Write your way to a <br />
          <span className="text-[#2D5A27]">calmer mind.</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          ZenJournal combines the ancient practice of journaling with modern AI insights to help you understand your patterns and grow.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/signup" 
            className="px-8 py-4 bg-[#2D5A27] text-white rounded-2xl font-bold text-lg hover:bg-[#1E3E1A] transition-all transform hover:-translate-y-1 shadow-xl shadow-green-900/20 w-full sm:w-auto text-center"
          >
            Start Your Free Journal
          </Link>
          <Link 
            to="/login" 
            className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all w-full sm:w-auto text-center"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 py-20 border-t border-gray-100">
        <div className="p-8 bg-white rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-[#E8F3E9] text-[#2D5A27] rounded-2xl flex items-center justify-center mb-6">
            <ICONS.Sparkles />
          </div>
          <h3 className="text-xl font-bold mb-3 font-serif">AI Reflections</h3>
          <p className="text-gray-500 leading-relaxed">
            Get instant mood analysis and thoughtful insights on every entry you write, helping you see the bigger picture.
          </p>
        </div>

        <div className="p-8 bg-white rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-[#F3E8E8] text-red-700 rounded-2xl flex items-center justify-center mb-6">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h3 className="text-xl font-bold mb-3 font-serif">Privacy First</h3>
          <p className="text-gray-500 leading-relaxed">
            Your thoughts are personal. Everything is stored securely and accessible only to you.
          </p>
        </div>

        <div className="p-8 bg-white rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-[#E8EDF3] text-blue-700 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h3 className="text-xl font-bold mb-3 font-serif">Daily Prompts</h3>
          <p className="text-gray-500 leading-relaxed">
            Stuck? Our rotating mindful prompts give you a starting point for deeper self-reflection.
          </p>
        </div>
      </section>

      {/* Decorative Image/Mockup Area */}
      <section className="bg-[#2D5A27] rounded-[3rem] p-12 md:p-20 text-center text-white mb-20 overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif">Clear your head, <br />one word at a time.</h2>
          <p className="text-green-100 mb-8 max-w-xl mx-auto">
            Join thousands of others using ZenJournal to manage stress and improve mental clarity through consistent reflection.
          </p>
          <Link to="/signup" className="inline-block px-10 py-4 bg-white text-[#2D5A27] font-bold rounded-2xl hover:bg-gray-100 transition-colors">
            Get Started for Free
          </Link>
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-800 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-green-900 rounded-full opacity-50 blur-3xl"></div>
      </section>
    </div>
  );
};

export default LandingPage;

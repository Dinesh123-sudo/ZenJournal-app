
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { JournalEntry } from '../types';
import { storageService } from '../services/storageService';
import { ICONS } from '../constants';

interface DashboardProps {
  userId: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEntries = async () => {
      setIsLoading(true);
      try {
        const loadedEntries = await storageService.getEntries(userId);
        setEntries(loadedEntries);
      } catch (err) {
        console.error("Failed to load entries", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadEntries();
  }, [userId]);

  const moodStats = useMemo(() => {
    const counts: Record<string, number> = {};
    entries.forEach(e => {
      if (e.mood) counts[e.mood] = (counts[e.mood] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  }, [entries]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    // Stop the event from bubbling up to the card's onClick
    e.stopPropagation();
    e.preventDefault();
    
    console.log(`Attempting to delete entry: ${id}`);
    
    if (window.confirm('Are you sure you want to delete this entry? This action is permanent.')) {
      try {
        await storageService.deleteEntry(id);
        setEntries(prev => prev.filter(e => e.id !== id));
        console.log(`Successfully removed ${id} from state`);
      } catch (err) {
        console.error("Delete operation failed:", err);
        alert('Failed to delete entry. Please check your connection or permissions.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#2D5A27]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-2 h-2 bg-[#2D5A27] rounded-full"></div>
          </div>
        </div>
        <p className="text-gray-400 font-medium mt-6 animate-pulse">Opening your sanctuary...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-bold text-gray-900 mb-3 font-serif">Daily Reflections</h1>
          <p className="text-gray-500 text-lg">Your safe space for thoughts and growth.</p>
        </div>
        <Link 
          to="/entry/new" 
          className="inline-flex items-center px-8 py-4 bg-[#2D5A27] text-white font-bold rounded-2xl hover:bg-[#1E3E1A] transition-all transform hover:-translate-y-1 shadow-xl shadow-green-900/20 active:scale-95"
        >
          <ICONS.Add />
          <span className="ml-2">New Reflection</span>
        </Link>
      </div>

      {entries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="md:col-span-3 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex items-center justify-between overflow-hidden relative">
            <div>
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Mood Overview</h4>
              <div className="flex flex-wrap gap-3">
                {moodStats.length > 0 ? moodStats.map(([mood, count]) => (
                  <div key={mood} className="flex items-center bg-[#E8F3E9] px-4 py-2 rounded-xl border border-green-100">
                    <span className="font-bold text-[#2D5A27]">{mood}</span>
                    <span className="ml-2 text-xs bg-white text-[#2D5A27] px-2 py-0.5 rounded-full font-bold shadow-sm">{count}</span>
                  </div>
                )) : (
                  <p className="text-gray-400 text-sm italic">Add insights to see your mood trends.</p>
                )}
              </div>
            </div>
            <div className="hidden lg:block opacity-5 absolute right-4 bottom-4 scale-150">
               <ICONS.Sparkles />
            </div>
          </div>
          <div className="bg-[#2D5A27] rounded-[2.5rem] p-8 text-white shadow-lg shadow-green-900/10 flex flex-col justify-center">
            <div className="text-3xl font-bold mb-1">{entries.length}</div>
            <div className="text-sm text-green-100 uppercase tracking-widest font-bold">Total Entries</div>
          </div>
        </div>
      )}

      {entries.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-100 rounded-[3rem] p-20 text-center">
          <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-[#2D5A27] transition-transform hover:rotate-12 duration-500">
            <ICONS.Sparkles />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-serif">A clean slate awaits.</h2>
          <p className="text-gray-500 mb-10 max-w-sm mx-auto leading-relaxed">
            Begin your journey of self-discovery today. Every word is a step towards a clearer mind.
          </p>
          <Link 
            to="/entry/new" 
            className="inline-block px-10 py-4 bg-[#2D5A27] text-white font-bold rounded-2xl hover:bg-[#1E3E1A] transition-all shadow-lg shadow-green-900/10"
          >
            Create Your First Entry
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.map((entry) => (
            <div 
              key={entry.id}
              onClick={() => navigate(`/entry/edit/${entry.id}`)}
              className="group bg-white p-8 rounded-[2.5rem] border border-gray-50 hover:border-[#2D5A27]/20 hover:shadow-2xl hover:shadow-gray-200/40 transition-all cursor-pointer flex flex-col relative"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="px-3 py-1 bg-gray-50 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-400 border border-gray-100">
                  {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <button 
                  type="button"
                  onClick={(e) => handleDelete(entry.id, e)}
                  className="relative z-20 p-2 text-gray-300 hover:text-red-500 transition-all rounded-xl hover:bg-red-50 active:scale-90"
                  title="Delete Entry"
                >
                  <ICONS.Trash />
                </button>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#2D5A27] transition-colors mb-4 font-serif line-clamp-1">
                {entry.title || "Untitled Reflection"}
              </h3>
              
              <p className="text-gray-500 line-clamp-4 mb-8 leading-relaxed text-sm">
                {entry.content}
              </p>

              <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex gap-2">
                  {entry.mood && (
                    <span className="px-3 py-1 bg-[#E8F3E9] text-[#2D5A27] rounded-full text-[10px] font-bold tracking-tight">
                      {entry.mood}
                    </span>
                  )}
                </div>
                <div className="text-[#2D5A27] opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

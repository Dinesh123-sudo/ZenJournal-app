
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JournalEntry } from '../types';
import { storageService } from '../services/storageService';
import { geminiService } from '../services/geminiService';
import { ICONS } from '../constants';

interface EntryEditorProps {
  userId: string;
}

const EntryEditor: React.FC<EntryEditorProps> = ({ userId }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [entry, setEntry] = useState<Partial<JournalEntry>>({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    tags: []
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(!!id);

  useEffect(() => {
    const fetchEntry = async () => {
      if (id) {
        setIsInitialLoading(true);
        const entries = await storageService.getEntries(userId);
        const existing = entries.find(e => e.id === id);
        if (existing) {
          setEntry(existing);
        }
        setIsInitialLoading(false);
      }
    };
    fetchEntry();
  }, [id, userId]);

  const handleAnalyze = async () => {
    if (!entry.content || entry.content.length < 10) {
      alert("Please write a bit more before analyzing.");
      return;
    }
    setIsAnalyzing(true);
    const analysis = await geminiService.analyzeEntry(entry.content);
    setEntry(prev => ({
      ...prev,
      mood: analysis.mood,
      aiInsight: analysis.insight,
      tags: analysis.tags
    }));
    setIsAnalyzing(false);
  };

  const handleSave = async () => {
    if (!entry.content) {
      alert("Please write something in your journal.");
      return;
    }
    setIsSaving(true);
    
    try {
      const finalEntry: JournalEntry = {
        id: entry.id || crypto.randomUUID(),
        userId: userId,
        title: entry.title || "Untitled Entry",
        content: entry.content || "",
        date: entry.date || new Date().toISOString().split('T')[0],
        mood: entry.mood,
        aiInsight: entry.aiInsight,
        tags: entry.tags || []
      };

      await storageService.saveEntry(finalEntry);
      navigate('/');
    } catch (err) {
      alert('Failed to save entry.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isInitialLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#2D5A27] mb-4"></div>
        <p className="text-gray-500">Retrieving entry...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="text-gray-500 hover:text-gray-800 flex items-center transition-colors font-medium"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          Back
        </button>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing || isSaving}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              isAnalyzing 
              ? 'bg-gray-100 text-gray-400' 
              : 'bg-white border border-[#2D5A27] text-[#2D5A27] hover:bg-[#E8F3E9]'
            }`}
          >
            {isAnalyzing ? (
              <span className="flex items-center"><div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div> Analyzing...</span>
            ) : (
              <span className="flex items-center"><ICONS.Sparkles /><span className="ml-2">AI Analysis</span></span>
            )}
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center px-6 py-2 bg-[#2D5A27] text-white rounded-lg text-sm font-semibold hover:bg-[#1E3E1A] transition-all shadow-md disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <input 
            type="text"
            placeholder="Reflection Title..."
            value={entry.title}
            onChange={(e) => setEntry({ ...entry, title: e.target.value })}
            className="w-full text-4xl font-bold bg-transparent border-none focus:ring-0 placeholder-gray-300 font-serif text-slate-900 outline-none"
            disabled={isSaving}
          />
          
          <div className="flex items-center space-x-4">
             <input 
              type="date"
              value={entry.date}
              onChange={(e) => setEntry({ ...entry, date: e.target.value })}
              className="bg-white border border-gray-100 rounded-lg px-3 py-1.5 text-sm text-gray-600 focus:ring-2 focus:ring-[#2D5A27]/20 outline-none"
              disabled={isSaving}
            />
          </div>

          <textarea 
            placeholder="How are you feeling today? What's on your mind..."
            value={entry.content}
            onChange={(e) => setEntry({ ...entry, content: e.target.value })}
            className="w-full min-h-[500px] bg-white rounded-3xl p-8 border border-gray-100 focus:border-[#2D5A27]/30 focus:ring-4 focus:ring-[#2D5A27]/5 text-lg leading-relaxed text-slate-900 shadow-sm outline-none resize-none"
            disabled={isSaving}
          />
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm sticky top-24">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">AI Analysis</h4>
            
            {entry.mood ? (
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-gray-400 font-bold block mb-2 uppercase tracking-tighter">Current Mood</label>
                  <div className="inline-block px-4 py-2 bg-[#E8F3E9] text-[#2D5A27] rounded-xl font-bold">
                    {entry.mood}
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-gray-400 font-bold block mb-2 uppercase tracking-tighter">Deep Insight</label>
                  <p className="text-gray-700 text-sm italic leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                    "{entry.aiInsight}"
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-bold block mb-2 uppercase tracking-tighter">Themes</label>
                  <div className="flex flex-wrap gap-2">
                    {entry.tags?.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium border border-gray-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 px-4">
                <div className="text-gray-200 mb-4 flex justify-center scale-150">
                  <ICONS.Sparkles />
                </div>
                <p className="text-gray-400 text-sm">
                  Click <strong>AI Analysis</strong> above to unlock reflections based on your writing.
                </p>
              </div>
            )}
          </div>

          <div className="bg-[#E8F3E9] rounded-3xl p-6 border border-[#2D5A27]/10">
            <h4 className="text-sm font-bold text-[#2D5A27] uppercase tracking-widest mb-4">Prompt of the Day</h4>
            <p className="text-[#2D5A27]/80 text-sm leading-relaxed mb-4 italic">
              "What is one small thing that went well today, regardless of how the rest of the day felt?"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryEditor;

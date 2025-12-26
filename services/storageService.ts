
import { supabase } from './supabaseClient';
import { JournalEntry } from '../types';

export const storageService = {
  // Journal Entries
  getEntries: async (userId: string): Promise<JournalEntry[]> => {
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching entries:', error);
      return [];
    }

    return data.map(item => ({
      id: item.id,
      userId: item.user_id,
      title: item.title,
      content: item.content,
      date: item.date,
      mood: item.mood,
      aiInsight: item.ai_insight,
      tags: item.tags || []
    }));
  },

  saveEntry: async (entry: JournalEntry) => {
    const { error } = await supabase
      .from('entries')
      .upsert({
        id: entry.id,
        user_id: entry.userId,
        title: entry.title,
        content: entry.content,
        date: entry.date,
        mood: entry.mood,
        ai_insight: entry.aiInsight,
        tags: entry.tags
      });

    if (error) {
      console.error('Error saving entry:', error);
      throw error;
    }
  },

  deleteEntry: async (id: string) => {
    const { error, status } = await supabase
      .from('entries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting entry ${id}:`, error);
      throw error;
    }
    
    // Status 204 means success, but if nothing was deleted (e.g. wrong ID or RLS), 
    // Supabase might still return a success status depending on the context.
    console.log(`Deleted entry ${id} with status: ${status}`);
  }
};

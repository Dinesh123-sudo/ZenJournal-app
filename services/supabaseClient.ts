
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bafvctodyhmeutipyuas.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZnZjdG9keWhtZXV0aXB5dWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3MzIwNTcsImV4cCI6MjA4MjMwODA1N30.8bOaYYQGOhtaQAwxUX_0zkhIXd6-fMAYMzRmBYCRJrk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

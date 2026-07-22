import { createClient } from '@supabase/supabase-js'

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL     || 'https://tkchrwpyrwoyibpfdhfl.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrY2hyd3B5cndveWlicGZkaGZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2NDc4MDMsImV4cCI6MjA5NzIyMzgwM30.qJcU0QMbxXra8BITyZFCeHON5Y8QJxLiF-Nf1Vv4LLY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession:     true,
    autoRefreshToken:   true,
    detectSessionInUrl: true,
    flowType:           'pkce',
  },
})
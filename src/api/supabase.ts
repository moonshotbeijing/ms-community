import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://zyawsufznkrsorvzqigr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5YXdzdWZ6bmtyc29ydnpxaWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA5NDkyOTUsImV4cCI6MTk3NjUyNTI5NX0.-PsciWuJ5i0o5UOU6JwmupvbLzsk87ibLX9hYVyB1Lk'
)
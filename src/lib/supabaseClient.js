import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tllgjugzurmsytopbnrh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsbGdqdWd6dXJtc3l0b3BibnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NTg3NjIsImV4cCI6MjA2NjQzNDc2Mn0.ZfSGgNuXSJjdywnSmUClDsD45uUTgAXOLlcoEllADp0'

export const supabase = createClient(supabaseUrl, supabaseKey)

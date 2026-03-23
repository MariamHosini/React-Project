import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cykvxpbamzcqnieokpzl.supabase.co' 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5a3Z4cGJhbXpjcW5pZW9rcHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NzA0ODgsImV4cCI6MjA4ODA0NjQ4OH0.V9fIbfZWRhaAGJuKsuV0Pbdk_vfaUDQ4Wgm1mqxaqxo"
const supabase = createClient(supabaseUrl ,supabaseAnonKey );
export default supabase;
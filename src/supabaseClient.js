import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cykvxpbamzcqnieokpzl.supabase.co' 
const supabaseAnonKey = "sb_publishable_G4kr77vrzZnuzeK4-NEhAw_-z01fwBl"
const supabase = createClient(supabaseUrl ,supabaseAnonKey );
export default supabase;
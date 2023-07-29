import { createClient } from '@supabase/supabase-js'
export default createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ,{
    cookieOptions: { 
      domain: process.env.NEXT_PUBLIC_URL, secure: true, httpOnly: true 
    },
  }
) 
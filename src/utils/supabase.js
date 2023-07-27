import { createClient } from '@supabase/supabase-js'
export default createClient(
  process.env.NEXT_PUBLIC_SBURL,
  process.env.NEXT_PUBLIC_SBAPIKEY
)
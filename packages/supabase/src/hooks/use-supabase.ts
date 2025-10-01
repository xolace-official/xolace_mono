import { useMemo } from 'react';

import type { SupabaseClient } from '@supabase/supabase-js';

import { getSupabaseBrowserClient } from '../client';
import { Database } from '../database.types';

const client = getSupabaseBrowserClient<unknown>();

export function useSupabase<Db = Database>() {
  return useMemo(() => client as SupabaseClient<Db>, []);
}

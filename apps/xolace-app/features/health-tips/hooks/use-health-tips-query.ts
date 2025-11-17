import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useSupabase } from '@xolacekit/supabase';

import { MOCK_HEALTH_TIPS } from '../data/mock-health-tips';
import type { HealthTipListItem, HealthTipsFilter } from '../types';

const SELECT_COLUMNS =
  'id,title,read_time,topic,excerpt,author_name,slug,author_avatar_url';

export function useHealthTipsQuery(options?: HealthTipsFilter) {
  const supabase = useSupabase();

  const normalizedOptions = useMemo(
    () => ({
      limit: options?.limit,
      topic: options?.topic ?? 'all',
      searchTerm: options?.searchTerm?.trim() || undefined,
    }),
    [options?.limit, options?.topic, options?.searchTerm],
  );

  const queryKey = useMemo(
    () => ['health-tips', 'list', normalizedOptions] as const,
    [normalizedOptions],
  );

  const queryFn = async (): Promise<HealthTipListItem[]> => {
    let query = supabase
      .from('health_tips')
      .select(SELECT_COLUMNS)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(normalizedOptions.limit ?? 25);

    if (normalizedOptions.topic && normalizedOptions.topic !== 'all') {
      query = query.eq('topic', normalizedOptions.topic);
    }

    if (normalizedOptions.searchTerm) {
      const wildcard = `%${normalizedOptions.searchTerm}%`;
      query = query.or(`title.ilike.${wildcard},excerpt.ilike.${wildcard}`);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  };

  return useQuery({
    queryKey,
    queryFn,
    staleTime: 60 * 1000,
    placeholderData: () => MOCK_HEALTH_TIPS,
  });
}

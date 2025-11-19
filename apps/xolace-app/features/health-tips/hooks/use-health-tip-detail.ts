import { useQuery } from '@tanstack/react-query';

import { useSupabase } from '@xolacekit/supabase';

import type { HealthTipDetail } from '../types';

const SELECT_CLAUSE =
  'id,title,content,author_name,author_avatar_url,slug,read_time,topic,created_at,excerpt';

export function useHealthTipDetail(slug?: string) {
  const supabase = useSupabase();

  return useQuery<HealthTipDetail>({
    queryKey: ['health-tips', 'detail', slug],
    enabled: Boolean(slug),
    staleTime: 2 * 60 * 1000,
    queryFn: async () => {
      if (!slug) {
        throw new Error('Missing health tip identifier');
      }

      const { data, error } = await supabase
        .from('health_tips')
        .select(SELECT_CLAUSE)
        .eq('slug', slug)
        .eq('is_approved', true)
        .limit(1)
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error('Health tip is not available anymore.');
      }

      return data as HealthTipDetail;
    },
  });
}

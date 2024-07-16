'use server';

import { createClient } from '@/utils/supabase/server';
import type { DrawWithPrizes } from '../types/draws';

export const getDraws = async (): Promise<DrawWithPrizes[]> => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('draws')
        .select('*, prizes(*)')
        .eq('status', 'Upcoming')
        .order('draw_date', { ascending: true })
        .limit(6);

    if (error) {
        throw new Error(error.message);
    }

    return data ?? [];
};

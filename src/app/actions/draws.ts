'use server';

import { createClient } from '@/utils/supabase/server';
import type { CreateDrawDto, DrawWithPrizes } from '../types/draws';
import { revalidatePath } from 'next/cache';

export const getDraws = async (): Promise<DrawWithPrizes[]> => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('draws')
        .select('*, prizes(*)')
        // .eq('status', 'Upcoming')
        .order('draw_date', { ascending: true })
        .limit(6);

    if (error) {
        throw new Error(error.message);
    }

    return data ?? [];
};

export const createDraw = async (draw: CreateDrawDto): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase.from('draws').insert(draw).select();

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/draws');
};

export const deleteDraw = async (drawId: string): Promise<void> => {
    const supabase = createClient();
    const { error } = await supabase.from('draws').delete().eq('id', drawId);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/dashboard/draws');
};

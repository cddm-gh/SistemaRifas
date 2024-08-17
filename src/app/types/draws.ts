import type { Tables } from './database';

export type DrawEntity = Tables<'draws'>;
export type DrawWithPrizes = DrawEntity & {
    prizes: Array<Tables<'prizes'>>;
};
export type CreateDrawDto = {
    name: string;
    draw_image?: string | null;
    draw_date: string;
    total_tickets: number;
    ticket_price: number;
    description: string;
    status?: string;
};
import type { Tables } from './database';

export type DrawEntity = Tables<'draws'>;
export type DrawWithPrizes = DrawEntity & {
    prizes: Array<Tables<'prizes'>>;
};

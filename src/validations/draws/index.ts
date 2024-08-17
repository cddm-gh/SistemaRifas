import { isValid, parseISO } from 'date-fns';
import { z } from 'zod';

const DrawSchema = z.object({
    name: z.string(),
    draw_image: z.string().optional(),
    draw_date: z.union([z.date(), z.string()]).transform((val) => {
        if (val instanceof Date) {
            return val.toISOString();
        }
        const date = parseISO(val);
        if (!isValid(date)) {
            throw new Error('Formato de fecha inválido.');
        }
        return date.toISOString();
    }),
    total_tickets: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
            message: 'El total de tickets debe ser mayor o igual a 1',
        })
        .transform((val) => Number(val)),
    ticket_price: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
            message: 'El precio del ticket no puede ser negativo',
        })
        .transform((val) => parseFloat(val)),
    description: z.string(),
    status: z.string().optional(),
    // created_at: z.string().optional(),
    // id: z.string().optional(),
    // updated_at: z.string().optional(),
});

export const drawFormSchema = DrawSchema.extend({});

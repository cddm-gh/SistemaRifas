import { z } from 'zod';

const DrawSchema = z.object({
    created_at: z.string().optional(),
    description: z.string(),
    draw_date: z.date(),
    draw_image: z.string().optional(),
    id: z.string().optional(),
    name: z.string(),
    payment_due_date: z.string(),
    qr_code: z.string().optional(),
    status: z.string(),
    ticket_price: z.number().nonnegative('Ticket price must be non-negative'),
    total_tickets: z.number().nonnegative('Total tickets must be non-negative'),
    updated_at: z.string().optional(),
});

export const editDrawFormSchema = DrawSchema.extend({});

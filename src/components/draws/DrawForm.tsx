'use client';
import type { z } from 'zod';

import type { DrawWithPrizes } from '@/app/types/draws';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { drawFormSchema } from '@/validations/draws';
import { zodResolver } from '@hookform/resolvers/zod';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { createDraw } from '@/app/actions/draws';

interface DrawFormProps {
    draw?: DrawWithPrizes;
    isCreating: boolean;
    // onSubmit: (formData: FormData) => void; // Adjust the type as needed
    // onClose: () => void;
}

export default function DrawForm({ draw, isCreating = false }: DrawFormProps) {
    console.log('draw: ', draw);
    const form = useForm<z.infer<typeof drawFormSchema>>({
        resolver: zodResolver(drawFormSchema),
        defaultValues: {
            name: draw?.name,
            draw_image: '',
            total_tickets: draw?.total_tickets,
            ticket_price: draw?.ticket_price,
            status: draw?.status,
            description: draw?.description,
            // draw_date: draw?.draw_date
            //     ? draw?.draw_date.toISOString()
            //     : undefined,
        },
    });

    const {
        formState: { isSubmitting },
    } = form;

    async function onSubmit(values: z.infer<typeof drawFormSchema>) {
        console.log('submit form: ', values);
        await createDraw(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del Sorteo</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Nombre del Sorteo"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="draw_image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Imagen Principal</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Imagen del sorteo"
                                    // type="file"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="draw_date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha del Sorteo</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-[240px] pl-3 text-left font-normal',
                                                !field.value &&
                                                    'text-muted-foreground'
                                            )}
                                        >
                                            {field.value ? (
                                                format(
                                                    parseISO(field.value),
                                                    'PPP',
                                                    {
                                                        locale: es,
                                                    }
                                                )
                                            ) : (
                                                <span>Elige una fecha</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={
                                            field.value
                                                ? parseISO(field.value)
                                                : undefined
                                        }
                                        onSelect={(date) =>
                                            field.onChange(
                                                date ? date.toISOString() : ''
                                            )
                                        }
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row space-x-4">
                    <FormField
                        control={form.control}
                        name="total_tickets"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cantidad Tickets</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Cantidad total de tickets para el sorteo"
                                        type="number"
                                        min="1"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ticket_price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Precio del Ticket</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Valor de cada ticket"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value || 'Pending'}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Estado actual del sorteo" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Pending">
                                        Pendiente
                                    </SelectItem>
                                    <SelectItem value="Active">
                                        Activo
                                    </SelectItem>
                                    <SelectItem value="Completed">
                                        Finalizado
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Descripción y condiciones del sorteo"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row justify-center items-center space-x-6">
                    {/* <Button variant={'secondary'} className="mt-2" onClick={}>
                        Cancelar
                    </Button> */}
                    <Button
                        type="submit"
                        className="mt-2"
                        disabled={isSubmitting}
                    >
                        {isCreating ? 'Crear' : 'Guardar'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

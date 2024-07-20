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
import { editDrawFormSchema } from '@/validations/draws';
import { zodResolver } from '@hookform/resolvers/zod';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

interface EditDrawFormProps {
    draw: DrawWithPrizes;
    // onSubmit: (formData: FormData) => void; // Adjust the type as needed
    // onClose: () => void;
}

export default function EditDrawForm({ draw }: EditDrawFormProps) {
    const form = useForm<z.infer<typeof editDrawFormSchema>>({
        resolver: zodResolver(editDrawFormSchema),
        defaultValues: {
            name: draw.name,
            draw_image: '',
            total_tickets: draw.total_tickets,
            ticket_price: draw.ticket_price,
            status: draw.status,
            description: draw.description,
        },
    });

    // const {
    //     formState: { isSubmitting },
    // } = form;

    async function onSubmit(values: z.infer<typeof editDrawFormSchema>) {
        console.log(values);
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
                                                format(field.value, 'PPP')
                                            ) : (
                                                <span>Pick a date</span>
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
                                        selected={field.value}
                                        onSelect={field.onChange}
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
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <FormField
                    control={form.control}
                    name="prizes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Premios</FormLabel>
                            <FormControl>
                                <Input placeholder="Premio #1" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
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
                            <FormLabel>Premios</FormLabel>
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
                    <Button type="submit" className="mt-2">
                        Guardar
                    </Button>
                </div>
            </form>
        </Form>
    );
}

'use client';

// import { deletePropiedad } from '@/app/actions/propiedades';
import type { DrawWithPrizes } from '@/app/types/draws';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDateTzToDisplay } from '@/utils/dates';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';

export const columns: ColumnDef<DrawWithPrizes>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Nombre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'ticket_price',
        header: 'Precio Ticket',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('ticket_price'));
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount);

            return <div className="text-center font-light">{formatted}</div>;
        },
    },
    {
        accessorKey: 'total_tickets',
        header: 'Cantidad Tickets',
    },
    {
        accessorKey: 'status',
        header: 'Estado',
        cell: ({ row }) => {
            const status = row.original.status;
            let badgeClass = 'bg-gra-200 text-gray-800';

            if (status === 'Pending') {
                badgeClass = 'bg-orange-500 text-white';
            } else if (status === 'Active') {
                badgeClass = 'bg-green-500 text-white';
            } else if (status === 'Completed') {
                badgeClass = 'bg-red-500 text-white';
            }

            return (
                <Badge className={badgeClass}>
                    {status === 'Pending'
                        ? 'Pendiente'
                        : status === 'Active'
                          ? 'Iniciado'
                          : 'Finalizado'}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'draw_date',
        header: 'Fecha de Sorteo',
        cell: ({ row }) => {
            const date = row.getValue('draw_date') as string;
            const formatted = formatDateTzToDisplay(date);
            return <div className="text-center font-light">{formatted}</div>;
        },
    },
    {
        id: 'operaciones',
        header: 'Operaciones',
        cell: ({ row }) => {
            const draw = row.original;
            return <ActionsComponent draw={draw} />;
        },
    },
];

function ActionsComponent({ draw }: { draw: DrawWithPrizes }) {
    return (
        <div className="flex flex-row">
            <button onClick={() => console.log('edit: ', draw.id)}>
                <Pencil className="mr-2 h-4 w-4" />
            </button>
            <button onClick={() => console.log('delete: ', draw.id)}>
                <Trash2 className="ml-2 h-4 w-4 text-red-500" />
            </button>
        </div>
    );
}

// const handleDeletePropiedad = async (id: string) => {
//     await deletePropiedad(id);
//     toast('Propiedad Eliminada');
// };

// export function ActionsComponent({ propiedad }: { propiedad: any }) {
//     const router = useRouter();
//     return (
//         <>
//             <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" className="h-8 w-8 p-0">
//                         <span className="sr-only">Open menu</span>
//                         <MoreHorizontal className="h-4 w-4" />
//                     </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                     {/* <DropdownMenuLabel>Operaciones</DropdownMenuLabel> */}
//                     {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(propietario.id)}>
//                         Copiar ID de propietario
//                     </DropdownMenuItem> */}
//                     {/* <DropdownMenuSeparator /> */}
//                     <DropdownMenuItem
//                         onClick={() =>
//                             router.push(
//                                 `/dashboard/propiedades/${propiedad.id}`
//                             )
//                         }
//                     >
//                         Ver Detalle
//                     </DropdownMenuItem>
//                     <DropdownMenuItem
//                         onClick={() => handleDeletePropiedad(propiedad.id)}
//                     >
//                         Eliminar
//                     </DropdownMenuItem>
//                 </DropdownMenuContent>
//             </DropdownMenu>
//         </>
//     );
// }

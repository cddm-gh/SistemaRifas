'use client';

import type { DrawWithPrizes } from '@/app/types/draws';
import EditDrawForm from '@/components/draws/EditDrawForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from '@/components/ui/sheet';
import { formatDateTzToDisplay } from '@/utils/dates';

import { type ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

export const columns: ColumnDef<DrawWithPrizes>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            const isAscending = isSorted === 'asc';
            const icon = isSorted ? (
                isAscending ? (
                    <ArrowUp className="h-4 w-4" />
                ) : (
                    <ArrowDown className="h-4 w-4" />
                )
            ) : (
                <ArrowUpDown className="h-4 w-4" />
            );
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Nombre
                    {icon}
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
                          ? 'Activo'
                          : 'Finalizado'}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'draw_date',
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            const isAscending = isSorted === 'asc';
            const icon = isSorted ? (
                isAscending ? (
                    <ArrowUp className="h-4 w-4" />
                ) : (
                    <ArrowDown className="h-4 w-4" />
                )
            ) : (
                <ArrowUpDown className="h-4 w-4" />
            );
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Fecha de Sorteo
                    {icon}
                </Button>
            );
        },
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
    const [isEditing, setIsEditing] = useState(false);

    function handleEditDraw(drawId: string) {
        console.log('edit: ', drawId);
        setIsEditing(true);
    }

    return (
        <>
            <div className="flex flex-row">
                <button onClick={() => handleEditDraw(draw.id)}>
                    <Pencil className="mr-2 h-4 w-4 text-yellow-600" />
                </button>
                <button onClick={() => console.log('delete: ', draw.id)}>
                    <Trash2 className="ml-2 h-4 w-4 text-red-500" />
                </button>
            </div>
            {isEditing && (
                <Sheet
                    open={isEditing}
                    onOpenChange={() => setIsEditing(false)}
                >
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Editar Sorteo</SheetTitle>
                            <SheetClose onClick={() => setIsEditing(false)} />
                        </SheetHeader>
                        <div>
                            <EditDrawForm draw={draw} />
                        </div>
                    </SheetContent>
                </Sheet>
            )}
        </>
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

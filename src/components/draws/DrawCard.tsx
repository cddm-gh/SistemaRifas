import Image from 'next/image';
import { formatDateTzToDisplay } from '@/utils/dates';
import type { DrawWithPrizes } from '@/app/types/draws';

interface Props {
    draw: DrawWithPrizes;
}

export default function DrawListCard({ draw }: Props) {
    const { draw_date, prizes, name, id } = draw;
    const formattedDate = formatDateTzToDisplay(draw_date.toString());

    return (
        <div className="border p-4 rounded-lg">
            <Image
                src={draw?.draw_image ?? ''}
                alt="Imagen del sorteo"
                className="w-full h-48 object-cover rounded-lg"
                width={400}
                height={300}
            />
            <h3 className="mt-4 text-xl font-semibold">{name}</h3>
            {prizes.map(({ place, description }) => (
                <p className="mt-2" key={id}>
                    Premio #{place}: {description}
                </p>
            ))}
            <p className="mt-1">Fecha del Sorteo: {formattedDate}</p>
            <a
                href={`/dashboard/draws/${id}`}
                className="mt-4 inline-block text-blue-500 hover:underline"
            >
                Ver Detalles
            </a>
        </div>
    );
}

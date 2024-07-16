import type { DrawWithPrizes } from '@/app/types/draws';
import DrawListCard from './DrawCard';

interface Props {
    draws: Array<DrawWithPrizes>;
}

export default function DrawsList({ draws }: Props) {
    return (
        <>
            {draws.map((draw: DrawWithPrizes) => (
                <DrawListCard draw={draw} key={draw.id} />
            ))}
        </>
    );
}

import { Suspense } from 'react';
import { getDraws } from '@/app/actions/draws';
import Loader from '@/components/Loader';
import { DataTable } from '@/components/data-table/DataTable';
import { columns } from './columns';
import CreateDrawButton from '@/components/draws/CreateDrawButton';

async function DrawsContent() {
    const draws = await getDraws();
    return (
        <div className="content mx-auto">
            <CreateDrawButton />
            <DataTable
                columns={columns}
                data={draws}
                filterBy="name"
                filterInputText="Filtrar por nombre del Sorteo"
            />
        </div>
    );
}

export default async function DrawsPage() {
    return (
        <Suspense fallback={<Loader />}>
            <DrawsContent />
        </Suspense>
    );
}

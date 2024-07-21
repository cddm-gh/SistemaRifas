'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import DrawFormSheet from './DrawFormSheet';

export default function CreateDrawButton() {
    const [openDrawForm, setOpenDrawForm] = useState(false);

    function handleClick() {
        setOpenDrawForm(true);
    }

    return (
        <>
            <Button onClick={handleClick}>Crear nuevo Sorteo 🎉</Button>
            {openDrawForm && (
                <DrawFormSheet
                    isOpen={openDrawForm}
                    handleOpen={setOpenDrawForm}
                    sheetTitle="Crear Nuevo Sorteo"
                />
            )}
        </>
    );
}

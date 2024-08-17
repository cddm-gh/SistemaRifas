import { type DrawWithPrizes } from '@/app/types/draws';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '../ui/sheet';

import DrawForm from './DrawForm';

type DrawFormProps = {
    isOpen: boolean;
    handleOpen: any;
    sheetTitle: string;
    draw?: DrawWithPrizes;
};

export default function DrawFormSheet({
    isOpen,
    handleOpen,
    sheetTitle,
    draw,
}: DrawFormProps) {
    return (
        <Sheet open={isOpen} onOpenChange={() => handleOpen(false)}>
            <SheetContent
                aria-labelledby="sheet-title"
                aria-describedby="sheet-description"
            >
                <SheetHeader>
                    <SheetTitle id="sheet-title">{sheetTitle}</SheetTitle>
                    <SheetClose onClick={() => handleOpen(false)} />
                </SheetHeader>
                <div id="sheet-description">
                    <DrawForm isCreating={true} draw={draw} />
                </div>
            </SheetContent>
        </Sheet>
    );
}

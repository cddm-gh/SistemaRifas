import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutButton from './LogoutButton';

export default async function Header() {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();
    const { user: loggedInUser } = data;

    if (!loggedInUser) {
        redirect('/');
    }

    const { data: user } = await supabase
        .from('users')
        .select('name, email, avatar_url')
        .eq('id', loggedInUser.id)
        .single();

    const userName = user?.name || user?.email;
    const avatarUrl = user?.avatar_url;

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"></h2>
                    <div className="flex items-center">
                        <span className="mr-4 text-sm font-medium text-gray-700">
                            {userName}
                        </span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-8 w-8 rounded-full"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={avatarUrl || ''}
                                            alt={userName}
                                        />
                                        <AvatarFallback>
                                            {userName?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {userName}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogoutButton />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
}

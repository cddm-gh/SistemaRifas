'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const sidebarItems = [
    { name: 'Draws', href: '/dashboard/draws' },
    { name: 'Prizes', href: '/dashboard/prizes' },
    { name: 'Sellers', href: '/dashboard/sellers' },
    { name: 'Tickets', href: '/dashboard/tickets' },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <Button
                variant="outline"
                className="fixed top-4 left-4 z-50 md:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="flex items-center justify-center h-20 border-b">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Admin Dashboard
                    </h1>
                </div>
                <nav className="mt-8">
                    <ul>
                        {sidebarItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100',
                                        pathname === item.href &&
                                            'bg-gray-100 font-semibold'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}

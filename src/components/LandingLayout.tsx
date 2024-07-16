'use client';

import React, { useState } from 'react';

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-xl font-bold">Lottery Logo</div>
                    <nav className="hidden md:flex space-x-4">
                        <a href="#" className="hover:underline">
                            Home
                        </a>
                        <a href="#" className="hover:underline">
                            About
                        </a>
                        <a href="#" className="hover:underline">
                            Contact
                        </a>
                        <a href="/login" className="hover:underline">
                            Iniciar Sesión
                        </a>
                        <a href="#" className="hover:underline">
                            Register
                        </a>
                    </nav>
                    <button
                        className="md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    menuOpen
                                        ? 'M6 18L18 6M6 6l12 12'
                                        : 'M4 6h16M4 12h16M4 18h16'
                                }
                            ></path>
                        </svg>
                    </button>
                </div>
                {menuOpen && (
                    <nav className="md:hidden">
                        <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-700"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-700"
                        >
                            About
                        </a>
                        <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-700"
                        >
                            Contact
                        </a>
                        <a
                            href="/login"
                            className="block py-2 px-4 hover:bg-gray-700"
                        >
                            Iniciar Sesión
                        </a>
                        <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-700"
                        >
                            Register
                        </a>
                    </nav>
                )}
            </header>
            <main className="flex-grow">{children}</main>
            <footer className="bg-gray-800 text-white p-4">
                <div className="container mx-auto text-center">
                    &copy; 2024 Lottery System. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default LandingLayout;

'use server';

import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signUp = async (formData: FormData) => {
    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const userType = formData.get('user_type') as string;
    const name = formData.get('nombre') as string;
    const phone = formData.get('phone') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
            data: {
                name: name,
                email: email,
                phone: phone,
                user_type: userType,
            },
        },
    });

    if (error) {
        return redirect('/signup?message=Hubo un problema creando el usuario');
    }

    return redirect('/dashboard');
};

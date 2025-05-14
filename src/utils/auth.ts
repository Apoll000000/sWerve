// src/utils/auth.ts
import { supabase } from '@/lib/supabase';

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`, // optional: handle redirect
    },
  });

  if (error) {
    console.error('Google sign-in error:', error.message);
  }

  return { data, error };
};

export const signInWithFacebook = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Facebook sign-in error:', error.message);
  }

  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sign-out error:', error.message);
  } else {
    window.location.href = '/home';
  }

  return error ? { success: false, message: error.message } : { success: true };
};
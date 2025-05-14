// src/utils/auth.ts
import { supabase } from '@/lib/supabase';

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    '${window.location.origin}/auth/callback'
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`
  return url
}

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: getURL(), // optional: handle redirect
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
      redirectTo: getURL(),
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
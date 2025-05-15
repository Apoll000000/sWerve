// src/pages/AuthCallback.tsx
// import { useEffect } from 'react'
// import { supabase } from '@/lib/supabase'
// import { useNavigate } from 'react-router-dom'

// const AuthCallback = () => {
//   const navigate = useNavigate()

//   useEffect(() => {
//     const handleRedirect = async () => {
//       const { data, error } = await supabase.auth.getSession()
//       if (error) {
//         console.error('Error handling auth redirect:', error)
//       } else {
//         console.log('Session from URL:', data.session)
//       }

//       navigate('/home') // redirect to your app home or dashboard
//     }

//     handleRedirect()
//   }, [navigate])

//   return <div>Logging you in...</div>
// }

// export default AuthCallback

// src/pages/AuthCallback.tsx
// import { useEffect } from 'react'
// import { supabase } from '@/lib/supabase'
// import { useNavigate } from 'react-router-dom'

// const AuthCallback = () => {
//   const navigate = useNavigate()

//   useEffect(() => {
//     const handleAuth = async () => {
//       // Listen for the auth event that occurs after redirect
//       const { data, error } = await supabase.auth.getSession();

//       if (error || !data?.session) {
//         console.log('Session not found in getSession(), falling back to URL hash');

//         // This handles the URL hash part (i.e., access_token in location.hash)
//         supabase.auth.onAuthStateChange((event, session) => {
//           if (event === 'SIGNED_IN') {
//             console.log('Signed in after redirect:', session);
//             navigate('/home');
//           }
//         });
//       } else {
//         console.log('Session from getSession():', data.session);
//         navigate('/home');
//       }
//     };

//     handleAuth();
//   }, [navigate]);

//   return <div>Logging you in...</div>;
// };

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      // 🔑 REQUIRED: Parse the access token from the URL hash
      const { data, error } = await supabase.auth.getSessionFromUrl();

      if (error) {
        console.error('Error handling auth callback:', error.message);
      } else {
        console.log('Session retrieved from URL:', data.session);

        // Optional: Clear URL hash to keep it clean
        window.location.hash = '';
      }

      // ✅ Navigate regardless to avoid reprocessing URL
      navigate('/home');
    };

    handleAuthRedirect();
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default AuthCallback;


// export default AuthCallback;


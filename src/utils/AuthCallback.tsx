// src/pages/AuthCallback.tsx
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'

const AuthCallback = () => {
  const navigate = useNavigate()

  // useEffect(() => {
  //   const handleRedirect = async () => {
  //     const { data, error } = await supabase.auth.getSession()
  //     if (error) {
  //       console.error('Error handling auth redirect:', error)
  //     } else {
  //       console.log('Session from URL:', data.session)
  //     }

  //     navigate('/home') // redirect to your app home or dashboard
  //   }

  //   handleRedirect()
  // }, [navigate])

  useEffect(() => {
    const handleRedirect = async () => {
      const url = new URL(window.location.href)
      const code = url.searchParams.get('code')

      if (!code) {
        console.error('No auth code found in URL')
        return
      }

      const { data, error } = await supabase.auth.exchangeCodeForSession(code) // pass code manually

      if (error) {
        console.error('Error exchanging code for session:', error.message)
      } else {
        console.log('Logged in session:', data.session)
        navigate('/home')
      }
    }

    handleRedirect()
  }, [navigate])

  return <div>Logging you in...</div>
}

export default AuthCallback

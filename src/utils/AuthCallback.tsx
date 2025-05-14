// src/pages/AuthCallback.tsx
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'

const AuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleRedirect = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error handling auth redirect:', error)
      } else {
        console.log('Session from URL:', data.session)
      }

      navigate('/home') // redirect to your app home or dashboard
    }

    handleRedirect()
  }, [navigate])

  return <div>Logging you in...</div>
}

export default AuthCallback

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { SessionProvider } from '@/SessionContext';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SessionProvider>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </SessionProvider>
  </StrictMode>
)

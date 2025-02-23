import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Navigation/router.jsx';
import { RouterProvider } from 'react-router';
import { AuthContextProvider } from './context/AuthContext.jsx.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <h1 className='text-center pt-4 text-3xl'>
        React Supabase Auth & Context
      </h1>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  </StrictMode>,
)

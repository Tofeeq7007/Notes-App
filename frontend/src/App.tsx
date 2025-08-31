import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Dashboard } from './Pages/Dashboard'
import { Auth_signup } from './Pages/auth_signup'
import { Auth_signin } from './Pages/auth_signin'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// import { Auth_signin } from './Pages/auth_signin'
// import { Auth_signup } from './Pages/auth_signup'
// import { Input_field } from './component/ui/Input'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Auth_signin/>
    },
    {
      path:"/signup",
      element:<Auth_signup/>,
    },
    {
      path:"/Dashboard",
      element:<Dashboard/>
    }
  ]
  )
  const queryClient = new QueryClient()

  return (
    
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App

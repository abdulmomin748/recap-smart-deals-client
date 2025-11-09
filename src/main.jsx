import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layout/MainLayout.jsx'
import Home from './pages/Home.jsx'
import RootProvider from './Provider/RootProvider.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import MyBids from './pages/MyBids.jsx'
import PrivateRoute from './Route/PrivateRoute.jsx'
import AllProducts from './pages/AllProducts.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import AddProduct from './pages/AddProduct.jsx'
import MyProducts from './pages/MyProducts.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/my-bids',
        element: <PrivateRoute>
          <MyBids />
        </PrivateRoute>
      },
      {
        path: '/my-products',
        element: <PrivateRoute> <MyProducts /> </PrivateRoute>
       
      },
      {
        path: '/all-products',
        element: <AllProducts />
      },
      {
        path: `/products/:id`,
        loader: ({params}) => fetch(`http://localhost:3000/products/${params.id}`),
        element: <PrivateRoute><ProductDetails /></PrivateRoute>
      },
      {
        path: '/add-product',
        element: <PrivateRoute><AddProduct /></PrivateRoute>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootProvider>
      <RouterProvider router={router}></RouterProvider>
    </RootProvider>
  </StrictMode>,
)

import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import ProductMaster from '../pages/product'
import ProductCreate from '../pages/product/create'
import ProductUpdate from '../pages/product/update'
import CartPage from '../pages/cart'
import PrivateRoute from './PrivateRoute'
import LoginForm from '../pages/Login'

const AllRoutes: React.FC = () => {
  const protectedRoutes = [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/products", element: <ProductMaster /> },
    { path: "/products/create", element: <ProductCreate /> },
    { path: "/products/update/:id", element: <ProductUpdate /> },
    { path: "/cart", element: <CartPage /> },
  ];

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      <Route path="/login" element={<LoginForm />} />

      {protectedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PrivateRoute>{route.element}</PrivateRoute>}
        />
      ))}
    </Routes>
  );
};

export default AllRoutes
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import ProductMaster from '../pages/product'
import CartPage from '../pages/cart'

const AllRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      {/* <Route path="/login" element={<Login />} /> */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />
      <Route
        path="/products"
        element={<ProductMaster />}
      />
      <Route
        path="/cart"
        element={<CartPage />}
      />
    </Routes>
  )
}

export default AllRoutes
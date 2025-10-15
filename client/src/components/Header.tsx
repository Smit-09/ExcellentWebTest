import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/cart/cart';

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data: items = [] } = useQuery({ queryKey: ['cart'], queryFn: getCart });

  const cartCount = items.length;

  return (
    <div className='w-full flex items-center justify-between bg-black p-4 gap-4'>
      <h1 className='text-white font-semibold cursor-pointer' onClick={() => navigate('/')}>E-Shop</h1>
      <nav className='flex items-center gap-6'>
        <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300 hover:text-white'}>Dashboard</NavLink>
        <NavLink to='/products' className={({ isActive }) => isActive ? 'text-white' : 'text-gray-300 hover:text-white'}>Products</NavLink>
        <button onClick={() => navigate('/cart')} className='relative inline-flex items-center gap-2 text-gray-300 hover:text-white'>
          <span>Cart</span>
          <span className='absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full'>{cartCount}</span>
        </button>
        <div className="space-x-4">
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Header
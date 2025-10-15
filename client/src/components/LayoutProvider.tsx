import Header from './Header'
import AllRoutes from './AllRoutes'
import { CartProvider } from '../context/CartContext'
import { useAuth } from '../context/AuthContext';

const LayoutProvider = () => {
  const { isAuthenticated } = useAuth();
  return (
    <CartProvider>
      <div className=''>
        {isAuthenticated && <Header />}
        <AllRoutes />
      </div>
    </CartProvider>
  )
}

export default LayoutProvider
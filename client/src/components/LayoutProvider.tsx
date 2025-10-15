import Header from './Header'
import AllRoutes from './AllRoutes'
import { CartProvider } from '../context/CartContext'

const LayoutProvider = () => {
  return (
    <CartProvider>
      <div className=''>
          <Header />
          <AllRoutes />
      </div>
    </CartProvider>
  )
}

export default LayoutProvider
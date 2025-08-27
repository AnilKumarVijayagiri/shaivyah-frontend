import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../store/useCart'

export default function ProductCard({ p }){
  const [quantity, setQuantity] = useState(1)
  const cart = useCart()
  const price = Math.round(p.price * (1 - (p.discount||0)/100))
  const img = p.images?.[0] || 'https://via.placeholder.com/400x500?text=Shaivyah'

  const handleAddToCart = (e) => {
    e.preventDefault() // Prevent navigation
    cart.add(p, quantity)
    setQuantity(1) // Reset quantity after adding to cart
  }

  const handleQuantityChange = (e, newQuantity) => {
    e.preventDefault() // Prevent navigation
    setQuantity(Math.max(1, newQuantity))
  }
  return (
    <Link to={`/product/${p._id}`} className="card overflow-hidden group">
      <img src={img} alt={p.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"/>
      <div className="p-4">
        <h3 className="font-semibold line-clamp-1">{p.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-1">{p.category} · {p.fabric||'Fabric'}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-bold">₹{price}</span>
          {p.discount ? <span className="text-xs line-through text-gray-400">₹{p.price}</span> : null}
        </div>

        {/* Quantity Counter and Add to Cart - Hidden by default, visible on hover */}
        <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
             onClick={e => e.preventDefault()}>
          <div className="flex items-center gap-2">
            <button 
              onClick={e => handleQuantityChange(e, quantity - 1)}
              className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              -
            </button>
            <span className="w-6 text-center">{quantity}</span>
            <button 
              onClick={e => handleQuantityChange(e, quantity + 1)}
              className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="ml-2 px-4 py-1.5 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors flex-grow text-sm font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

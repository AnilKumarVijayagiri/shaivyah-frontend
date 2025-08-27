// import { useCart } from '../store/useCart'
// import { Link } from 'react-router-dom'
// import { useEffect } from 'react'

// export default function Cart() {
//   const cart = useCart()
//   useEffect(() => { cart.load() }, [])
//   const total = cart.total()
  
//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-bold">Cart</h1>
//       {cart.items.length === 0 ? <p>Your cart is empty.</p> : (
//         <div className="space-y-3">
//           {cart.items.map(({product, qty}) => (
//             <div key={product._id} className="card p-4 flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <img src={product.images?.[0]||'https://via.placeholder.com/80'} alt="" className="w-20 h-20 object-cover rounded-xl"/>
//                 <div>
//                   <h3 className="font-semibold">{product.name}</h3>
//                   <div className="flex items-center gap-3 mt-2">
//                     <div className="flex items-center gap-2">
//                       <button 
//                         onClick={() => qty > 1 && cart.updateQuantity(product._id, qty - 1)}
//                         className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//                       >
//                         -
//                       </button>
//                       <span className="w-8 text-center">{qty}</span>
//                       <button 
//                         onClick={() => cart.updateQuantity(product._id, qty + 1)}
//                         className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <p className="text-sm text-gray-500">× ₹{product.price * (1 - (product.discount || 0)/100)}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-col items-end gap-2">
//                 <p className="font-semibold">₹{(product.price * (1 - (product.discount || 0)/100) * qty).toFixed(0)}</p>
//                 <button className="text-red-600 text-sm" onClick={()=>cart.remove(product._id)}>Remove</button>
//               </div>
//             </div>
//           ))}
//                     <div className="flex items-center justify-between">
//             <span className="text-xl font-bold">Total: ₹{total.toFixed(0)}</span>
//             <Link to="/checkout" className="btn">Checkout</Link>
//           </div>
//         </div>
//       )}

//       <a 
//         href="https://wa.me/918125914279" 
//         target="_blank" 
//         rel="noopener noreferrer"
//         className="fixed bottom-5 right-5 bg-[#25D366] text-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:bg-[#20BA5C] transition-colors z-50"
//       >
//         <i className="fab fa-whatsapp text-4xl"></i>
//       </a>
//     </div>
//   )
//         </div>
//           </div>
//         </div>
//       )}
      
//       <a 
//         href="https://wa.me/918125914279" 
//         target="_blank" 
//         rel="noopener noreferrer"
//         className="fixed bottom-5 right-5 bg-[#25D366] text-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:bg-[#20BA5C] transition-colors z-50"
//       >
//         <i className="fab fa-whatsapp text-4xl"></i>
//       </a>
//     </div>
//   )      
//       <a href="https://wa.me/918125914279" 
//           target="_blank" 
//           rel="noopener noreferrer"
//           className="fixed bottom-5 right-5 bg-[#25D366] text-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:bg-[#20BA5C] transition-colors z-50"
//         >
//           <i className="fab fa-whatsapp text-4xl"></i>
//       </a>
//     </div>
//   )
// }
import { useCart } from '../store/useCart'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function Cart() {
  const cart = useCart()
  useEffect(() => { cart.load() }, [])
  const total = cart.total()
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      {cart.items.length === 0 ? <p>Your cart is empty.</p> : (
        <div className="space-y-3">
          {cart.items.map(({product, qty}) => (
            <div key={product._id} className="card p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={product.images?.[0]||'https://via.placeholder.com/80'} alt="" className="w-20 h-20 object-cover rounded-xl"/>
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => qty > 1 && cart.updateQuantity(product._id, qty - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{qty}</span>
                      <button 
                        onClick={() => cart.updateQuantity(product._id, qty + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">× ₹{Math.round(product.price * (1 - (product.discount || 0)/100))}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="font-semibold">₹{Math.round(product.price * (1 - (product.discount || 0)/100) * qty)}</p>
                <button className="text-red-600 text-sm" onClick={()=>cart.remove(product._id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">Total: ₹{Math.round(total)}</span>
            <Link to="/checkout" className="btn">Checkout</Link>
          </div>
        </div>
      )}

      <a 
        href="https://wa.me/918125914279" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-[#25D366] text-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:bg-[#20BA5C] transition-colors z-50"
      >
        <i className="fab fa-whatsapp text-4xl"></i>
      </a>
    </div>
  )
}
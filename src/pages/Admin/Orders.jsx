import { useEffect, useState } from 'react'
import { api } from '../../lib/api'

export default function Orders(){
  const [list, setList] = useState([])
  const load = async ()=>{ 
    const {data} = await api.get('/api/orders'); 
    // Ensure products are populated
    const ordersWithProducts = await Promise.all(data.map(async (order) => {
      const products = await Promise.all(order.items.map(async (item) => {
        if (typeof item.product === 'string') {
          const { data: productData } = await api.get(`/api/products/${item.product}`);
          return { ...item, product: productData };
        }
        return item;
      }));
      return { ...order, items: products };
    }));
    setList(ordersWithProducts);
  }
  useEffect(()=>{ load() }, [])

  const setStatus = async (id,status)=>{ await api.put(`/api/orders/${id}/status`, { status }); load() }

  return (
    <div className="space-y-3">
      {list.map(o => (
        <div key={o._id} className="card p-4 space-y-4">
          {/* Order Header */}
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold text-lg">Order #{o._id.slice(-6)}</div>
              <div className="text-sm text-gray-600">
                {o.shippingAddress?.name} · {o.shippingAddress?.phone}
                <div>{o.shippingAddress?.address}</div>
                <div>{o.shippingAddress?.city}, {o.shippingAddress?.state}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">₹{Math.round(o.total)}</div>
              <div className="text-sm text-gray-600">{o.paymentMethod} · {o.paymentStatus}</div>
            </div>
          </div>

          {/* Order Items */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-center">Quantity</th>
                  <th className="px-4 py-2 text-right">Price</th>
                  <th className="px-4 py-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {o.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-3">
                        <img src={item.product.images?.[0]} alt="" className="w-12 h-12 object-cover rounded"/>
                        <div>
                          <div className="font-medium">{item.product.name}</div>
                          <div className="text-gray-500 text-xs">{item.product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center">{item.qty}</td>
                    <td className="px-4 py-2 text-right">₹{Math.round(item.product.price * (1 - (item.product.discount || 0)/100))}</td>
                    <td className="px-4 py-2 text-right font-medium">
                      ₹{Math.round(item.qty * item.product.price * (1 - (item.product.discount || 0)/100))}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-medium">
                  <td colSpan="3" className="px-4 py-2 text-right">Total:</td>
                  <td className="px-4 py-2 text-right">₹{Math.round(o.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Order Status */}
          <div className="flex gap-2">
            {['Pending','Processing','Shipped','Delivered','Cancelled'].map(s => (
              <button 
                key={s} 
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  o.status === s 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`} 
                onClick={()=>setStatus(o._id,s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

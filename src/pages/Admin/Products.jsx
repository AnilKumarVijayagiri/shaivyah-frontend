import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import Uploader from '../../components/Uploader'

export default function Products(){
  const empty = { name:'', price:0, discount:0, description:'', fabric:'', color:'', occasion:'', category:'Sarees', images:[], categoriesRef:'' }
  const [list, setList] = useState([])
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(empty)

  const load = async ()=>{
    const { data } = await api.get('/api/products')
    setList(data)
    const c = await api.get('/api/categories')
    setCategories(c.data)
  }
  useEffect(()=>{ load() }, [])

  const save = async () => {
    if (form._id) await api.put(`/api/products/${form._id}`, form)
    else await api.post('/api/products', form)
    setForm(empty); load()
  }
  const del = async (id) => { if (confirm('Delete?')) { await api.delete(`/api/products/${id}`); load() } }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card p-4">
        <h3 className="font-bold mb-2">Create / Edit Product</h3>
        <div className="grid grid-cols-2 gap-3">
          <input className="border rounded-xl px-3 py-2 col-span-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input className="border rounded-xl px-3 py-2" type="number" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)})} />
          <input className="border rounded-xl px-3 py-2" type="number" placeholder="Discount %" value={form.discount} onChange={e=>setForm({...form,discount:Number(e.target.value)})} />
          <select className="border rounded-xl px-3 py-2" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
            {['Sarees','Kurtis','Kurti Sets','Ethnic Frocks','Other'].map(o=> <option key={o} value={o}>{o}</option>)}
          </select>
          <input className="border rounded-xl px-3 py-2" placeholder="Fabric" value={form.fabric} onChange={e=>setForm({...form,fabric:e.target.value})} />
          <input className="border rounded-xl px-3 py-2" placeholder="Color" value={form.color} onChange={e=>setForm({...form,color:e.target.value})} />
          <input className="border rounded-xl px-3 py-2" placeholder="Occasion" value={form.occasion} onChange={e=>setForm({...form,occasion:e.target.value})} />
          {/* Removed extra Select categories dropdown */}
          <textarea className="border rounded-xl px-3 py-2 col-span-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        </div>
        <div className="mt-3 space-y-3">
          <Uploader onUploaded={(urls)=> setForm({...form, images:[...form.images, ...urls]})} />
          <div className="flex gap-2 flex-wrap">
            {form.images.map((url, index) => (
              <div key={index} className="relative group">
                <img 
                  src={url} 
                  className="w-20 h-20 object-cover rounded-xl"
                  alt={`Product image ${index + 1}`}
                />
                <button
                  onClick={() => setForm({...form, images: form.images.filter((_, i) => i !== index)})}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
                {index === 0 && (
                  <div className="absolute bottom-1 left-1 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Main
                  </div>
                )}
              </div>
            ))}
          </div>
          {form.images.length > 1 && (
            <div className="flex gap-2 items-center text-sm text-gray-600">
              <span>Drag images to reorder • First image is the main image</span>
            </div>
          )}
        </div>
        <div className="mt-3 flex gap-2">
          <button className="btn" onClick={save}>{form._id ? 'Update' : 'Create'}</button>
          {form._id && <button className="btn !bg-gray-200 !text-gray-900" onClick={()=>setForm(empty)}>Cancel</button>}
        </div>
      </div>

      {/* Group products by category for admin view */}
      <div className="space-y-8">
        {['Sarees','Kurtis','Kurti Sets','Ethnic Frocks','Other'].map(cat => (
          <div key={cat}>
            <h2 className="text-xl font-bold mb-2">{cat}</h2>
            <div className="space-y-3">
              {list.filter(p => p.category === cat).map(p => (
                <div key={p._id} className="card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={p.images?.[0]||'https://via.placeholder.com/80'} className="w-20 h-20 object-cover rounded-xl"/>
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-gray-500">₹{p.price} · {p.category}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn" onClick={()=>setForm(p)}>Edit</button>
                    <button className="btn !bg-red-600" onClick={()=>del(p._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Gallery(){
  const [imgs, setImgs] = useState([])
  useEffect(()=>{ (async()=>{ const { data } = await api.get('/api/gallery'); setImgs(data) })() }, [])
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Gallery</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {imgs.map(img => (
          <img key={img._id} src={img.imageUrl} alt={img.title||''} className="w-full h-64 object-cover rounded-2xl" />
        ))}
      </div>
      <a href="https://wa.me/918125914279" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 bg-[#25D366] text-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:bg-[#20BA5C] transition-colors z-50"
        >
          <i className="fab fa-whatsapp text-4xl"></i>
      </a>
    </div>
  )
}

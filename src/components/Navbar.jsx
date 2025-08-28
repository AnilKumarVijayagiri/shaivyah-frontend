// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { useAuth } from '../store/useAuth'
// import { useCart } from '../store/useCart'

// export default function Navbar(){
//   const { user, logout } = useAuth()
//   const cart = useCart()
//   const nav = useNavigate()
//   return (
//     <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
//       <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
//         <Link to="/" className="flex items-center gap-2">
//           <img src="/logo-modified.png" alt="shaivyah logo" className="w-7 h-7"/>
//           <span className="text-2xl font-extrabold text-brand-700">Shaivyah</span>
//         </Link>
//         <nav className="flex items-center gap-6">
//           <NavLink to="/" className="link">Home</NavLink>
//           <NavLink to="/sarees" className="link">Sarees</NavLink>
//           <NavLink to="/kurtis" className="link">Kurtis</NavLink>
//           <NavLink to="/kurti-sets" className="link">Kurti Sets</NavLink>
//           <NavLink to="/ethnic-frocks" className="link">Ethnic Frocks</NavLink>
//           <NavLink to="/gallery" className="link">Gallery</NavLink>
//           <NavLink to="/cart" className="link">Cart ({cart.items.length})</NavLink>
//           {user?.role==='admin' ? (
//             <>
//               <NavLink to="/admin" className="text-brand-700 font-semibold">Admin</NavLink>
//               <button className="btn !px-3 !py-1" onClick={()=>{logout();nav('/')}}>Logout</button>
//             </>
//           ) : <NavLink to="/admin/login" className="btn !px-3 !py-1">Admin</NavLink>}
//         </nav>
//       </div>
//     </header>
//   )
// }
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/useAuth'
import { useCart } from '../store/useCart'
import { useState, useEffect } from 'react'

export default function Navbar(){
  const { user, logout } = useAuth()
  const cart = useCart()
  const nav = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 z-10">
            <img src="/logo-modified.png" alt="logo" className="w-7 h-7"/>
            <span className="text-2xl font-extrabold text-brand-700">Shaivyah</span>
          </Link>

          {/* Hamburger button */}
          <button 
            className="lg:hidden z-10 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-gray-800 transform transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-800 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-800 transform transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>

          {/* Navigation menu */}
          <nav className={`${isMobile ? (isMenuOpen ? 'flex' : 'hidden') : 'flex'} 
            ${isMobile ? 'fixed inset-0 bg-white/90 backdrop-blur pt-20' : ''} 
            lg:relative lg:bg-transparent lg:pt-0 lg:flex items-center`}>
            <div className={`flex ${isMobile ? 'flex-col items-center w-full gap-8 text-lg' : 'flex-row items-center gap-6'}`}>
              <NavLink to="/" className="link" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
              <NavLink to="/sarees" className="link" onClick={() => setIsMenuOpen(false)}>Sarees</NavLink>
              <NavLink to="/kurtis" className="link" onClick={() => setIsMenuOpen(false)}>Kurtis</NavLink>
              <NavLink to="/kurti-sets" className="link" onClick={() => setIsMenuOpen(false)}>Kurti Sets</NavLink>
              <NavLink to="/ethnic-frocks" className="link" onClick={() => setIsMenuOpen(false)}>Ethnic Frocks</NavLink>
              <NavLink to="/gallery" className="link" onClick={() => setIsMenuOpen(false)}>Gallery</NavLink>
              <NavLink to="/cart" className="link" onClick={() => setIsMenuOpen(false)}>Cart ({cart.items.length})</NavLink>
              {user?.role==='admin' ? (
                <>
                  <NavLink to="/admin" className="text-brand-700 font-semibold" onClick={() => setIsMenuOpen(false)}>Admin</NavLink>
                  <button className="btn !px-3 !py-1" onClick={()=>{logout();nav('/');setIsMenuOpen(false)}}>Logout</button>
                </>
              ) : <NavLink to="/admin/login" className="btn !px-3 !py-1" onClick={() => setIsMenuOpen(false)}>Admin</NavLink>}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}


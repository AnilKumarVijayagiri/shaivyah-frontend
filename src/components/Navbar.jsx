import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/useAuth'
import { useCart } from '../store/useCart'

export default function Navbar(){
  const { user, logout } = useAuth()
  const cart = useCart()
  const nav = useNavigate()
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="https://instagram.fhyd2-3.fna.fbcdn.net/v/t51.2885-19/530618089_17847919392538885_2041862342983925010_n.jpg?stp=dst-jpg_s320x320_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby45NjguYzIifQ&_nc_ht=instagram.fhyd2-3.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2QENQBd6g78l506WvV9iPEdSuVgQ1px7poXITPVoD6KPRtPSb-UcMMZ-00z-jWuPyyP2CwvhbtNWPO7CHubyY7zQ&_nc_ohc=j7ZIGVbZVS4Q7kNvwE0Zdu7&_nc_gid=xZFMtg8HsthMEUnMOFn7KQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfVFDgY4ut_NOdEczw0ZtsShEsSggN3tI6VIpp88GX6R-w&oe=68B52906&_nc_sid=8b3546" alt="logo" className="w-7 h-7"/>
          <span className="text-2xl font-extrabold text-brand-700">Shaivyah</span>
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink to="/" className="link">Home</NavLink>
          <NavLink to="/sarees" className="link">Sarees</NavLink>
          <NavLink to="/kurtis" className="link">Kurtis</NavLink>
          <NavLink to="/kurti-sets" className="link">Kurti Sets</NavLink>
          <NavLink to="/ethnic-frocks" className="link">Ethnic Frocks</NavLink>
          <NavLink to="/gallery" className="link">Gallery</NavLink>
          <NavLink to="/cart" className="link">Cart ({cart.items.length})</NavLink>
          {user?.role==='admin' ? (
            <>
              <NavLink to="/admin" className="text-brand-700 font-semibold">Admin</NavLink>
              <button className="btn !px-3 !py-1" onClick={()=>{logout();nav('/')}}>Logout</button>
            </>
          ) : <NavLink to="/admin/login" className="btn !px-3 !py-1">Admin</NavLink>}
        </nav>
      </div>
    </header>
  )
}

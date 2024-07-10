import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import "./Navbar.css"
import { toast } from 'sonner';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate();
  const {usersData, setUsersData} = useContext(UserContext)

  // useEffect(() => {
  //     setUsersData(localStorage.getItem('userEmail'))
  // },[localStorage.getItem('userEmail')])


  const handleLogout = () => {
    toast.error('Logout Sucessfully')
    localStorage.removeItem('userEmail');
    setUsersData(null)
    navigate('/login')
  }

  return (
    <nav>
      <Link to='/' className='title'>Clipkart</Link>
      <div className='menu' onClick={()=>{
        setMenuOpen(!menuOpen)
      }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""} >
        <li>
          <NavLink to='/'>PRODUCT</NavLink>
        </li>
        {usersData ? <li>
          <NavLink to='/cart'>CART</NavLink>
        </li> : ''}
        {usersData ? <li>
          <NavLink to='/orders'>ORDER DETAIL</NavLink>
        </li> : ''}
        {usersData ? <li><button className='btn btn-danger' onClick={handleLogout}>LOGOUT</button></li> :<li>
          <NavLink to='/login'>LOGIN</NavLink>
        </li> }
      </ul>
    </nav>
  )
}

export default Navbar

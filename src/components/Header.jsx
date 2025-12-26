import React, { useState, useRef, useEffect } from 'react'
import { User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white border-b border-gray-200 h-[54px] px-[60px]">
      <div className="flex h-full items-center justify-between">

        {/* Logo + Product */}
        <div className="flex items-center gap-4">
          {/* Microsoft Logo */}
          <img
            src="https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png"
            alt=""
            role="presentation"
            aria-hidden="true"
            className="h-[23px] w-auto"
          />

          {/* Divider */}
          <span className="h-6 w-[2px] bg-black" />


          {/* Product Name */}
          <span className="text-[17px] font-semibold text-gray-900">
            CGE Image Evaluator
          </span>
        </div>

        {/* Right Profile Section */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setOpen(!open)}
            data-testid="user-profile-button"
          >
            <span className="text-sm text-gray-700">
              Welcome {user?.name || 'User'}
            </span>

            <div className="w-9 h-9 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-gray-100 transition">
              <User size={18} />
            </div>
          </div>

          {open && (
            <div className="absolute right-0 mt-2 w-36 bg-white shadow-md rounded-md border border-gray-200 py-2 z-50">
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={handleLogout}
                data-testid="logout-button"
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}

export default Header

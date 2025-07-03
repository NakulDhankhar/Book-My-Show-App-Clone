import React from 'react';
import { CONFIG } from '../../constants/config';

const Header = ({ user, onNavigate, onLogout, onFetchBookings, onAdminNavigate }) => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 
          className="text-2xl font-bold cursor-pointer hover:text-red-500 transition-colors"
          onClick={() => onNavigate(CONFIG.PAGES.HOME)}
        >
          🎬 MovieBook
        </h1>
        <nav className="flex items-center space-x-6">
          <button 
            onClick={() => onNavigate(CONFIG.PAGES.HOME)}
            className="hover:text-red-500 transition-colors"
          >
            Home
          </button>
          {user ? (
            <>
              <button 
                onClick={onFetchBookings}
                className="hover:text-red-500 transition-colors"
              >
                My Bookings
              </button>
              {user.role === 'ADMIN' && (
                <>
                  <button 
                    onClick={() => onAdminNavigate(CONFIG.PAGES.ADMIN_THEATRES)}
                    className="hover:text-red-500 transition-colors"
                  >
                    Manage Theatres
                  </button>
                  <button 
                    onClick={() => onAdminNavigate(CONFIG.PAGES.ADMIN_SHOWTIMES)}
                    className="hover:text-red-500 transition-colors"
                  >
                    Manage Showtimes
                  </button>
                  <button 
                    onClick={() => onAdminNavigate(CONFIG.PAGES.ADMIN_MOVIES)}
                    className="hover:text-red-500 transition-colors"
                  >
                    Manage Movies
                  </button>
                </>
              )}
              <span className="text-sm">Welcome, {user.name}</span>
              <button 
                onClick={onLogout}
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="space-x-4">
              <button 
                onClick={() => onNavigate(CONFIG.PAGES.LOGIN)}
                className="hover:text-red-500 transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => onNavigate(CONFIG.PAGES.REGISTER)}
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Register
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header; 
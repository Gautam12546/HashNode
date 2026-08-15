import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, PenSquare, LayoutDashboard, Tags, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
    isActive
      ? 'text-brand-600 dark:text-brand-300 bg-brand-50 dark:bg-brand-500/10'
      : 'text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-300 hover:bg-gray-100 dark:hover:bg-white/5'
  }`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes via a nav click.
  useEffect(() => {
    setMenuOpen(false);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  const initials = user?.name ? user.name.charAt(0).toUpperCase() : '';

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0A0D16]/80 backdrop-blur-md border-b border-gray-200/80 dark:border-white/10">
      <div className="container-custom flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 shrink-0 group" onClick={() => setMenuOpen(false)}>
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-500 text-white font-display font-bold text-lg shadow-glow group-hover:bg-brand-600 transition-colors">
            #
          </span>
          <span className="font-display font-bold text-xl text-[#0F1220] dark:text-white">
            Hash<span className="text-brand-500">Node</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={navLinkClass}>Feed</NavLink>
          <NavLink to="/tags" className={navLinkClass}>Tags</NavLink>
          {user && <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/editor/new" className="btn btn-sm">
                <PenSquare size={15} strokeWidth={2.25} />
                New Post
              </Link>
              <Link
                to={`/profile/${user._id}`}
                className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-500/20 overflow-hidden flex items-center justify-center text-brand-700 dark:text-brand-300 font-semibold ring-1 ring-gray-200 dark:ring-white/10 hover:ring-brand-400 transition-all"
                title={user.name}
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{initials}</span>
                )}
              </Link>
              <button onClick={handleLogout} className="btn btn-outline btn-sm" aria-label="Log out">
                <LogOut size={15} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link to="/register" className="btn btn-sm">Register</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden btn-icon btn-ghost -mr-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-200 ease-out border-t border-gray-200/80 dark:border-white/10 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-custom py-3 flex flex-col gap-1">
          <NavLink to="/" end className={navLinkClass} onClick={() => setMenuOpen(false)}>Feed</NavLink>
          <NavLink to="/tags" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            <span className="inline-flex items-center gap-2"><Tags size={16} /> Tags</span>
          </NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                <span className="inline-flex items-center gap-2"><LayoutDashboard size={16} /> Dashboard</span>
              </NavLink>
              <Link to="/editor/new" className="btn btn-sm justify-start mt-1" onClick={() => setMenuOpen(false)}>
                <PenSquare size={15} /> New Post
              </Link>
              <Link
                to={`/profile/${user._id}`}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <span className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-500/20 overflow-hidden flex items-center justify-center text-brand-700 dark:text-brand-300 text-xs font-semibold">
                  {user.avatarUrl ? <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" /> : initials}
                </span>
                My Profile
              </Link>
              <button onClick={handleLogout} className="btn btn-outline btn-sm justify-start mt-1">
                <LogOut size={15} /> Logout
              </button>
            </>
          ) : (
            <div className="flex gap-2 mt-2">
              <Link to="/login" className="btn btn-outline btn-sm flex-1" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="btn btn-sm flex-1" onClick={() => setMenuOpen(false)}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

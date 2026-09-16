import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from './Button';
import { NotificationPanel } from './NotificationPanel';
import { 
  Bell, 
  ShoppingBag, 
  Mic, 
  Menu, 
  X, 
  ChevronDown, 
  UserCheck, 
  Sparkles,
  Layers
} from 'lucide-react';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    notifications, 
    cart, 
    setIsCartOpen, 
    setIsVoiceAssistantOpen 
  } = useApp();
  
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantityKg, 0);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Farm Hubs', href: '/#hubs' },
    { label: 'For Farmers', href: '/farmer' },
    { label: 'For Buyers', href: '/buyer' },
    { label: 'Logistics', href: '/logistics' },
    { label: 'Escrow', href: '/payments' },
  ];

  const roleLabels: Record<UserRole, { label: string; badge: string; color: string; path: string }> = {
    visitor: { label: 'Public Portal', badge: 'Visitor', color: 'bg-stone-100 text-stone-700', path: '/' },
    farmer: { label: 'Farmer Portal', badge: 'Kisan / FPO', color: 'bg-emerald-100 text-emerald-800', path: '/farmer' },
    hub_manager: { label: 'Farm Hub Ops', badge: 'Hub Manager', color: 'bg-blue-100 text-blue-800', path: '/hub' },
    buyer: { label: 'Bulk Buyer', badge: 'Procurement', color: 'bg-amber-100 text-amber-800', path: '/buyer' },
    admin: { label: 'Network Admin', badge: 'Governance', color: 'bg-purple-100 text-purple-800', path: '/admin' },
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setIsRoleDropdownOpen(false);
    navigate(roleLabels[newRole].path);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200/80 py-2.5'
          : 'bg-[#FBFBFA]/90 backdrop-blur-xs border-b border-stone-200/50 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#0e3022] flex items-center justify-center text-white shadow-xs group-hover:bg-[#125534] transition-colors">
              <span className="text-lg">🌾</span>
            </div>
            <div>
              <span className="font-extrabold text-stone-900 tracking-tight text-base sm:text-lg block leading-tight">
                Smart Farm Network
              </span>
              <span className="text-[10px] text-stone-700 font-semibold tracking-wider uppercase block">
                Direct • Transparent • Smarter
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-[#125534]'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Voice Assistant Button */}
            <button
              onClick={() => setIsVoiceAssistantOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[#125534] text-xs font-semibold hover:bg-emerald-100 transition-colors shadow-2xs"
              title="Launch Kisan Regional Voice Assistant"
            >
              <Mic className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
              <span>Voice</span>
            </button>

            {/* Role Demo Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-stone-200 hover:border-stone-300 transition-all ${roleLabels[role].color}`}
                title="Switch simulated role for testing"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{roleLabels[role].label}</span>
                <span className="md:hidden">{roleLabels[role].badge}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {isRoleDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsRoleDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-stone-200 rounded-xl shadow-xl py-1.5 z-40 text-xs">
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-stone-700 tracking-wider border-b border-stone-100">
                      Switch Role Portal (SIH Demo)
                    </div>
                    {(['visitor', 'farmer', 'hub_manager', 'buyer', 'admin'] as UserRole[]).map((r) => (
                      <button
                        key={r}
                        onClick={() => handleRoleChange(r)}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-stone-50 transition-colors ${
                          role === r ? 'font-bold text-[#125534] bg-emerald-50/50' : 'text-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${role === r ? 'bg-[#125534]' : 'bg-stone-300'}`} />
                          <span>{roleLabels[r].label}</span>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${roleLabels[r].color}`}>
                          {roleLabels[r].badge}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 relative transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                )}
              </button>
              <NotificationPanel
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
              />
            </div>

            {/* Cart / Procurement Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 relative transition-colors"
              aria-label="View procurement cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#125534] text-white text-[10px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/farmer/add">
                <Button size="sm" variant="secondary" className="text-xs">
                  Sell Produce
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button size="sm" className="text-xs">
                  Buy Produce
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              aria-label="Open mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-stone-200 space-y-2 pb-4">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => {
                  setIsVoiceAssistantOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 p-2 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200"
              >
                <Mic className="w-3.5 h-3.5" /> Kisan Voice (తెలుగు)
              </button>
              <Link
                to="/farmer/add"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 p-2 bg-stone-100 text-stone-800 rounded-lg text-xs font-semibold"
              >
                + List Produce
              </Link>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
              <Link to="/farmer" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">Farmer Portal</Button>
              </Link>
              <Link to="/hub" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">Hub Operations</Button>
              </Link>
              <Link to="/buyer" onClick={() => setIsMobileMenuOpen(false)}>
                <Button size="sm" className="w-full">Bulk Buyer Procurement</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

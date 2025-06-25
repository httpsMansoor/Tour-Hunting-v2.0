'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    router.push("/login");
    setMobileMenuOpen(false);
  };

  const toggleMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Bookings", href: "/bookings" },
    { name: "Destinations", href: "/destinations" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const linkStyle = (href) =>
    `relative px-2 py-1 transition duration-200 hover:text-blue-600 ${
      pathname === href ? 'text-blue-600 font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:rounded-full' : ''
    }`;

  return (
    <>
      {/* Global smooth scroll */}
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <img src="/images/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="text-blue-600">Tour</span>
            <span className="text-gray-400">Hunting</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className={linkStyle(link.href)}>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:block">
            {!isLoggedIn ? (
              <div className="space-x-4">
                <Link href="/login" className="text-sm px-4 py-2 border rounded-md text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition duration-200">
                  Login
                </Link>
                <Link href="/register" className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
                  Sign Up
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 border rounded-md text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition duration-200"
              >
                Logout
              </button>
            )}
          </div>

          {/* Hamburger Icon */}
          <button onClick={toggleMenu} className="md:hidden focus:outline-none">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div ref={menuRef} className="md:hidden bg-white border-t shadow transition-all duration-300 ease-in-out">
            <div className="px-4 py-3 space-y-3">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-gray-700 hover:text-blue-600 transition ${
                    pathname === link.href ? "font-semibold text-blue-600 underline" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-2 border-t">
                {!isLoggedIn ? (
                  <>
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block text-blue-600 hover:underline">
                      Login
                    </Link>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="block text-blue-600 hover:underline">
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-red-600 hover:underline"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[#7132CA] font-bold text-lg sm:text-xl"
        >
          <span className="w-12 h-12 flex items-center justify-center">
            <img src="logo.png" alt="" />
          </span>
          LostHive
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[#301CA0] font-medium">
          <Link to="/create">Report Lost Item</Link>
          <Link to="/create">Post Found Item</Link>
          <Link to="/account">My Account</Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg border border-[#7132CA] text-[#7132CA] hover:bg-[#7132CA] hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-lg bg-[#7132CA] text-white hover:bg-[#301CA0] transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#7132CA] text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col px-4 py-4 gap-3 text-[#301CA0]">
            <Link to="/create" onClick={() => setOpen(false)}>Report Lost Item</Link>
            <Link to="/create" onClick={() => setOpen(false)}>Post Found Item</Link>
            <Link to="/account" onClick={() => setOpen(false)}>My Account</Link>

            <div className="flex gap-3 mt-4">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex-1 text-center px-4 py-2 rounded-lg border border-[#7132CA] text-[#7132CA]"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="flex-1 text-center px-4 py-2 rounded-lg bg-[#7132CA] text-white"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

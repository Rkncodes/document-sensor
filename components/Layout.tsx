"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthenticated = !!session;
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ===================== NAVBAR ===================== */}
      <nav className="bg-white shadow-sm">
        <div className="px-6">
          <div className="flex items-center h-16 gap-4">
            {/* Menu Button */}
            {isAuthenticated && (
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 rounded-md hover:bg-gray-100 transition"
                aria-label="Menu"
              >
                <div className="space-y-1">
                  <span className="block w-6 h-0.5 bg-gray-800" />
                  <span className="block w-6 h-0.5 bg-gray-800" />
                  <span className="block w-6 h-0.5 bg-gray-800" />
                </div>
              </button>
            )}

            <h1 className="text-4xl font-bold text-gray-900">
              Document Sensor
            </h1>
          </div>
        </div>
      </nav>

      {/* ===================== SIDEBAR ===================== */}
      {isAuthenticated && menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Sidebar Panel */}
          <div className="w-96 bg-white h-full shadow-xl p-6 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-semibold">Menu</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold hover:text-gray-600 transition"
              >
                ×
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-5 text-lg font-medium">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              <Link href="/history" onClick={() => setMenuOpen(false)}>
                History
              </Link>

              <Link href="/analytics" onClick={() => setMenuOpen(false)}>
                Analytics
              </Link>

              {isAdmin && (
                <Link href="/admin" onClick={() => setMenuOpen(false)}>
                  Admin
                </Link>
              )}
            </nav>

            {/* Spacer */}
            <div className="flex-grow" />

            {/* Developer Section */}
            <div className="mb-6 pt-6 border-t border-gray-200 space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                About Developer
              </p>

              <p className="text-lg font-semibold text-gray-900">
                Rajvinder Kaur
              </p>

              <p className="text-sm text-gray-700 whitespace-nowrap">
                Email: rajvinderkaurpersonal@gmail.com
              </p>

              <a
                href="https://www.linkedin.com/in/rajvinder-kaur-5a2442323/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-black hover:underline"
              >
                LinkedIn: View Profile
              </a>
            </div>

            {/* Sign Out */}
            <SignOutButton />
          </div>

          {/* Backdrop */}
          <div
            className="flex-1 bg-black bg-opacity-30"
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}

      {/* ===================== MAIN CONTENT ===================== */}
      <main>{children}</main>
    </div>
  );
}
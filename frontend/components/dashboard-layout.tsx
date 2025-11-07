"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, Home, CheckSquare, FileCheck, BarChart3, Settings } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "parent" | "child"
  userName?: string
}

const parentNavItems = [
  { href: "/parent", icon: Home, label: "Dashboard", exact: true },
  { href: "/parent/create", icon: CheckSquare, label: "Create Chore" },
  { href: "/parent/chores", icon: FileCheck, label: "My Chores" },
  { href: "/parent/pending", icon: BarChart3, label: "Pending Approvals" },
  { href: "/parent/settings", icon: Settings, label: "Settings" },
]

const childNavItems = [
  { href: "/child", icon: Home, label: "Dashboard", exact: true },
  { href: "/child/available", icon: CheckSquare, label: "Available Chores" },
  { href: "/child/active", icon: FileCheck, label: "My Active Chores" },
  { href: "/child/completed", icon: BarChart3, label: "Completed" },
]

export function DashboardLayout({ children, role, userName = "User" }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const navItems = role === "parent" ? parentNavItems : childNavItems

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-40">
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static left-0 top-0 h-screen w-64 bg-card border-r transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-30`}
      >
        <div className="p-6">
          <Link href={role === "parent" ? "/parent" : "/child"} className="text-2xl font-bold text-primary">
            KidFi
          </Link>
        </div>

        <nav className="px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <Link href="/">
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-0">
        {/* Top Bar */}
        <div className="bg-card border-b p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Hello, {userName} 👋</h1>
          </div>
          <div className="hidden md:block">
            <appkit-button />
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 lg:hidden z-20" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

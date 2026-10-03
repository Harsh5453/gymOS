import { Users, CreditCard, Activity, Wallet, Dumbbell, CalendarDays, TrendingUp, Package, Bell, GitBranch } from 'lucide-react'

export const STEPS = ['Business', 'Modules', 'Experience', 'Blueprint']

// metric / label / pct feed the live preview tiles (demo data)
export const MODULES = [
  { id: 'Members', icon: Users, desc: 'Manage profiles, plans and activity.', metric: '1,284', label: 'active', pct: 80 },
  { id: 'Memberships', icon: CreditCard, desc: 'Build plans and manage renewals.', metric: '3 plans', label: 'Basic, Pro, Elite', pct: 60 },
  { id: 'Attendance', icon: Activity, desc: 'Check-ins, peak hours and occupancy.', metric: '72 / 120', label: 'in the gym', pct: 60 },
  { id: 'Payments', icon: Wallet, desc: 'Track collections, renewals and outstanding dues.', metric: '₹3.42L', label: 'collected', pct: 70 },
  { id: 'Trainers', icon: Dumbbell, desc: 'Schedules, sessions and availability.', metric: '18', label: 'sessions today', pct: 50 },
  { id: 'Classes', icon: CalendarDays, desc: 'Timetables, bookings and capacity.', metric: '9', label: 'classes today', pct: 55 },
  { id: 'Analytics', icon: TrendingUp, desc: 'Understand revenue, attendance and growth.', metric: '+8.1%', label: 'revenue growth', pct: 75 },
  { id: 'Inventory', icon: Package, desc: 'Equipment, maintenance and stock.', metric: '41', label: 'items tracked', pct: 40 },
  { id: 'Notifications', icon: Bell, desc: 'Renewals, dues and operational alerts.', metric: '5', label: 'new alerts', pct: 30 },
  { id: 'Branches', icon: GitBranch, desc: 'Centralized control across locations.', metric: '3', label: 'branches', pct: 50 },
]

export const BUSINESSES = [
  { id: 'boutique', name: 'Boutique Gym', desc: 'Personalized experience and memberships.', modules: ['Members', 'Memberships', 'Attendance', 'Payments', 'Notifications'] },
  { id: 'fitness', name: 'Fitness Center', desc: 'Members, trainers, attendance and payments.', modules: ['Members', 'Memberships', 'Attendance', 'Payments', 'Trainers', 'Analytics', 'Notifications', 'Inventory'] },
  { id: 'functional', name: 'Functional / CrossFit', desc: 'Classes, coaches and performance tracking.', modules: ['Members', 'Classes', 'Trainers', 'Attendance', 'Analytics', 'Notifications'] },
  { id: 'pt', name: 'Personal Training Studio', desc: 'Clients, sessions and trainer schedules.', modules: ['Members', 'Trainers', 'Classes', 'Payments', 'Notifications'] },
  { id: 'multi', name: 'Multi-Branch Gym', desc: 'Branches, staff, members and centralized analytics.', modules: MODULES.map((m) => m.id) },
]

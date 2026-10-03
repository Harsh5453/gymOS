import { LayoutGrid, Users, CreditCard, Activity, Wallet, Dumbbell, TrendingUp, Bell } from 'lucide-react'

export const NAV = [
  { to: '', label: 'Dashboard', icon: LayoutGrid },
  { to: 'members', label: 'Members', module: 'Members', icon: Users },
  { to: 'memberships', label: 'Memberships', module: 'Memberships', icon: CreditCard },
  { to: 'attendance', label: 'Attendance', module: 'Attendance', icon: Activity },
  { to: 'payments', label: 'Payments', module: 'Payments', icon: Wallet },
  { to: 'trainers', label: 'Trainers', module: 'Trainers', icon: Dumbbell },
  { to: 'analytics', label: 'Analytics', module: 'Analytics', icon: TrendingUp },
  { to: 'notifications', label: 'Notifications', module: 'Notifications', icon: Bell },
]

export const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
export const WEEK = [62, 71, 68, 80, 88, 52, 44]
export const MIX = [['Basic', 46, '#5fb8c9'], ['Pro', 34, '#3b6f8f'], ['Elite', 20, '#2a3a52']]

export const MEMBERS = [
  ['Aarav Sharma', 'Pro', 'Active', 92, 'Today', '12 Oct'], ['Riya Mehta', 'Elite', 'Active', 87, 'Yesterday', '18 Oct'],
  ['Kabir Singh', 'Basic', 'Expiring', 71, '3 days ago', '04 Oct'], ['Neha Rao', 'Pro', 'Expiring', 78, 'Today', '07 Oct'],
  ['Vikram Joshi', 'Basic', 'Expiring', 64, '2 days ago', '10 Oct'], ['Ananya Iyer', 'Elite', 'Active', 95, 'Today', '29 Oct'],
  ['Dev Malhotra', 'Pro', 'Active', 83, 'Yesterday', '21 Oct'], ['Sana Qureshi', 'Basic', 'Active', 69, 'Today', '15 Oct'],
  ['Ishaan Nair', 'Elite', 'Active', 90, 'Today', '02 Nov'], ['Tara Bose', 'Pro', 'Inactive', 32, '19 days ago', 'Lapsed'],
  ['Rohan Gupta', 'Basic', 'Inactive', 28, '24 days ago', 'Lapsed'], ['Meher Khan', 'Pro', 'Active', 88, 'Yesterday', '25 Oct'],
  ['Aditya Verma', 'Elite', 'Active', 91, 'Today', '09 Nov'], ['Pooja Nambiar', 'Basic', 'Active', 74, '2 days ago', '17 Oct'],
].map(([name, plan, status, att, last, renewal], id) => ({ id, name, plan, status, att, last, renewal }))

export const TRAINERS = [
  ['Arjun Kapoor', 'Strength Coach', 6, 24, 'Available'], ['Meera Desai', 'Functional Coach', 4, 19, 'In session'],
  ['Kunal Bhatia', 'Cardio & Mobility', 5, 21, 'Available'], ['Sneha Pillai', 'Nutrition & Wellness', 3, 32, 'Off today'],
].map(([name, role, sessions, members, status], id) => ({ id, name, role, sessions, members, status }))

export const PAYMENTS = [
  ['Aarav Sharma', 'Pro · monthly', 1499, 'Paid', '1 Oct'], ['Ishaan Nair', 'Elite · quarterly', 7497, 'Paid', '1 Oct'],
  ['Kabir Singh', 'Basic · monthly', 999, 'Pending', '4 Oct'], ['Rohan Gupta', 'Basic · monthly', 999, 'Overdue', '21 Sep'],
  ['Neha Rao', 'Pro · monthly', 1499, 'Pending', '7 Oct'], ['Tara Bose', 'Pro · monthly', 1499, 'Overdue', '14 Sep'],
  ['Riya Mehta', 'Elite · monthly', 2499, 'Paid', '30 Sep'], ['Dev Malhotra', 'Pro · monthly', 1499, 'Refunded', '28 Sep'],
].map(([name, plan, amount, status, date], id) => ({ id, name, plan, amount, status, date }))

export const PLANS = [
  { name: 'Basic', price: 999, members: 590, features: ['Gym access', 'Locker'] },
  { name: 'Pro', price: 1499, members: 436, features: ['Everything in Basic', 'Group classes', 'Diet plan'] },
  { name: 'Elite', price: 2499, members: 258, features: ['Everything in Pro', 'Personal trainer', 'Priority support'] },
]

export const NOTIFS = [
  { id: 0, text: "Rahul Sharma's membership expires in 3 days.", tag: 'Renewals', time: '12 min ago', read: false },
  { id: 1, text: '₹4,999 payment received.', tag: 'Payments', time: '28 min ago', read: false },
  { id: 2, text: 'Peak occupancy reached 92%.', tag: 'Attendance', time: '1 h ago', read: false },
  { id: 3, text: "12 members haven't visited in 14 days.", tag: 'Retention', time: '3 h ago', read: true },
  { id: 4, text: 'Trainer availability changed.', tag: 'Trainers', time: '5 h ago', read: true },
  { id: 5, text: "Kabir Singh's payment is 3 days overdue.", tag: 'Payments', time: 'Yesterday', read: true },
]

import { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { ConfigProvider } from './hooks/useConfig'
import Loader from './components/Loader'
import MainLayout from './layouts/MainLayout'
import Landing from './pages/Landing'
import Build from './pages/Build'
import WorkspaceLayout from './layouts/WorkspaceLayout'
import Dashboard from './pages/workspace/Dashboard'
import Members from './pages/workspace/Members'
import Memberships from './pages/workspace/Memberships'
import Attendance from './pages/workspace/Attendance'
import Payments from './pages/workspace/Payments'
import Trainers from './pages/workspace/Trainers'
import Analytics from './pages/workspace/Analytics'
import Notifications from './pages/workspace/Notifications'

export default function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  return (
    <MotionConfig reducedMotion="user">
      <ConfigProvider>
        <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>
        <MainLayout>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname.startsWith('/app') ? '/app' : location.pathname}>
              <Route path="/" element={<Landing />} />
              <Route path="/build" element={<Build />} />
              <Route path="/app" element={<WorkspaceLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="members" element={<Members />} />
                <Route path="memberships" element={<Memberships />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="payments" element={<Payments />} />
                <Route path="trainers" element={<Trainers />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="notifications" element={<Notifications />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </MainLayout>
      </ConfigProvider>
    </MotionConfig>
  )
}

import { motion } from 'framer-motion'

export default function Page({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.35, ease: [0.3, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

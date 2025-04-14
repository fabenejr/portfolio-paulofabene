import { motion, AnimatePresence } from "framer-motion"
import { useLocation } from "react-router-dom"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
<<<<<<< HEAD
    <AnimatePresence mode="wait">
=======
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
>>>>>>> main
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
<<<<<<< HEAD
        transition={{ duration: 0.3 }}
=======
        transition={{ 
          duration: 0.3,
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
>>>>>>> main
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
import { motion, AnimatePresence } from "framer-motion"
import { useLocation } from "react-router-dom"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        key={location.pathname}  // Isso garante que a animação é acionada sempre que a rota mudar
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

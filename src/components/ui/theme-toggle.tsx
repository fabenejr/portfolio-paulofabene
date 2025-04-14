import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./button"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const {  setTheme, resolvedTheme } = useTheme()
  const { t } = useTranslation()
  
  useEffect(() => {
    setMounted(true)
    // Apply theme from localStorage or system preference on mount
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [setTheme])

  if (!mounted) {
    return <Button variant="outline" size="icon" disabled />
  }

  const isLight = resolvedTheme === "light"

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        const newTheme = isLight ? "dark" : "light"
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
      }}
      className="relative"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isLight ? "light" : "dark"}
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: 180 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          {isLight ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
        </motion.div>
      </AnimatePresence>
      <span className="sr-only">{t('theme.toggle')}</span>
    </Button>
  )
}
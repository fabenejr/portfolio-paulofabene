import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./button"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const { t } = useTranslation()
  
  useEffect(() => {
    setMounted(true)
    // Apply theme from localStorage or system preference on mount
    try {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        setTheme(savedTheme)
      }
    } catch (error) {
      console.warn('Failed to access localStorage:', error)
    }
  }, [setTheme])

  // Add a special class to the body element when dark mode is active
  useEffect(() => {
    if (mounted) {
      document.body.classList.toggle('dark-theme', resolvedTheme === 'dark');
      
      // Force reflow to ensure all components render correctly with new theme
      window.dispatchEvent(new Event('resize'));
    }
  }, [resolvedTheme, mounted]);

  if (!mounted) {
    return <Button variant="outline" size="icon" disabled className="w-9 h-9 sm:w-10 sm:h-10" />
  }

  const isLight = resolvedTheme === "light"

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        const newTheme = isLight ? "dark" : "light"
        setTheme(newTheme)
        try {
          localStorage.setItem('theme', newTheme)
        } catch (error) {
          console.warn('Failed to save theme to localStorage:', error)
        }
      }}
      className="relative overflow-hidden w-9 h-9 sm:w-10 sm:h-10 p-1.5 sm:p-2"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isLight ? "light" : "dark"}
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: 180 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isLight ? (
            <Sun className="h-[1rem] w-[1rem] sm:h-[1.2rem] sm:w-[1.2rem]" />
          ) : (
            <Moon className="h-[1rem] w-[1rem] sm:h-[1.2rem] sm:w-[1.2rem]" />
          )}
        </motion.div>
      </AnimatePresence>
      <span className="sr-only">{t('theme.toggle')}</span>
    </Button>
  )
}
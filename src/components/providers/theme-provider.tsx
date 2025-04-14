import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
  enableSystem?: boolean
}

const ThemeProviderContext = createContext<{ ready: boolean }>({ ready: false })

export function ThemeProvider({ 
  children,
  defaultTheme = "system",
  storageKey = "portfolio-theme",
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Handle initial theme
    const savedTheme = localStorage.getItem(storageKey)
    if (savedTheme) {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('dark', systemDark)
    }
  }, [storageKey])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProviderContext.Provider value={{ ready: mounted }}>
      <NextThemesProvider
        attribute="class"
        defaultTheme={defaultTheme}
        enableSystem
        disableTransitionOnChange
        storageKey={storageKey}
      >
        {children}
      </NextThemesProvider>
    </ThemeProviderContext.Provider>
  )
}

export const useThemeProvider = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useThemeProvider must be used within a ThemeProvider")
  }
  return context
}
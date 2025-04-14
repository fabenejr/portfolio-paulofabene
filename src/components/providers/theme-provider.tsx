import { createContext, useContext, useEffect, useState } from "react"
<<<<<<< HEAD
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps as NextThemeProviderProps } from "next-themes"

type ThemeProviderProps = Omit<NextThemeProviderProps, "attribute"> & {
=======
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = {
>>>>>>> main
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
  enableSystem?: boolean
<<<<<<< HEAD
  forcedTheme?: string
  attribute?: NextThemeProviderProps["attribute"]
=======
>>>>>>> main
}

const ThemeProviderContext = createContext<{ ready: boolean }>({ ready: false })

export function ThemeProvider({ 
  children,
  defaultTheme = "system",
<<<<<<< HEAD
  storageKey = "ui-theme",
  ...props
=======
  storageKey = "portfolio-theme",
>>>>>>> main
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
<<<<<<< HEAD
    const root = window.document.documentElement
    const initialColorValue = root.classList.contains("dark") ? "dark" : "light"
    root.style.colorScheme = initialColorValue
    setMounted(true)
  }, [])
=======
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
>>>>>>> main

  if (!mounted) {
    return null
  }

  return (
    <ThemeProviderContext.Provider value={{ ready: mounted }}>
      <NextThemesProvider
<<<<<<< HEAD
        {...props}
        defaultTheme={defaultTheme}
=======
        attribute="class"
        defaultTheme={defaultTheme}
        enableSystem
        disableTransitionOnChange
>>>>>>> main
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
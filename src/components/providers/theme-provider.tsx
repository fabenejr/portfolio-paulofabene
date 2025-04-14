import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps as NextThemeProviderProps } from "next-themes"

type ThemeProviderProps = Omit<NextThemeProviderProps, "attribute"> & {
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
  enableSystem?: boolean
  forcedTheme?: string
  attribute?: NextThemeProviderProps["attribute"]
}

const ThemeProviderContext = createContext<{ ready: boolean }>({ ready: false })

export function ThemeProvider({ 
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    const initialColorValue = root.classList.contains("dark") ? "dark" : "light"
    root.style.colorScheme = initialColorValue
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProviderContext.Provider value={{ ready: mounted }}>
      <NextThemesProvider
        {...props}
        defaultTheme={defaultTheme}
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
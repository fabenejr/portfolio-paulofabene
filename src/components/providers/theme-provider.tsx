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
  enableSystem = true
}: ThemeProviderProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <ThemeProviderContext.Provider value={{ ready }}>
      <NextThemesProvider
        attribute="class"
        defaultTheme={defaultTheme}
        enableSystem={enableSystem}
        enableColorScheme
        storageKey={storageKey}
        disableTransitionOnChange
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
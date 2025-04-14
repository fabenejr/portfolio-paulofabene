import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { RootLayout } from "./components/layout/root-layout"
import { HomePage } from "./pages/home"
import { ContactPage } from "./pages/contact"
import { ThemeProvider } from "./components/providers/theme-provider"
import { Toaster } from "./components/ui/toaster"
import "./lib/i18n"

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme" enableSystem>
      <BrowserRouter>
        <Routes>
          <Route path="/fabenejr.github.io" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/fabenejr.github.io" />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  )
}

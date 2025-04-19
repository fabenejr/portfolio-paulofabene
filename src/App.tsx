import { BrowserRouter , Routes, Route, Navigate } from "react-router-dom";
import { RootLayout } from "./components/layout/root-layout"; // Supondo que o RootLayout existe
import { HomePage } from "./pages/home"; // Página Home
import { ContactPage } from "./pages/contact"; // Página Contato
import { ExperiencePage } from "./pages/experience"; // Página Experiência
import { PrivacyPolicyPage } from "./pages/privacy-policy"; // Página Política de Privacidade
import { ThemeProvider } from "./components/providers/theme-provider";
import { Toaster } from "./components/ui/toaster";
import "./lib/i18n";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme" enableSystem>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirecionamento para Home caso rota não exista */}
          <Route path="/" element={<RootLayout />}> {/* Layout raiz */}
            <Route path="home" element={<HomePage />} /> {/* Página Home */}  
            <Route index element={<HomePage />} /> {/* Página Home */}
            <Route path="experience" element={<ExperiencePage />} /> {/* Página Experiência */}
            <Route path="contact" element={<ContactPage />} /> {/* Página Contato */}
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} /> {/* Página Política de Privacidade */}
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirecionamento para Home caso rota não exista */}
          </Route>
        </Routes>
      </BrowserRouter >
      <Toaster />
    </ThemeProvider>
  );
}

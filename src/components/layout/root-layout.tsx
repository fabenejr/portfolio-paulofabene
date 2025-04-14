import { Link, useLocation, Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ThemeProvider } from "next-themes"
import { ThemeToggle } from "../ui/theme-toggle"
import { LanguageSwitcher } from "../ui/language-switcher"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "../ui/navigation-menu"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { PageTransition } from "./page-transition"

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 }
}

export function RootLayout() {
  const { t } = useTranslation()
  const location = useLocation()

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <motion.header 
          className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          initial="hidden"
          animate="visible"
          variants={navVariants}
          transition={{ duration: 0.5 }}
        >
          <div className="container flex h-14 items-center">
            <NavigationMenu className="flex-1">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                      location.pathname === "/" && "bg-accent text-accent-foreground"
                    )}
                    asChild
                  >
                    <Link to="/">Paulo Fabene</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                      location.pathname === "/" && "bg-accent text-accent-foreground"
                    )}
                    asChild
                  >
                    <Link to="/">{t('nav.about')}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                      location.pathname === "/contact" && "bg-accent text-accent-foreground"
                    )}
                    asChild
                  >
                    <Link to="/contact">{t('nav.contact')}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </motion.header>
        <main className="container py-6 min-h-[calc(100vh-8rem)]">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <footer className="border-t py-6 md:py-0">
          <div className="container flex h-14 items-center justify-between">
            <p className="text-sm text-muted-foreground">
              @fabenejr
            </p>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">© 2025</span>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
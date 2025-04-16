import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Button } from "./button"
import { Languages } from "lucide-react"

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [currentLang, setCurrentLang] = useState(i18n.language)
  
  // Update state whenever language changes
  useEffect(() => {
    setCurrentLang(i18n.language)
  }, [i18n.language])

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('i18nextLng', lang)
    // Force a reflow to ensure UI elements update correctly
    window.dispatchEvent(new Event('resize'))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative w-10 h-10">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('language.select')}</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-[9px] font-bold text-primary-foreground shadow-sm border border-primary/30">
            {currentLang.substring(0, 2).toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px] w-[140px]" sideOffset={8} collisionPadding={8}>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('pt')}
          className={`px-3 py-2 ${currentLang === 'pt' ? 'bg-accent/70 font-medium' : ''}`}
        >
          {t('language.pt')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange('en')}
          className={`px-3 py-2 ${currentLang === 'en' ? 'bg-accent/70 font-medium' : ''}`}
        >
          {t('language.en')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
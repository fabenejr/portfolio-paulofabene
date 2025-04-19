import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'
import { useTranslation } from 'react-i18next'
import { Card } from './card'
import { setCookie, getCookie } from '@/lib/cookies'
import { Link } from 'react-router-dom'

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = getCookie('cookieConsent')
    if (!hasConsented) {
      setShowConsent(true)
    }
  }, [])

  const handleAccept = () => {
    setCookie('cookieConsent', 'true', 365) // Cookie válido por 1 ano
    setShowConsent(false)
  }

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md"
        >
          <Card className="p-6 shadow-lg">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">🍪 {t('cookies.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('cookies.description')}
                </p>
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link to="/privacy-policy">
                    {t('cookies.learnMore')}
                  </Link>
                </Button>
                <Button size="sm" onClick={handleAccept}>
                  {t('cookies.accept')}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
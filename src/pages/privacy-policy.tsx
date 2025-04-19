import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function PrivacyPolicyPage() {
  const { t } = useTranslation()

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 max-w-3xl mx-auto"
    >
      <motion.div variants={item}>
        <Card className="bg-card">
          <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">{t('privacy.title')}</h1>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">{t('privacy.cookies.title')}</h2>
              <p className="text-muted-foreground">{t('privacy.cookies.description')}</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>{t('privacy.cookies.essential')}</li>
                <li>{t('privacy.cookies.preferences')}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">{t('privacy.dataUsage.title')}</h2>
              <p className="text-muted-foreground">{t('privacy.dataUsage.description')}</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>{t('privacy.dataUsage.purposes.theme')}</li>
                <li>{t('privacy.dataUsage.purposes.language')}</li>
                <li>{t('privacy.dataUsage.purposes.contact')}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">{t('privacy.rights.title')}</h2>
              <p className="text-muted-foreground">{t('privacy.rights.description')}</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>{t('privacy.rights.access')}</li>
                <li>{t('privacy.rights.delete')}</li>
                <li>{t('privacy.rights.opt_out')}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">{t('privacy.contact.title')}</h2>
              <p className="text-muted-foreground">{t('privacy.contact.description')}</p>
            </section>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
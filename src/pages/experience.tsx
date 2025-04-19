import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Experience } from "@/features/experience/experience"

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

export function ExperiencePage() {
  const { t } = useTranslation()

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <Card className="relative bg-card/50 backdrop-blur-sm">
          <div className="relative z-10 p-6">
            <h1 className="text-3xl font-bold tracking-tighter mb-2">{t('experience.title')}</h1>
            <p className="text-muted-foreground">{t('experience.subtitle')}</p>
          </div>
          <div className="relative">
            <Experience />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
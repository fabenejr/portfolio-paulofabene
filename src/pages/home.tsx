import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OptimizedAvatar } from "@/components/ui/avatar"

// import profileImage from '@/assets/images/profilebeach.jpg'
// Usando a imagem do GitHub para manter atualizado automaticamente
const githubProfileImage = "https://github.com/fabenejr.png";

import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPrisma,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiAmazon,
  SiKubernetes,
  SiServerless,
  SiJavascript
} from "react-icons/si"
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6"

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

// Estilizando corretamente o ícone do Next.js para tema escuro
const TechItem = ({ icon: Icon, label, color }: { icon: any; label: string; color: string }) => {
  // Caso especial para o Next.js no tema escuro
  const isNextJs = label === "Next.js";

  return (
    <motion.div
      variants={item}
      className={`flex items-center gap-2 ${color} px-3 py-1.5 rounded-md bg-background/50 backdrop-blur-sm border tech-item`}
    >
      {isNextJs ? (
        <Icon className="w-4 h-4 dark:text-white" />
      ) : (
        <Icon className="w-4 h-4" />
      )}
      <span className="text-sm font-medium">{label}</span>
    </motion.div>
  );
};

// Ícones sociais com melhor contraste e visibilidade
const SocialLink = ({ href, icon: Icon }: { href: string; icon: any }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center justify-center w-9 h-9 rounded-full text-foreground hover:text-primary transition-colors"
  >
    <Icon className="w-5 h-5" />
  </motion.a>
)

export function HomePage() {
  const { t } = useTranslation()

  return (
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: 20 }}
    >
      <motion.div variants={item}>
        <Card className="bg-background/80 backdrop-blur-sm border shadow-lg">
          <div className="p-6 flex flex-col items-center text-center relative">
            {/* Integrando o avatar com o ripple diretamente */}
            <div className="relative z-20 mb-2">
              <OptimizedAvatar
                src={githubProfileImage}
                alt="Paulo Fabene"
                size="md"
                className="mx-auto"
                withRipple={true}
              />
            </div>

            <div className="space-y-4 z-20 relative">
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                  Paulo Fabene
                </h1>
                <p className="text-muted-foreground">{t('header.role')}</p>
                <p className="text-muted-foreground">{t('header.location')}</p>
              </div>

              <motion.div 
                className="flex flex-wrap justify-center gap-2"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <TechItem icon={SiReact} label="React" color="text-sky-500" />
                <TechItem icon={SiTypescript} label="TypeScript" color="text-blue-500" />
                <TechItem icon={SiNextdotjs} label="Next.js" color="text-foreground" />
                <TechItem icon={SiTailwindcss} label="Tailwind" color="text-teal-500" />
                <TechItem icon={SiNodedotjs} label="Node.js" color="text-green-500" />
                <TechItem icon={SiPrisma} label="Prisma" color="text-indigo-500" />
              </motion.div>

              <div className="flex justify-center gap-2">
                <SocialLink href="https://www.linkedin.com/in/paulofabene/" icon={FaLinkedin} />
                <SocialLink href="https://github.com/fabenejr" icon={FaGithub} />
                <SocialLink href="https://twitter.com/fabenejr" icon={FaXTwitter} />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div variants={item}>
          <Card className="bg-card h-full">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">{t('about.title')}</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{t('about.description')}</p>
                <p>{t('about.passion')}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-card h-full">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">{t('skills.title')}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-3">{t('skills.frontend')}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <TechItem icon={SiReact} label="React" color="text-sky-500" />
                    <TechItem icon={SiNextdotjs} label="Next.js" color="text-foreground" />
                    <TechItem icon={SiTypescript} label="TypeScript" color="text-blue-500" />
                    <TechItem icon={SiTailwindcss} label="Tailwind" color="text-teal-500" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-3">{t('skills.backend')}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <TechItem icon={SiNodedotjs} label="Node.js" color="text-green-500" />
                    <TechItem icon={SiAmazon} label="AWS" color="text-orange-500" />
                    <TechItem icon={SiServerless} label="Serverless" color="text-red-500" />
                    <TechItem icon={SiJavascript} label="JavaScript" color="text-yellow-500" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-3">{t('skills.tools')}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <TechItem icon={SiDocker} label="Docker" color="text-blue-500" />
                    <TechItem icon={SiKubernetes} label="Kubernetes" color="text-blue-600" />
                    <TechItem icon={SiGit} label="Git" color="text-orange-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-3">Database</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <TechItem icon={SiMongodb} label="MongoDB" color="text-green-600" />
                    <TechItem icon={SiPostgresql} label="PostgreSQL" color="text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

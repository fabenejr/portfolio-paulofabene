import { Timeline } from "@/components/ui/timeline"
import { motion } from "framer-motion"
import { Ripple } from "@/components/magicui/ripple"
import { useTranslation } from "react-i18next"
import zenviaLogo from "@/assets/images/companies/zenvialogo.jpg"
import movideskLogo from "@/assets/images/companies/movidesk_logo.jpeg"
import omieLogo from "@/assets/images/companies/omie_logo.png"
import londrisoftLogo from "@/assets/images/companies/londrisoft_logo.jpeg"

const experiences = [
  {
    year: "2023 - Present",
    title: "Back-end Developer",
    company: "Zenvia",
    logo: zenviaLogo,
    iconBg: "#7A1FA2",
    description: "experience.items.zenvia.description",
    skills: ["Node.js", "AWS Lambda", "Chatbots", "API Integration", "JIRA", "Project Management", "Agile Methodologies"]
  },
  {
    year: "2022 - 2023",
    title: "Back-end Developer",
    company: "Movidesk LTDA",
    logo: movideskLogo,
    iconBg: "#0077FF",
    description: "experience.items.movidesk_analyst.description",
    skills: ["Node.js", "TypeScript", "MongoDB", "Redis", "API Development", "Scrum"]
  },
  {
    year: "2021 - 2022",
    title: "Back-end Developer",
    company: "Omiexperience LTDA",
    logo: omieLogo,
    iconBg: "#00A1E4",
    description: "experience.items.movidesk_manager.description",
    skills: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "API Development", "Git"]
  },
  {
    year: "2020 - 2021",
    title: "Full Stack Developer",
    company: "Londrisoft Software Industry",
    logo: londrisoftLogo,
    iconBg: "#4A5568",
    description: "experience.items.londrisoft_implementation.description",
    skills: ["JavaScript", "Node.js", "React", "MySQL", "Git", "Scrum"]
  }
]

export function Experience() {
  const { t } = useTranslation()
  
  const translatedExperiences = experiences.map(exp => ({
    ...exp,
    title: exp.title,
    company: exp.company,
    description: t(exp.description)
  }))

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative z-0">
        <Ripple
          className="absolute inset-0"
          numCircles={4}
          intensity="low"
          mainCircleOpacity={0.15}
        />
      </div>
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Timeline items={translatedExperiences} />
      </motion.div>
    </motion.div>
  )
}
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
    title: "Customer Service Analyst",
    company: "Movidesk LTDA",
    logo: movideskLogo,
    iconBg: "#00A6CE",
    description: "experience.items.movidesk_analyst.description",
    skills: ["Technical Support", "API Testing", "Bug Analysis", "DevTools", "Javascript"]
  },
  {
    year: "2022",
    title: "Implementation Success Manager",
    company: "Movidesk LTDA",
    logo: movideskLogo,
    iconBg: "#00A6CE",
    description: "experience.items.movidesk_manager.description",
    skills: ["Project Management", "Customer Success", "Helpdesk Implementation"]
  },
  {
    year: "2021 - 2022",
    title: "Customer Success Analyst - Implementation",
    company: "Omiexperience LTDA",
    logo: omieLogo,
    iconBg: "#00B98E",
    description: "experience.items.omiexperience.description",
    skills: ["ERP Systems", "Customer Success", "Implementation"]
  },
  {
    year: "2019 - 2021",
    title: "Implementation Analyst",
    company: "Londrisoft Software Industry",
    logo: londrisoftLogo,
    iconBg: "#143C8C",
    description: "experience.items.londrisoft_implementation.description",
    skills: ["System Implementation", "Training", "Requirements Analysis"]
  },
  {
    year: "2018 - 2019",
    title: "Technical Support Analyst",
    company: "Londrisoft Software Industry",
    logo: londrisoftLogo,
    iconBg: "#143C8C",
    description: "experience.items.londrisoft_support.description",
    skills: ["Technical Support", "SQL", "Hardware Configuration", "Firebird database"]
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function Experience() {
  const { t } = useTranslation()
  
  // Translate experience descriptions but keep titles in English
  const translatedExperiences = experiences.map(exp => ({
    ...exp,
    description: t(exp.description)
  }))

  return (
    <motion.div 
      className="mt-8 relative"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background pointer-events-none" />
      <div className="absolute inset-0 -z-10">
        <Ripple 
          intensity="low"
          mainCircleSize={200}
          mainCircleOpacity={0.1}
          numCircles={3}
        />
      </div>
      
      {/* Timeline content */}
      <Timeline items={translatedExperiences} />
    </motion.div>
  )
}
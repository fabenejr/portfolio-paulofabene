import { cn } from "@/lib/utils"
import { Separator } from "./separator"
import { motion } from "framer-motion"
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "./tooltip"
import { useState, useEffect } from "react"

interface TimelineItemProps {
  year: string
  title: string
  company: string
  description: string
  logo?: string
  iconBg?: string
  skills?: string[]
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

function CompanyLogo({ logo, company, iconBg }: { logo?: string; company: string; iconBg?: string }) {
  const [hasError, setHasError] = useState(false)
  const initial = company.charAt(0).toUpperCase()

  useEffect(() => {
    if (logo) {
      console.log(`Tentando carregar logo para ${company}:`, logo)
    }
  }, [logo, company])

  const handleImageError = (error: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Erro ao carregar logo para ${company}:`, error)
    setHasError(true)
  }

  if (!logo || hasError) {
    return (
      <div 
        className="w-10 h-10 rounded-full overflow-hidden border border-border/50 shadow-sm flex items-center justify-center font-semibold text-white"
        style={{ backgroundColor: iconBg || 'hsl(var(--primary))' }}
      >
        {initial}
      </div>
    )
  }

  return (
    <div className="w-10 h-10 rounded-full overflow-hidden border border-border/50 shadow-sm">
      <img 
        src={logo} 
        alt={`${company} logo`} 
        className="w-full h-full object-cover"
        onError={handleImageError}
        loading="lazy"
      />
    </div>
  )
}

export function TimelineItem({ year, title, company, description, logo, iconBg, skills }: TimelineItemProps) {
  return (
    <motion.div 
      className="relative grid gap-4 pb-1 pl-10 last:pb-0 group rounded-lg p-4 transition-colors hover:bg-accent/5"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="absolute left-0 top-1 h-full w-px bg-border group-hover:bg-primary/50 transition-colors">
        <motion.div 
          className="absolute -left-1 top-4 h-2 w-2 rounded-full bg-primary group-hover:scale-125 transition-transform"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <TooltipProvider>
            <TooltipRoot>
              <TooltipTrigger asChild>
                <div className="cursor-pointer mt-1">
                  <CompanyLogo logo={logo} company={company} iconBg={iconBg} />
                </div>
              </TooltipTrigger>
              <TooltipContent sideOffset={5}>
                <p className="font-medium">{company}</p>
              </TooltipContent>
            </TooltipRoot>
          </TooltipProvider>
          <div className="space-y-1">
            <div className="text-base font-semibold group-hover:text-primary transition-colors">{title}</div>
            <div className="text-sm text-muted-foreground">{company}</div>
            <motion.div 
              className="text-sm text-muted-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {description}
            </motion.div>
          </div>
        </div>
        <div className="text-sm tabular-nums text-muted-foreground whitespace-nowrap group-hover:text-primary transition-colors">{year}</div>
      </div>
      
      {skills && skills.length > 0 && (
        <motion.div 
          className="flex flex-wrap gap-2 ml-[52px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {skills.map((skill, index) => (
            <span 
              key={index}
              className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors border-transparent bg-primary/5 text-primary hover:bg-primary/10"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

interface TimelineProps {
  items: TimelineItemProps[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {items.map((item, index) => (
        <div key={index}>
          <TimelineItem {...item} />
          {index !== items.length - 1 && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Separator className="my-8" />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  )
}
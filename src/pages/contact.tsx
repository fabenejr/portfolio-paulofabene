import { useTranslation } from "react-i18next"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Send, Mail, User, MessageSquare, Phone, Building } from "lucide-react"
import emailjs from '@emailjs/browser'
import { useToast } from "@/hooks/use-toast"

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

export function ContactPage() {
  const { t } = useTranslation()
  const { toast } = useToast()
  
  interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
  }
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get today's date formatted
  const getCurrentDate = () => {
    const now = new Date()
    return now.toLocaleDateString()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Initialize EmailJS with your user ID
      emailjs.init("hNeTPqn9QgNhTXVy-")
      
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
        date: getCurrentDate()
      }

      await emailjs.send(
        'service_0zhdjeg',
        'template_fkbh4fq',
        templateParams
      )

      toast({
        variant: "success",
        title: "Success!",
        description: "Your message has been sent successfully.",
      })

      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
    } catch (error) {
      console.error('Error sending email:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div 
      className="max-w-lg mx-auto"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Card className="bg-card">
          <div className="p-6 space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">{t('contact.title')}</h1>
              <p className="text-muted-foreground">
                {t('contact.description')}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div 
                className="space-y-2"
                variants={item}
              >
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {t('contact.name')}
                </Label>
                <Input 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-input"
                  required 
                  disabled={isSubmitting}
                  placeholder={t('contact.placeholders.name')}
                />
              </motion.div>

              <motion.div 
                className="space-y-2"
                variants={item}
              >
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {t('contact.email')}
                </Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-input"
                  required 
                  disabled={isSubmitting}
                  placeholder={t('contact.placeholders.email')}
                />
              </motion.div>

              <motion.div 
                className="space-y-2"
                variants={item}
              >
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {t('contact.phone')}
                </Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-input"
                  disabled={isSubmitting}
                  placeholder={t('contact.placeholders.phone')}
                />
              </motion.div>

              <motion.div 
                className="space-y-2"
                variants={item}
              >
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  {t('contact.company')}
                </Label>
                <Input 
                  id="company" 
                  name="company" 
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="bg-input"
                  disabled={isSubmitting}
                  placeholder={t('contact.placeholders.company')}
                />
              </motion.div>

              <motion.div 
                className="space-y-2"
                variants={item}
              >
                <Label htmlFor="message" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  {t('contact.message')}
                </Label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full min-h-[150px] rounded-md border bg-input p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                  disabled={isSubmitting}
                  placeholder={t('contact.placeholders.message')}
                />
              </motion.div>

              <motion.div variants={item}>
                <Button 
                  type="submit" 
                  className="w-full relative" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t('contact.submit')}
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
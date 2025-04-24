"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, MessageSquare, Globe, Users, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/animated-section"

interface CultureData {
  name: string
  region: string
  population: string
  language: string
  location: string
  description: string
  traditions: string
  lifestyle: string
  images: string[]
}

export default function CultureDetailPage() {
  const { id } = useParams()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("about")
  const [culture, setCulture] = useState<CultureData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCultureData = async () => {
      try {
        const response = await fetch(`/api/cultures/${id}`)
        if (!response.ok) throw new Error('Failed to fetch culture data')
        const data = await response.json()
        setCulture(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load culture data')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchCultureData()
  }, [id])

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-16 pb-16 flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading culture data...</div>
      </div>
    )
  }

  if (error || !culture) {
    return (
      <div className="min-h-screen pt-16 pb-16 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error || 'Culture not found'}</div>
        <Button asChild variant="outline" className="ml-4">
          <Link href="/cultures">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Cultures
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 pb-16">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={culture.images[0] || "/placeholder.svg"}
            alt={culture.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Button asChild variant="outline" size="sm" className="mb-4 backdrop-blur-sm bg-background/30">
                <Link href="/cultures">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Cultures
                </Link>
              </Button>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-heading font-bold mb-2"
            >
              {culture.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-muted-foreground"
            >
              {culture.region}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar with Key Information */}
          <AnimatedSection className="order-2 lg:order-1" delay={0.2} direction="right">
            <div className="bg-muted/50 backdrop-blur-sm rounded-lg p-6 sticky top-24 border border-border">
              <h3 className="text-xl font-heading font-semibold mb-6">Key Information</h3>

              <div className="space-y-6">
                <div className="flex items-start group">
                  <Globe className="h-5 w-5 mr-3 mt-0.5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="font-medium">Region</p>
                    <p className="text-muted-foreground">{culture.region}</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{culture.location}</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <Users className="h-5 w-5 mr-3 mt-0.5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="font-medium">Population</p>
                    <p className="text-muted-foreground">{culture.population}</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <Calendar className="h-5 w-5 mr-3 mt-0.5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="font-medium">Language</p>
                    <p className="text-muted-foreground">{culture.language}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full group">
                      <MessageSquare className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      Talk to a Representative
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Chat with a {culture.name} Representative</DialogTitle>
                      <DialogDescription>
                        This is a simulated chat experience. In a real application, this would connect to an AI-powered
                        chat system.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="bg-muted p-4 rounded-md h-[300px] flex items-center justify-center">
                      <p className="text-center text-muted-foreground">
                        [AI Chat Interface Placeholder]
                        <br />
                        This would connect to a backend AI service in a real implementation.
                      </p>
                    </div>
                    <Button onClick={() => setIsChatOpen(false)}>Close</Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </AnimatedSection>

          {/* Main Content Area */}
          <AnimatedSection className="order-1 lg:order-2 lg:col-span-2" delay={0.1} direction="left">
            <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8 bg-background/50 backdrop-blur-sm p-1 border border-border">
                <TabsTrigger value="about" className="data-[state=active]:bg-primary/10">
                  About
                </TabsTrigger>
                <TabsTrigger value="traditions" className="data-[state=active]:bg-primary/10">
                  Traditions
                </TabsTrigger>
                <TabsTrigger value="lifestyle" className="data-[state=active]:bg-primary/10">
                  Lifestyle
                </TabsTrigger>
                <TabsTrigger value="gallery" className="data-[state=active]:bg-primary/10">
                  Gallery
                </TabsTrigger>
              </TabsList>

              <motion.div key={activeTab} initial="hidden" animate="visible" variants={fadeInVariants}>
                <TabsContent value="about" className="mt-0">
                  <h2 className="text-3xl font-heading font-bold mb-6">About the {culture.name}</h2>
                  <p className="text-lg leading-relaxed mb-6">{culture.description}</p>
                </TabsContent>

                <TabsContent value="traditions" className="mt-0">
                  <h2 className="text-3xl font-heading font-bold mb-6">Traditions & Beliefs</h2>
                  <p className="text-lg leading-relaxed mb-6">{culture.traditions}</p>
                </TabsContent>

                <TabsContent value="lifestyle" className="mt-0">
                  <h2 className="text-3xl font-heading font-bold mb-6">Lifestyle & Society</h2>
                  <p className="text-lg leading-relaxed mb-6">{culture.lifestyle}</p>
                </TabsContent>

                <TabsContent value="gallery" className="mt-0">
                  <h2 className="text-3xl font-heading font-bold mb-6">Photo Gallery</h2>
                  <Carousel className="w-full">
                    <CarouselContent>
                      {culture.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <div className="overflow-hidden rounded-lg">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`${culture.name} - Image ${index + 1}`}
                                className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                            <p className="mt-2 text-center text-muted-foreground">
                              {culture.name} cultural imagery
                            </p>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </TabsContent>
              </motion.div>
            </Tabs>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
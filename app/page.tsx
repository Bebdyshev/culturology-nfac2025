"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/animated-section"
import { StaggeredChildren } from "@/components/staggered-children"
import { ArrowRight } from "lucide-react"
import { Typewriter } from "react-simple-typewriter"

const quotes = [
  {
    text: "We may have different religions, different languages, different colored skin, but we all belong to one human race",
    author: "Kofi Annan",
    position: "7th UN Secretary General",
  },
  {
    text: "Culture is the widening of the mind and of the spirit.",
    author: "Jawaharlal Nehru",
    position: "1st Prime Minister of India",
  },
  {
    text: "A nation’s culture resides in the hearts and in the soul of its people.",
    author: "Mahatma Gandhi",
    position: "Leader of Indian Independence Movement",
  },
  {
    text: "Preservation of one’s own culture does not require contempt or disrespect for other cultures.",
    author: "Cesar Chavez",
    position: "American Labor Leader and Civil Rights Activist",
  },
  {
    text: "Culture makes people understand each other better. And if they understand each other better in their soul, it is easier to overcome the economic and political barriers.",
    author: "Paulo Coelho",
    position: "Brazilian Lyricist and Novelist",
  },
]

export default function Home() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }, 15000) // меняется каждые 8 секунд

    return () => clearInterval(interval)
  }, [])

  const current = quotes[index]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1742201587774-f44fe79556f9?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=1080&width=1920')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background"></div>
      </div>
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight leading-tight">
              <span className="block">Discover the World's</span>
              <span className="text-primary">Indigenous Cultures</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl mb-10 text-muted-foreground font-light"
            >
              Explore the rich heritage, traditions, and wisdom of indigenous peoples around the world.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="text-lg group">
                <Link href="/cultures">
                  Explore Cultures
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          >
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-primary/50 rounded-full mt-1"></div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Cultures Section */}
      <AnimatedSection className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Featured Indigenous Cultures</h2>
            <p className="text-xl text-muted-foreground">
              Discover the unique traditions and lifestyles of these remarkable communities
            </p>
          </div>

          <StaggeredChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: "sami", name: "Sámi", region: "Northern Europe", image: "https://www.visitfinland.com/dam/jcr:6772beb0-3aad-45a0-b0ea-3a47df570311/___Lapland_People_Sami_Mikko%20Ryh%C3%A4nen.12414660736871135524.jpg" },
              { id: "hmong", name: "Hmong", region: "Southeast Asia", image: "https://i0.wp.com/sahanjournal.com/wp-content/uploads/2023/04/resized-photos-2023-09-08T132200.543.jpg?fit=1800%2C1200&ssl=1" },
              { id: "maori", name: "Māori", region: "New Zealand", image: "https://kaitiaki.co.nz/wp-content/uploads/2016/08/maori-culture-new-plymouth.jpg" },
            ].map((culture) => (
              <Link
                href={`/cultures/${culture.id}`}
                key={culture.id}
                className="group block overflow-hidden rounded-lg bg-background/50 backdrop-blur-sm border border-border hover:border-primary transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={culture.image || "/placeholder.svg"}
                    alt={culture.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-semibold mb-2">{culture.name}</h3>
                  <p className="text-muted-foreground">{culture.region}</p>
                  <div className="mt-4 overflow-hidden">
                    <span className="inline-flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
                      Discover
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </StaggeredChildren>

          <AnimatedSection className="mt-16 text-center" delay={0.4}>
            <Button asChild size="lg" className="group">
              <Link href="/cultures">
                View All Cultures
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </AnimatedSection>

      {/* Quote Section */}
      <AnimatedSection className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl text-primary/20 font-serif mb-6">"</div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading italic mb-8 leading-relaxed min-h-[100px]">
            <Typewriter
              key={index} // перезапускает анимацию
              words={[current.text]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={20}
              deleteSpeed={30}
              delaySpeed={2000}
            />
          </h2>
          <p className="text-xl text-primary font-medium transition-opacity duration-500">
            {current.author}
          </p>
          <p className="text-muted-foreground transition-opacity duration-500">
            {current.position}
          </p>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
    </AnimatedSection>
    </div>
  )
}

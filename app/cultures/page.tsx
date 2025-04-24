"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import axios from "@/lib/axios"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/animated-section"
import { ShimmerCard } from "@/components/shimmer-card"

type Culture = {
  id: string
  key: string
  name: string
  region: string
  continent: string
  images: string[]
}

const continents = ["All", "Africa", "Asia", "Europe", "North America", "Oceania", "South America"]

export default function CulturesPage() {
  const [cultures, setCultures] = useState<Culture[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContinent, setSelectedContinent] = useState("All")

  useEffect(() => {
    const fetchCultures = async () => {
      try {
        setLoading(true)
        const res = await axios.get("/cultures")
        setCultures(res.data)
      } catch (err) {
        console.error("Failed to fetch cultures:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCultures()
  }, [])
  console.log(cultures)
  const filteredCultures = cultures.filter((culture) => {
    const matchesSearch =
      culture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      culture.region.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesContinent = selectedContinent === "All" || culture.continent === selectedContinent

    return matchesSearch && matchesContinent
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        <AnimatedSection className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Indigenous Cultures</h1>
          <p className="text-xl text-muted-foreground">
            Explore the rich diversity of indigenous peoples from around the world, their traditions, languages, and
            ways of life.
          </p>
        </AnimatedSection>

        {/* Search and Filter */}
        <AnimatedSection className="max-w-4xl mx-auto mb-12" delay={0.2}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search cultures or regions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedContinent} onValueChange={setSelectedContinent}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by continent" />
                </SelectTrigger>
                <SelectContent>
                  {continents.map((continent) => (
                    <SelectItem key={continent} value={continent}>
                      {continent}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </AnimatedSection>

        {/* Loading State */}
        {loading ? (
        <AnimatedSection className="mb-12" delay={0.2}>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ShimmerCard key={`shimmer-${index}`} />
            ))}
          </div>
        </AnimatedSection>
        ) : filteredCultures.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredCultures.map((culture) => (
              <motion.div key={`${culture.id}-${culture.name}`} variants={itemVariants}>
                <Link href={`/cultures/${culture.key}`} passHref>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-500 hover:border-primary/50 group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={culture.images[0] || "/placeholder.svg"}
                      alt={culture.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <h3 className="text-xl font-heading font-semibold">{culture.name}</h3>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-muted-foreground">{culture.region}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full group-hover:bg-primary/10 transition-colors duration-300"
                    >
                      <span>Learn More</span>
                    </Button>
                  </CardFooter>
                </Card>
              </Link>

              </motion.div>
            ))}
          </motion.div>
        ) : (
          <AnimatedSection className="text-center py-16" delay={0.3}>
            <h3 className="text-2xl font-medium mb-4">No cultures found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedContinent("All")
              }}
            >
              Reset Filters
            </Button>
          </AnimatedSection>
        )}
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import { StaggeredChildren } from "@/components/staggered-children"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <AnimatedSection className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">About Culturology</h1>
          <p className="text-xl text-muted-foreground">
            Dedicated to preserving and sharing the rich heritage of indigenous cultures around the world.
          </p>
        </AnimatedSection>

        {/* Mission Section */}
        <AnimatedSection className="max-w-3xl mx-auto mb-24" delay={0.2}>
          <h2 className="text-3xl font-heading font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-6 leading-relaxed">
            Culturology is dedicated to documenting, preserving, and sharing the rich cultural heritage of indigenous
            peoples around the world. We believe that indigenous knowledge systems, languages, and traditions represent
            invaluable human heritage that deserves recognition and protection.
          </p>
          <p className="text-lg mb-6 leading-relaxed">
            Through digital storytelling, educational resources, and community partnerships, we aim to increase
            awareness and appreciation of indigenous cultures while supporting indigenous-led efforts to maintain
            cultural continuity in a rapidly changing world.
          </p>
          <p className="text-lg leading-relaxed">
            Our platform serves as a bridge between indigenous communities and a global audience, fostering
            cross-cultural understanding and respect while highlighting the contemporary relevance of indigenous wisdom
            and practices.
          </p>
        </AnimatedSection>

        {/* Values Section */}
        <StaggeredChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24" delay={0.3}>
          <div className="bg-muted/50 backdrop-blur-sm p-8 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
            <h3 className="text-xl font-heading font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
              Respect
            </h3>
            <p className="leading-relaxed">
              We approach all cultures with deep respect, recognizing the sovereignty of indigenous peoples over their
              cultural heritage and knowledge systems.
            </p>
          </div>

          <div className="bg-muted/50 backdrop-blur-sm p-8 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
            <h3 className="text-xl font-heading font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
              Authenticity
            </h3>
            <p className="leading-relaxed">
              We are committed to accurate representation, working directly with community members and cultural experts
              to ensure authentic portrayal.
            </p>
          </div>

          <div className="bg-muted/50 backdrop-blur-sm p-8 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
            <h3 className="text-xl font-heading font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
              Reciprocity
            </h3>
            <p className="leading-relaxed">
              We believe in giving back to the communities whose cultures we feature, through revenue sharing,
              educational initiatives, and advocacy.
            </p>
          </div>
        </StaggeredChildren>

        {/* Team Section */}
        <AnimatedSection className="max-w-4xl mx-auto mb-24" delay={0.4}>
          <h2 className="text-3xl font-heading font-bold mb-12 text-center">Our Team</h2>

          <StaggeredChildren
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            delay={0.1}
            staggerDelay={0.15}
          >
            {[
              {
                name: "Dr. Maya Johnson",
                role: "Founder & Cultural Anthropologist",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Thomas Nguyen",
                role: "Indigenous Liaison & Researcher",
                image: "/placeholder.svg?height=300&width=300",
              },
              { name: "Anika Patel", role: "Digital Archivist", image: "/placeholder.svg?height=300&width=300" },
              {
                name: "James Wilson",
                role: "Educational Content Director",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Sofia Rodriguez",
                role: "Community Partnerships Manager",
                image: "/placeholder.svg?height=300&width=300",
              },
              { name: "Kwame Osei", role: "Multimedia Producer", image: "/placeholder.svg?height=300&width=300" },
            ].map((member, index) => (
              <div key={index} className="text-center group">
                <div className="aspect-square overflow-hidden rounded-full mb-4 mx-auto max-w-[200px] border-2 border-transparent group-hover:border-primary transition-all duration-500">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-heading font-semibold group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </StaggeredChildren>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection
          className="bg-primary/10 rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden"
          delay={0.5}
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-heading font-bold mb-4">Join Our Mission</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Whether you're an anthropologist, indigenous community member, educator, or simply passionate about
              cultural preservation, we invite you to join our global community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="/cultures">
                  Explore Cultures
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

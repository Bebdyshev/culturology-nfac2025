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
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">About <span className="text-primary">Cultural Bridge</span></h1>
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
        </AnimatedSection>

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
                name: "Berdyshev Kerey",
                role: "Full-stack & AI Engineer",
                image: "/placeholder.svg?height=300&width=300",
              },
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
      </div>
    </div>
  )
}

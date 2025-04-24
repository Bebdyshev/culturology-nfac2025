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
        <AnimatedSection className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">About <span className="text-primary">Cultural Bridge</span></h1>
          <p className="text-xl text-muted-foreground">
            Dedicated to preserving and sharing the rich heritage of indigenous cultures around the world.
          </p>
        </AnimatedSection>

        <AnimatedSection className="max-w-4xl mx-auto mb-24" delay={0.1}>
          <h2 className="text-3xl font-heading font-bold mb-12 text-center">Our team</h2>

          <StaggeredChildren
            className="flex item-center justify-center gap-8 flex-wrap"
            delay={0.1}
          >
              <div className="text-center group">
                <div className="aspect-square overflow-hidden rounded-full mb-4 mx-auto max-w-[250px] border-2 border-transparent group-hover:border-primary transition-all duration-500">
                  <img
                    src={"https://media.licdn.com/dms/image/v2/D5603AQFBuGxajANzZw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723446562831?e=1750896000&v=beta&t=e60r6g1Ij-T4XqkSkAY_RJo2ZvIXeMH_GDtGAVUaqkk"}
                    alt={"Berdyshev Kerey"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-heading font-semibold group-hover:text-primary transition-colors duration-300">
                  {"Berdyshev Kerey"}
                </h3>
                <p className="text-muted-foreground">{"Full-stack & AI Engineer"}</p>
              </div>
          </StaggeredChildren>
        </AnimatedSection>

        <AnimatedSection className="max-w-3xl mx-auto mb-24" delay={0.3}>
          <h2 className="text-3xl font-heading font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-6 leading-relaxed">
            Cultural Bridge is dedicated to documenting, preserving, and sharing the rich cultural heritage of indigenous
            peoples around the world. We believe that indigenous knowledge systems, languages, and traditions represent
            invaluable human heritage that deserves recognition and protection.
          </p>
        </AnimatedSection>
      </div>
    </div>
  )
}

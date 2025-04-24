"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

type CultureMapProps = {
  coordinates: [number, number, number]
  cultureName: string
}

export default function CultureMap({ coordinates, cultureName }: CultureMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !mapInstanceRef.current) {
      // Fix for Leaflet icon issues in Next.js
      if (L.Icon.Default.imagePath === "") {
        L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.7.1/dist/images/"
        L.Icon.Default.prototype.options.iconUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
        L.Icon.Default.prototype.options.shadowUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"
        L.Icon.Default.prototype.options.iconRetinaUrl =
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png"
      }

      // Create map
      const map = L.map(mapRef.current).setView(coordinates, 5)
      mapInstanceRef.current = map

      // Add dark theme map tiles
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map)


      // Add a circle to highlight the region
      L.circle(coordinates, {
        color: "#D97706", // Amber-600
        fillColor: "#D97706",
        fillOpacity: 0.2,
        radius: coordinates[2],
      }).addTo(map)

      // Clean up on unmount
      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove()
          mapInstanceRef.current = null
        }
      }
    }
  }, [coordinates, cultureName])

  return <div ref={mapRef} className="w-full h-full min-h-[400px]" />
}

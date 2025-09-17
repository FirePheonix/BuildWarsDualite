"use client"

import type { Event } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Star } from "lucide-react"
import Image from "next/image"

interface FeaturedEventsProps {
  events: Event[]
  onBuyTickets: (event: Event) => void
}

export function FeaturedEvents({ events, onBuyTickets }: FeaturedEventsProps) {
  // Get featured events (published events with high ticket sales)
  const featuredEvents = events
    .filter((event) => event.status === "published")
    .sort((a, b) => b.ticketsSold - a.ticketsSold)
    .slice(0, 3)

  const formatDate = (date: string, time: string) => {
    const eventDate = new Date(`${date}T${time}`)
    return eventDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (featuredEvents.length === 0) return null

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Star className="h-6 w-6 text-accent" />
        <h2 className="text-2xl font-bold text-foreground">Featured Events</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {featuredEvents.map((event, index) => (
          <Card
            key={event.id}
            className={`overflow-hidden hover:shadow-lg transition-shadow ${
              index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
            }`}
          >
            <div className={`relative ${index === 0 ? "h-80" : "h-48"}`}>
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-accent text-accent-foreground">Featured</Badge>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className={`font-bold mb-2 text-balance ${index === 0 ? "text-2xl" : "text-lg"}`}>{event.title}</h3>
                <div className="flex items-center gap-4 text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(event.date, event.time)}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.location.split(",")[0]}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="h-4 w-4" />
                    {event.ticketsSold} attending
                  </div>
                  <Button onClick={() => onBuyTickets(event)} size={index === 0 ? "default" : "sm"}>
                    From ${event.price}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

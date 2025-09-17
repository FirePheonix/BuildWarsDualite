"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { TicketPurchaseModal } from "@/components/ticket-purchase-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockEvents, mockTickets } from "@/lib/mock-data"
import { Calendar, MapPin, Users, Clock, Share2, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function EventDetailsPage() {
  const params = useParams()
  const eventId = params.id as string
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)

  const event = mockEvents.find((e) => e.id === eventId)
  const eventTickets = mockTickets.filter((ticket) => ticket.eventId === eventId)

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Event Not Found</h1>
            <Link href="/">
              <Button>Back to Events</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const formatDate = (date: string, time: string) => {
    const eventDate = new Date(`${date}T${time}`)
    return {
      full: eventDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: eventDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  const dateInfo = formatDate(event.date, event.time)
  const ticketsAvailable = event.capacity - event.ticketsSold

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 text-gray-900">{event.category}</Badge>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Event Details */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-4 text-balance">{event.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{event.description}</p>
            </div>

            {/* Event Info */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Event Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-accent" />
                    <div>
                      <div className="font-medium">{dateInfo.full}</div>
                      <div className="text-sm text-muted-foreground">Date</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-accent" />
                    <div>
                      <div className="font-medium">{dateInfo.time}</div>
                      <div className="text-sm text-muted-foreground">Time</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-accent" />
                    <div>
                      <div className="font-medium">{event.location}</div>
                      <div className="text-sm text-muted-foreground">Venue</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-accent" />
                    <div>
                      <div className="font-medium">{ticketsAvailable} available</div>
                      <div className="text-sm text-muted-foreground">Tickets remaining</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About the Event */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About This Event</h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    This is an incredible opportunity to be part of something special. Our event brings together
                    passionate individuals from all walks of life to create unforgettable memories and meaningful
                    connections.
                  </p>
                  <p>
                    Whether you're a first-time attendee or a returning participant, you'll find something new and
                    exciting at every turn. Join us for an experience that will leave you inspired and energized.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Purchase */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Get Your Tickets</h3>

                <div className="space-y-4 mb-6">
                  {eventTickets.map((ticket) => (
                    <div key={ticket.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{ticket.type}</div>
                        <div className="text-sm text-muted-foreground">{ticket.quantity - ticket.sold} remaining</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">${ticket.price}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button onClick={() => setShowPurchaseModal(true)} className="w-full" size="lg">
                  Buy Tickets
                </Button>

                <div className="mt-4 text-center text-sm text-muted-foreground">
                  {event.ticketsSold} of {event.capacity} tickets sold
                </div>
              </CardContent>
            </Card>

            {/* Event Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Event Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Capacity</span>
                    <span className="font-medium">{event.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tickets Sold</span>
                    <span className="font-medium">{event.ticketsSold}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Availability</span>
                    <span className="font-medium">
                      {Math.round((ticketsAvailable / event.capacity) * 100)}% available
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organizer Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Organized by</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">EventHub Team</div>
                    <div className="text-sm text-muted-foreground">Professional event organizer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <TicketPurchaseModal event={event} isOpen={showPurchaseModal} onClose={() => setShowPurchaseModal(false)} />
    </div>
  )
}

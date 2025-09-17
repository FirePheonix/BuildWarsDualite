"use client"

import type { Event } from "@/lib/mock-data"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface EventCardProps {
  event: Event
  onEdit?: (event: Event) => void
  onViewTickets?: (event: Event) => void
  showActions?: boolean
}

export function EventCard({ event, onEdit, onViewTickets, showActions = false }: EventCardProps) {
  const formatDate = (date: string, time: string) => {
    const eventDate = new Date(`${date}T${time}`)
    return {
      date: eventDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      time: eventDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      full: eventDate.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const dateInfo = formatDate(event.date, event.time)
  const ticketsAvailable = event.capacity - event.ticketsSold
  const soldOutPercentage = (event.ticketsSold / event.capacity) * 100

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <div className="relative h-48">
        <Link href={`/events/${event.id}`}>
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </Link>
        <div className="absolute top-2 left-2">
          <Badge className="bg-white/90 text-gray-900">{event.category}</Badge>
        </div>
        {showActions && (
          <Badge className={`absolute top-2 right-2 ${getStatusColor(event.status)}`}>{event.status}</Badge>
        )}
        {soldOutPercentage > 90 && (
          <Badge className="absolute bottom-2 right-2 bg-red-500 text-white">
            {soldOutPercentage === 100 ? "Sold Out" : "Almost Sold Out"}
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight text-balance group-hover:text-accent transition-colors">
              <Link href={`/events/${event.id}`}>{event.title}</Link>
            </CardTitle>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-bold text-accent">${event.price}</div>
            {event.price > 0 && <div className="text-xs text-muted-foreground">per ticket</div>}
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">{event.description}</p>
      </CardHeader>

      <CardContent className="space-y-3 pb-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{dateInfo.full}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{dateInfo.time}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            <span>
              {event.ticketsSold}/{event.capacity}
            </span>
          </div>
          <div className="text-right">
            <div className="font-medium">{ticketsAvailable > 0 ? `${ticketsAvailable} left` : "Sold out"}</div>
          </div>
        </div>

        {/* Progress bar for ticket sales */}
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(soldOutPercentage, 100)}%` }}
          />
        </div>
      </CardContent>

      {showActions && (
        <CardFooter className="flex gap-2 pt-3">
          <Button variant="outline" onClick={() => onEdit?.(event)} className="flex-1 bg-transparent">
            Edit Event
          </Button>
          <Button onClick={() => onViewTickets?.(event)} className="flex-1">
            View Tickets
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { EventCard } from "@/components/event-card"
import { CreateEventForm } from "@/components/create-event-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockEvents, type Event } from "@/lib/mock-data"
import { Plus, Calendar, Users, DollarSign, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const handleCreateEvent = (eventData: any) => {
    setEvents((prev) => [...prev, eventData])
    setShowCreateForm(false)
  }

  const handleEditEvent = (event: Event) => {
    // In a real app, this would open an edit form
    console.log("Edit event:", event)
  }

  const handleViewTickets = (event: Event) => {
    // In a real app, this would navigate to ticket management
    console.log("View tickets for:", event)
  }

  const totalRevenue = events.reduce((sum, event) => sum + event.price * event.ticketsSold, 0)
  const totalTicketsSold = events.reduce((sum, event) => sum + event.ticketsSold, 0)
  const publishedEvents = events.filter((event) => event.status === "published").length

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CreateEventForm onSubmit={handleCreateEvent} onCancel={() => setShowCreateForm(false)} />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground text-balance">Event Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your events and track performance</p>
          </div>

          <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.length}</div>
              <p className="text-xs text-muted-foreground">{publishedEvents} published</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTicketsSold.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all events</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Gross sales</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Ticket Price</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${events.length > 0 ? Math.round(totalRevenue / totalTicketsSold) : 0}
              </div>
              <p className="text-xs text-muted-foreground">Per ticket</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-6">Your Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={handleEditEvent}
                onViewTickets={handleViewTickets}
                showActions={true}
              />
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No events created yet.</p>
              <Button onClick={() => setShowCreateForm(true)}>Create Your First Event</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

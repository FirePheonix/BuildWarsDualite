"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { EventCard } from "@/components/event-card"
import { FeaturedEvents } from "@/components/featured-events"
import { EventFilters } from "@/components/event-filters"
import { TicketPurchaseModal } from "@/components/ticket-purchase-modal"
import { Button } from "@/components/ui/button"
import { mockEvents, type Event } from "@/lib/mock-data"
import { Plus, Calendar } from "lucide-react"
import Link from "next/link"

export default function EventsPage() {
  const [events] = useState<Event[]>(mockEvents)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)

  const categories = Array.from(new Set(events.map((event) => event.category)))
  const locations = Array.from(new Set(events.map((event) => event.location.split(",")[0])))

  const filteredEvents = events.filter((event) => {
    // Search filter
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())

    // Category filter
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter

    // Price filter
    let matchesPrice = true
    if (priceFilter !== "all") {
      if (priceFilter === "free") {
        matchesPrice = event.price === 0
      } else if (priceFilter === "0-50") {
        matchesPrice = event.price >= 0 && event.price <= 50
      } else if (priceFilter === "50-100") {
        matchesPrice = event.price > 50 && event.price <= 100
      } else if (priceFilter === "100-200") {
        matchesPrice = event.price > 100 && event.price <= 200
      } else if (priceFilter === "200+") {
        matchesPrice = event.price > 200
      }
    }

    // Date filter
    let matchesDate = true
    if (dateFilter !== "all") {
      const eventDate = new Date(event.date)
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      if (dateFilter === "today") {
        matchesDate = eventDate.toDateString() === today.toDateString()
      } else if (dateFilter === "tomorrow") {
        matchesDate = eventDate.toDateString() === tomorrow.toDateString()
      } else if (dateFilter === "this-week") {
        const weekFromNow = new Date(today)
        weekFromNow.setDate(weekFromNow.getDate() + 7)
        matchesDate = eventDate >= today && eventDate <= weekFromNow
      } else if (dateFilter === "this-month") {
        matchesDate = eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear()
      } else if (dateFilter === "next-month") {
        const nextMonth = new Date(today)
        nextMonth.setMonth(nextMonth.getMonth() + 1)
        matchesDate =
          eventDate.getMonth() === nextMonth.getMonth() && eventDate.getFullYear() === nextMonth.getFullYear()
      }
    }

    // Location filter
    const matchesLocation = locationFilter === "all" || event.location.includes(locationFilter)

    return matchesSearch && matchesCategory && matchesPrice && matchesDate && matchesLocation
  })

  const handleBuyTickets = (event: Event) => {
    setSelectedEvent(event)
    setShowPurchaseModal(true)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setCategoryFilter("all")
    setPriceFilter("all")
    setDateFilter("all")
    setLocationFilter("all")
  }

  const hasActiveFilters =
    searchTerm !== "" ||
    categoryFilter !== "all" ||
    priceFilter !== "all" ||
    dateFilter !== "all" ||
    locationFilter !== "all"

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Discover Amazing Events</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Find and book tickets for the best events in your area. From conferences to concerts, we've got you covered.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create Your Event
            </Button>
          </Link>
        </div>

        {/* Featured Events */}
        <FeaturedEvents events={events} onBuyTickets={handleBuyTickets} />

        {/* Filters */}
        <EventFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          priceFilter={priceFilter}
          onPriceChange={setPriceFilter}
          dateFilter={dateFilter}
          onDateChange={setDateFilter}
          locationFilter={locationFilter}
          onLocationChange={setLocationFilter}
          categories={categories}
          locations={locations}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold">
              {hasActiveFilters ? `${filteredEvents.length} events found` : "All Events"}
            </h2>
          </div>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="group">
              <EventCard event={event} />
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button onClick={() => handleBuyTickets(event)} className="w-full">
                  Buy Tickets - ${event.price}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search terms to find more events.
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="outline" className="bg-transparent">
                Clear All Filters
              </Button>
            )}
          </div>
        )}
      </main>

      <TicketPurchaseModal
        event={selectedEvent}
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
      />
    </div>
  )
}

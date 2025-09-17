"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { AttendeeList } from "@/components/attendee-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockEvents, mockAttendees, type Attendee } from "@/lib/mock-data"
import { Users, Download, Mail, Calendar, TrendingUp } from "lucide-react"

export default function AttendeesPage() {
  const [attendees, setAttendees] = useState<Attendee[]>(mockAttendees)
  const [selectedEvent, setSelectedEvent] = useState("all")

  const handleCheckIn = (attendeeId: string) => {
    setAttendees((prev) =>
      prev.map((a) =>
        a.id === attendeeId
          ? {
              ...a,
              checkedIn: true,
              checkedInAt: new Date().toISOString(),
            }
          : a,
      ),
    )
  }

  const handleExportAttendees = () => {
    // In a real app, this would generate and download a CSV file
    console.log("Exporting attendees:", filteredAttendees)
    alert("Export functionality would be implemented here")
  }

  const filteredAttendees = selectedEvent === "all" ? attendees : attendees.filter((a) => a.eventId === selectedEvent)

  const stats = {
    total: filteredAttendees.length,
    checkedIn: filteredAttendees.filter((a) => a.checkedIn).length,
    pending: filteredAttendees.filter((a) => !a.checkedIn).length,
    checkInRate:
      filteredAttendees.length > 0
        ? (filteredAttendees.filter((a) => a.checkedIn).length / filteredAttendees.length) * 100
        : 0,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground text-balance">Attendee Management</h1>
            <p className="text-muted-foreground mt-2">View and manage all event attendees</p>
          </div>

          <div className="flex items-center gap-4">
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {mockEvents.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleExportAttendees}
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                {selectedEvent === "all" ? "Across all events" : "For selected event"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Checked In</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.checkedIn}</div>
              <p className="text-xs text-muted-foreground">Successfully arrived</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Check-in</CardTitle>
              <Mail className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">Awaiting arrival</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(stats.checkInRate)}%</div>
              <p className="text-xs text-muted-foreground">Check-in completion</p>
            </CardContent>
          </Card>
        </div>

        {/* Attendee List */}
        <AttendeeList attendees={filteredAttendees} events={mockEvents} onCheckIn={handleCheckIn} />
      </main>
    </div>
  )
}

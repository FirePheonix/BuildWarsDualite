"use client"

import type { Attendee, Event } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, CheckCircle, Clock, Mail, User } from "lucide-react"
import { useState } from "react"

interface AttendeeListProps {
  attendees: Attendee[]
  events: Event[]
  onCheckIn: (attendeeId: string) => void
}

export function AttendeeList({ attendees, events, onCheckIn }: AttendeeListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [eventFilter, setEventFilter] = useState("all")

  const filteredAttendees = attendees.filter((attendee) => {
    const matchesSearch =
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "checked-in" && attendee.checkedIn) ||
      (statusFilter === "not-checked-in" && !attendee.checkedIn)

    const matchesEvent = eventFilter === "all" || attendee.eventId === eventFilter

    return matchesSearch && matchesStatus && matchesEvent
  })

  const getEventTitle = (eventId: string) => {
    const event = events.find((e) => e.id === eventId)
    return event?.title || "Unknown Event"
  }

  const formatCheckInTime = (timestamp?: string) => {
    if (!timestamp) return ""
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Attendee Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search attendees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="not-checked-in">Not Checked In</SelectItem>
              </SelectContent>
            </Select>

            <Select value={eventFilter} onValueChange={setEventFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold">{attendees.length}</div>
            <div className="text-sm text-muted-foreground">Total Attendees</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{attendees.filter((a) => a.checkedIn).length}</div>
            <div className="text-sm text-muted-foreground">Checked In</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{attendees.filter((a) => !a.checkedIn).length}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
        </div>

        {/* Attendee List */}
        <div className="space-y-3">
          {filteredAttendees.map((attendee) => (
            <div key={attendee.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex-1">
                  <div className="font-medium">{attendee.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {attendee.email}
                    </span>
                    <span>{getEventTitle(attendee.eventId)}</span>
                  </div>
                  {attendee.checkedIn && attendee.checkedInAt && (
                    <div className="text-xs text-green-600 mt-1">
                      Checked in {formatCheckInTime(attendee.checkedInAt)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={attendee.checkedIn ? "default" : "secondary"} className="flex items-center gap-1">
                  {attendee.checkedIn ? (
                    <>
                      <CheckCircle className="h-3 w-3" />
                      Checked In
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3" />
                      Pending
                    </>
                  )}
                </Badge>

                {!attendee.checkedIn && (
                  <Button size="sm" onClick={() => onCheckIn(attendee.id)}>
                    Check In
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredAttendees.length === 0 && (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No attendees found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

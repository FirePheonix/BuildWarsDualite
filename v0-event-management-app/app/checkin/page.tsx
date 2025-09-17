"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { QRScanner } from "@/components/qr-scanner"
import { AttendeeList } from "@/components/attendee-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockEvents, mockAttendees, type Attendee } from "@/lib/mock-data"
import { CheckCircle, XCircle, Users, Calendar } from "lucide-react"

export default function CheckInPage() {
  const [attendees, setAttendees] = useState<Attendee[]>(mockAttendees)
  const [selectedEvent, setSelectedEvent] = useState("all")
  const [isScanning, setIsScanning] = useState(false)
  const [lastScanResult, setLastScanResult] = useState<{
    success: boolean
    message: string
    attendee?: Attendee
  } | null>(null)

  const handleQRScan = (qrCode: string) => {
    const attendee = attendees.find((a) => a.qrCode === qrCode)

    if (!attendee) {
      setLastScanResult({
        success: false,
        message: "Invalid QR code. Attendee not found.",
      })
      return
    }

    if (attendee.checkedIn) {
      setLastScanResult({
        success: false,
        message: `${attendee.name} is already checked in.`,
        attendee,
      })
      return
    }

    // Check in the attendee
    setAttendees((prev) =>
      prev.map((a) =>
        a.id === attendee.id
          ? {
              ...a,
              checkedIn: true,
              checkedInAt: new Date().toISOString(),
            }
          : a,
      ),
    )

    setLastScanResult({
      success: true,
      message: `${attendee.name} successfully checked in!`,
      attendee,
    })
  }

  const handleManualCheckIn = (attendeeId: string) => {
    const attendee = attendees.find((a) => a.id === attendeeId)
    if (!attendee) return

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

    setLastScanResult({
      success: true,
      message: `${attendee.name} manually checked in!`,
      attendee,
    })
  }

  const filteredAttendees = selectedEvent === "all" ? attendees : attendees.filter((a) => a.eventId === selectedEvent)

  const checkedInCount = filteredAttendees.filter((a) => a.checkedIn).length
  const totalCount = filteredAttendees.length

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground text-balance">Event Check-in</h1>
            <p className="text-muted-foreground mt-2">Scan QR codes or manually check in attendees</p>
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
          </div>
        </div>

        {/* Check-in Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCount}</div>
              <p className="text-xs text-muted-foreground">
                {selectedEvent === "all" ? "All events" : "Selected event"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Checked In</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{checkedInCount}</div>
              <p className="text-xs text-muted-foreground">Successfully checked in</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <XCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{totalCount - checkedInCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting check-in</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Check-in Rate</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalCount > 0 ? Math.round((checkedInCount / totalCount) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">Completion rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* QR Scanner */}
          <div className="space-y-6">
            <QRScanner
              onScan={handleQRScan}
              isScanning={isScanning}
              onToggleScanning={() => setIsScanning(!isScanning)}
            />

            {/* Scan Result */}
            {lastScanResult && (
              <Card className={lastScanResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {lastScanResult.success ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600" />
                    )}
                    <div>
                      <div className={`font-medium ${lastScanResult.success ? "text-green-800" : "text-red-800"}`}>
                        {lastScanResult.success ? "Success!" : "Error"}
                      </div>
                      <div className={`text-sm ${lastScanResult.success ? "text-green-700" : "text-red-700"}`}>
                        {lastScanResult.message}
                      </div>
                      {lastScanResult.attendee && (
                        <div className="text-xs text-muted-foreground mt-1">QR: {lastScanResult.attendee.qrCode}</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Attendee List */}
          <div className="lg:col-span-2">
            <AttendeeList attendees={filteredAttendees} events={mockEvents} onCheckIn={handleManualCheckIn} />
          </div>
        </div>
      </main>
    </div>
  )
}

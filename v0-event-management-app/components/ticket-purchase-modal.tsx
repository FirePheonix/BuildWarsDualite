"use client"

import { useState } from "react"
import type { Event } from "@/lib/mock-data"
import { mockTickets } from "@/lib/mock-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, Users, CreditCard, Minus, Plus, ShoppingCart } from "lucide-react"
import Image from "next/image"

interface TicketPurchaseModalProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
}

interface TicketSelection {
  ticketId: string
  quantity: number
  price: number
  type: string
}

export function TicketPurchaseModal({ event, isOpen, onClose }: TicketPurchaseModalProps) {
  const [selectedTickets, setSelectedTickets] = useState<TicketSelection[]>([])
  const [step, setStep] = useState<"select" | "checkout" | "confirmation">("select")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })

  if (!event) return null

  const eventTickets = mockTickets.filter((ticket) => ticket.eventId === event.id)

  const updateTicketQuantity = (ticketId: string, quantity: number, price: number, type: string) => {
    setSelectedTickets((prev) => {
      const existing = prev.find((t) => t.ticketId === ticketId)
      if (quantity === 0) {
        return prev.filter((t) => t.ticketId !== ticketId)
      }
      if (existing) {
        return prev.map((t) => (t.ticketId === ticketId ? { ...t, quantity } : t))
      }
      return [...prev, { ticketId, quantity, price, type }]
    })
  }

  const totalAmount = selectedTickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0)
  const totalTickets = selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0)

  const formatDate = (date: string, time: string) => {
    const eventDate = new Date(`${date}T${time}`)
    return eventDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleCheckout = () => {
    if (totalTickets === 0) return
    setStep("checkout")
  }

  const handlePurchase = () => {
    // In a real app, this would process payment
    setStep("confirmation")
  }

  const resetModal = () => {
    setStep("select")
    setSelectedTickets([])
    setCustomerInfo({ name: "", email: "", phone: "" })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            {step === "select" && "Select Tickets"}
            {step === "checkout" && "Checkout"}
            {step === "confirmation" && "Purchase Confirmed"}
          </DialogTitle>
        </DialogHeader>

        {step === "select" && (
          <div className="space-y-6">
            {/* Event Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-balance">{event.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(event.date, event.time)}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Selection */}
            <div className="space-y-4">
              <h4 className="font-semibold">Select Tickets</h4>
              {eventTickets.map((ticket) => {
                const selected = selectedTickets.find((t) => t.ticketId === ticket.id)
                const quantity = selected?.quantity || 0
                const available = ticket.quantity - ticket.sold

                return (
                  <Card key={ticket.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium">{ticket.type}</h5>
                            <Badge variant="secondary" className="text-xs">
                              {available} left
                            </Badge>
                          </div>
                          <p className="text-2xl font-bold text-accent">${ticket.price}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateTicketQuantity(ticket.id, Math.max(0, quantity - 1), ticket.price, ticket.type)
                            }
                            disabled={quantity === 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateTicketQuantity(ticket.id, quantity + 1, ticket.price, ticket.type)}
                            disabled={quantity >= available}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Order Summary */}
            {selectedTickets.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {selectedTickets.map((ticket) => (
                    <div key={ticket.ticketId} className="flex justify-between">
                      <span>
                        {ticket.quantity}x {ticket.type}
                      </span>
                      <span>${(ticket.price * ticket.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-4">
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleCheckout} disabled={totalTickets === 0} className="flex-1">
                Continue to Checkout
              </Button>
            </div>
          </div>
        )}

        {step === "checkout" && (
          <div className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter your phone number"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-muted-foreground">{event.title}</div>
                {selectedTickets.map((ticket) => (
                  <div key={ticket.ticketId} className="flex justify-between">
                    <span>
                      {ticket.quantity}x {ticket.type}
                    </span>
                    <span>${(ticket.price * ticket.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep("select")} className="flex-1">
                Back
              </Button>
              <Button onClick={handlePurchase} disabled={!customerInfo.name || !customerInfo.email} className="flex-1">
                Complete Purchase
              </Button>
            </div>
          </div>
        )}

        {step === "confirmation" && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Users className="h-8 w-8 text-green-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">Purchase Successful!</h3>
              <p className="text-muted-foreground">
                Your tickets have been purchased successfully. You will receive a confirmation email shortly.
              </p>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="text-sm space-y-1">
                  <div className="font-semibold">{event.title}</div>
                  <div className="text-muted-foreground">{formatDate(event.date, event.time)}</div>
                  <div className="text-muted-foreground">{event.location}</div>
                  <div className="font-medium mt-2">
                    {totalTickets} ticket{totalTickets > 1 ? "s" : ""} - ${totalAmount.toFixed(2)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={resetModal} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

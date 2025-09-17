export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  image: string
  price: number
  capacity: number
  ticketsSold: number
  status: "draft" | "published" | "cancelled"
  organizerId: string
}

export interface Ticket {
  id: string
  eventId: string
  type: string
  price: number
  quantity: number
  sold: number
}

export interface Attendee {
  id: string
  eventId: string
  ticketId: string
  name: string
  email: string
  checkedIn: boolean
  checkedInAt?: string
  qrCode: string
}

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2024",
    description: "Join industry leaders for the biggest tech conference of the year.",
    date: "2024-03-15",
    time: "09:00",
    location: "San Francisco Convention Center",
    category: "Technology",
    image: "/tech-conference-stage.jpg",
    price: 299,
    capacity: 500,
    ticketsSold: 342,
    status: "published",
    organizerId: "org1",
  },
  {
    id: "2",
    title: "Music Festival Summer",
    description: "Three days of amazing music with top artists from around the world.",
    date: "2024-07-20",
    time: "14:00",
    location: "Golden Gate Park",
    category: "Music",
    image: "/outdoor-music-festival-stage.jpg",
    price: 149,
    capacity: 2000,
    ticketsSold: 1850,
    status: "published",
    organizerId: "org1",
  },
  {
    id: "3",
    title: "Food & Wine Expo",
    description: "Taste the finest cuisine and wines from local restaurants and wineries.",
    date: "2024-05-10",
    time: "18:00",
    location: "Downtown Convention Hall",
    category: "Food & Drink",
    image: "/elegant-food-and-wine-tasting-event.jpg",
    price: 89,
    capacity: 300,
    ticketsSold: 156,
    status: "draft",
    organizerId: "org1",
  },
]

export const mockTickets: Ticket[] = [
  { id: "t1", eventId: "1", type: "General Admission", price: 299, quantity: 400, sold: 280 },
  { id: "t2", eventId: "1", type: "VIP", price: 499, quantity: 100, sold: 62 },
  { id: "t3", eventId: "2", type: "Single Day", price: 149, quantity: 1000, sold: 920 },
  { id: "t4", eventId: "2", type: "3-Day Pass", price: 399, quantity: 1000, sold: 930 },
  { id: "t5", eventId: "3", type: "Standard", price: 89, quantity: 250, sold: 130 },
  { id: "t6", eventId: "3", type: "Premium", price: 149, quantity: 50, sold: 26 },
]

export const mockAttendees: Attendee[] = [
  {
    id: "a1",
    eventId: "1",
    ticketId: "t1",
    name: "John Smith",
    email: "john@example.com",
    checkedIn: true,
    checkedInAt: "2024-03-15T09:15:00Z",
    qrCode: "QR123456",
  },
  {
    id: "a2",
    eventId: "1",
    ticketId: "t2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    checkedIn: false,
    qrCode: "QR789012",
  },
  {
    id: "a3",
    eventId: "2",
    ticketId: "t3",
    name: "Mike Davis",
    email: "mike@example.com",
    checkedIn: true,
    checkedInAt: "2024-07-20T14:30:00Z",
    qrCode: "QR345678",
  },
]

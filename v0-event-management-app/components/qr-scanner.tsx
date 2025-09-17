"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, Camera } from "lucide-react"

interface QRScannerProps {
  onScan: (qrCode: string) => void
  isScanning: boolean
  onToggleScanning: () => void
}

export function QRScanner({ onScan, isScanning, onToggleScanning }: QRScannerProps) {
  const [manualCode, setManualCode] = useState("")

  // Simulate QR code scanning
  useEffect(() => {
    if (!isScanning) return

    const interval = setInterval(() => {
      // Simulate random QR code detection
      if (Math.random() > 0.7) {
        const mockCodes = ["QR123456", "QR789012", "QR345678", "QR999999"]
        const randomCode = mockCodes[Math.floor(Math.random() * mockCodes.length)]
        onScan(randomCode)
        onToggleScanning()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isScanning, onScan, onToggleScanning])

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (manualCode.trim()) {
      onScan(manualCode.trim())
      setManualCode("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          QR Code Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Camera Scanner */}
        <div className="text-center">
          <div className="relative w-64 h-64 mx-auto bg-muted rounded-lg flex items-center justify-center mb-4">
            {isScanning ? (
              <div className="space-y-4">
                <Camera className="h-12 w-12 text-accent mx-auto animate-pulse" />
                <p className="text-sm text-muted-foreground">Scanning for QR codes...</p>
                <div className="w-32 h-32 border-2 border-accent border-dashed rounded-lg animate-pulse" />
              </div>
            ) : (
              <div className="space-y-4">
                <QrCode className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">Camera ready</p>
              </div>
            )}
          </div>

          <Button onClick={onToggleScanning} className="w-full" disabled={isScanning}>
            {isScanning ? "Scanning..." : "Start Scanning"}
          </Button>
        </div>

        {/* Manual Entry */}
        <div className="border-t pt-6">
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <Label htmlFor="manual-code">Manual QR Code Entry</Label>
              <Input
                id="manual-code"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Enter QR code manually"
              />
            </div>
            <Button type="submit" variant="outline" className="w-full bg-transparent" disabled={!manualCode.trim()}>
              Check In Manually
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

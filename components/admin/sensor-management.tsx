"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, MapPin } from "lucide-react"

interface Sensor {
  id: string
  name: string
  type: string
  location: string
  status: "online" | "offline" | "maintenance"
  lastUpdate: string
  value: number
}

export function SensorManagement() {
  const [sensors, setSensors] = useState<Sensor[]>([
    {
      id: "S001",
      name: "PM2.5-01",
      type: "PM2.5",
      location: "Gedung A - Lantai 1",
      status: "online",
      lastUpdate: "2 menit lalu",
      value: 42,
    },
    {
      id: "S002",
      name: "PM10-01",
      type: "PM10",
      location: "Gedung A - Lantai 2",
      status: "online",
      lastUpdate: "1 menit lalu",
      value: 68,
    },
    {
      id: "S003",
      name: "PM2.5-02",
      type: "PM2.5",
      location: "Gedung B - Lantai 1",
      status: "maintenance",
      lastUpdate: "15 menit lalu",
      value: 0,
    },
    {
      id: "S004",
      name: "NO2-01",
      type: "NO2",
      location: "Gedung C - Outdoor",
      status: "online",
      lastUpdate: "3 menit lalu",
      value: 35,
    },
    {
      id: "S005",
      name: "CO-01",
      type: "CO",
      location: "Parkir Area",
      status: "offline",
      lastUpdate: "1 jam lalu",
      value: 0,
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newSensor, setNewSensor] = useState({
    name: "",
    type: "",
    location: "",
  })

  const handleAddSensor = () => {
    if (newSensor.name && newSensor.type && newSensor.location) {
      const sensor: Sensor = {
        id: `S${String(sensors.length + 1).padStart(3, "0")}`,
        name: newSensor.name,
        type: newSensor.type,
        location: newSensor.location,
        status: "online",
        lastUpdate: "Baru saja",
        value: 0,
      }
      setSensors([...sensors, sensor])
      setNewSensor({ name: "", type: "", location: "" })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteSensor = (id: string) => {
    setSensors(sensors.filter((s) => s.id !== id))
  }

  const getStatusBadge = (status: Sensor["status"]) => {
    switch (status) {
      case "online":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Online
          </Badge>
        )
      case "offline":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Offline
          </Badge>
        )
      case "maintenance":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Maintenance
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manajemen Sensor</CardTitle>
              <CardDescription>Kelola semua sensor monitoring kualitas udara</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tambah Sensor
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Sensor Baru</DialogTitle>
                  <DialogDescription>Masukkan informasi sensor yang akan ditambahkan</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="sensor-name">Nama Sensor</Label>
                    <Input
                      id="sensor-name"
                      placeholder="PM2.5-03"
                      value={newSensor.name}
                      onChange={(e) => setNewSensor({ ...newSensor, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sensor-type">Tipe Sensor</Label>
                    <Select
                      value={newSensor.type}
                      onValueChange={(value) => setNewSensor({ ...newSensor, type: value })}
                    >
                      <SelectTrigger id="sensor-type">
                        <SelectValue placeholder="Pilih tipe sensor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PM2.5">PM2.5</SelectItem>
                        <SelectItem value="PM10">PM10</SelectItem>
                        <SelectItem value="NO2">NO2</SelectItem>
                        <SelectItem value="CO">CO</SelectItem>
                        <SelectItem value="SO2">SO2</SelectItem>
                        <SelectItem value="O3">O3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sensor-location">Lokasi</Label>
                    <Input
                      id="sensor-location"
                      placeholder="Gedung D - Lantai 3"
                      value={newSensor.location}
                      onChange={(e) => setNewSensor({ ...newSensor, location: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleAddSensor}>Tambah Sensor</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Update</TableHead>
                  <TableHead>Nilai</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sensors.map((sensor) => (
                  <TableRow key={sensor.id}>
                    <TableCell className="font-medium">{sensor.id}</TableCell>
                    <TableCell className="font-medium">{sensor.name}</TableCell>
                    <TableCell>{sensor.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{sensor.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(sensor.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{sensor.lastUpdate}</TableCell>
                    <TableCell>
                      {sensor.status === "online" ? (
                        <span className="font-medium">{sensor.value}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteSensor(sensor.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

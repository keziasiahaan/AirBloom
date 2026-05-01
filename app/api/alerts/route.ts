import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "data", "alerts.json")

// Baca data alert
function readAlerts() {
  const fileData = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(fileData)
}

// Simpan data alert
function writeAlerts(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

/*
READ
GET /api/alerts
*/
export async function GET() {
  const alerts = readAlerts()
  return NextResponse.json(alerts)
}

/*
CREATE
POST /api/alerts
*/
export async function POST(request: Request) {
  const body = await request.json()
  const alerts = readAlerts()

  const newAlert = {
    id: Date.now(),
    title: body.title,
    location: body.location,
    level: body.level,
    message: body.message,
    createdAt: new Date().toISOString().split("T")[0],
  }

  alerts.push(newAlert)
  writeAlerts(alerts)

  return NextResponse.json({
    message: "Alert berhasil ditambahkan",
    data: newAlert,
  })
}

/*
UPDATE
PUT /api/alerts
*/
export async function PUT(request: Request) {
  const body = await request.json()
  const alerts = readAlerts()

  const updatedAlerts = alerts.map((alert: any) =>
    alert.id === body.id
      ? {
          ...alert,
          title: body.title,
          location: body.location,
          level: body.level,
          message: body.message,
        }
      : alert
  )

  writeAlerts(updatedAlerts)

  return NextResponse.json({
    message: "Alert berhasil diperbarui",
  })
}

/*
DELETE
DELETE /api/alerts
*/
export async function DELETE(request: Request) {
  const body = await request.json()
  const alerts = readAlerts()

  const filteredAlerts = alerts.filter(
    (alert: any) => alert.id !== body.id
  )

  writeAlerts(filteredAlerts)

  return NextResponse.json({
    message: "Alert berhasil dihapus",
  })
}
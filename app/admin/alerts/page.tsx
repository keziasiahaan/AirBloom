"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type AlertData = {
  id: number
  title: string
  location: string
  level: string
  message: string
  createdAt?: string
}

export default function AdminAlertsPage() {
  const router = useRouter()

  const [alerts, setAlerts] = useState<AlertData[]>([])
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [level, setLevel] = useState("")
  const [message, setMessage] = useState("")

  const loadAlerts = async () => {
    const res = await fetch("/api/alerts")
    const data = await res.json()
    setAlerts(data)
  }

  useEffect(() => {
    loadAlerts()
  }, [])

  const addAlert = async () => {
    if (!title || !location || !level || !message) {
      alert("Semua field harus diisi.")
      return
    }

    await fetch("/api/alerts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        location,
        level,
        message,
      }),
    })

    setTitle("")
    setLocation("")
    setLevel("")
    setMessage("")
    loadAlerts()
  }

  const deleteAlert = async (id: number) => {
    await fetch("/api/alerts", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })

    loadAlerts()
  }

  return (
    <div className="min-h-screen bg-[#eaf7ff] p-6 md:p-8">
      <button
        onClick={() => router.push("/admin")}
        className="mb-6 text-sm text-blue-700 hover:underline"
      >
        ← Kembali ke Dashboard
      </button>

      <h1 className="text-3xl font-bold mb-2">Kelola Alert</h1>
      <p className="text-muted-foreground mb-6">
        Admin dapat menambah dan menghapus peringatan kualitas udara.
      </p>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Tambah Alert Baru</h2>

        <div className="space-y-3">
          <input
            className="border rounded-lg p-3 w-full"
            placeholder="Judul alert"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border rounded-lg p-3 w-full"
            placeholder="Lokasi"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            className="border rounded-lg p-3 w-full"
            placeholder="Level, contoh: Sedang / Tidak Sehat / Berbahaya"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />

          <textarea
            className="border rounded-lg p-3 w-full"
            placeholder="Pesan peringatan"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={addAlert}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
          >
            Tambah Alert
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Daftar Alert</h2>

        {alerts.length === 0 ? (
          <p className="text-gray-500">Belum ada alert.</p>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="border rounded-lg p-4 flex justify-between gap-4"
              >
                <div>
                  <h3 className="font-bold">{alert.title}</h3>
                  <p className="text-sm">Lokasi: {alert.location}</p>
                  <p className="text-sm">Status: {alert.level}</p>
                  <p className="mt-2">{alert.message}</p>
                  {alert.createdAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      Tanggal: {alert.createdAt}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="h-fit bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
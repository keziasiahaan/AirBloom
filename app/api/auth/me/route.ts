import { type NextRequest, NextResponse } from "next/server"

// Mock user database
const mockUsers = [
  {
    id: "1",
    email: "user@airbloom.com",
    name: "Pengguna Demo",
    role: "user" as const,
  },
  {
    id: "2",
    email: "admin@airbloom.com",
    name: "Admin",
    role: "admin" as const,
  },
]

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("authToken")

    if (!token) {
      return NextResponse.json({ message: "Tidak terautentikasi" }, { status: 401 })
    }

    // Parse token dan dapatkan user
    const authData = JSON.parse(token.value)
    const user = mockUsers.find((u) => u.id === authData.userId)

    if (!user) {
      return NextResponse.json({ message: "User tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"

// Mock user database - dalam production gunakan database sebenarnya
const mockUsers = [
  {
    id: "1",
    email: "user@airbloom.com",
    password: "password123",
    name: "Pengguna Demo",
    role: "user" as const,
  },
  {
    id: "2",
    email: "admin@airbloom.com",
    password: "admin123",
    name: "Admin",
    role: "admin" as const,
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validasi input
    if (!email || !password) {
      return NextResponse.json({ message: "Email dan kata sandi harus diisi" }, { status: 400 })
    }

    // Cari user
    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ message: "Email atau kata sandi salah" }, { status: 401 })
    }

    const response = NextResponse.json(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      { status: 200 },
    )

    // Set cookie untuk session
    response.cookies.set("authToken", JSON.stringify({ userId: user.id, role: user.role }), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 })
  }
}

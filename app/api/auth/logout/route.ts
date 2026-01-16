import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ message: "Logout berhasil" }, { status: 200 })

  // Hapus cookie
  response.cookies.delete("authToken")

  return response
}

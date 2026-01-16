"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AlertCircle, ArrowLeft, Leaf } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Email dan kata sandi harus diisi")
      return
    }

    try {
      await login(email, password)
      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal")
    }
  }

  const fillDemoUser = () => {
    setEmail("user@airbloom.com")
    setPassword("password123")
  }

  const fillDemoAdmin = () => {
    setEmail("admin@airbloom.com")
    setPassword("admin123")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="p-8">
          <Button
            variant="ghost"
            className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Beranda
          </Button>

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Masuk Admin</h1>
            <p className="text-muted-foreground text-sm">
              Login khusus untuk administrator sistem monitoring kualitas udara
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input
                type="email"
                placeholder="admin@airbloom.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Kata Sandi</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground mb-3 text-center">Akun Demo untuk Pengujian:</p>
            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                className="w-full text-xs bg-transparent"
                onClick={fillDemoUser}
                disabled={isLoading}
              >
                Pengguna: user@airbloom.com
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full text-xs bg-transparent"
                onClick={fillDemoAdmin}
                disabled={isLoading}
              >
                Admin: admin@airbloom.com
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Kata sandi: <span className="font-mono">password123</span> (user) /{" "}
              <span className="font-mono">admin123</span> (admin)
            </p>
          </div>

          {/* Footer */}
          <p className="text-xs text-muted-foreground text-center mt-6">
            Sistem Informasi Monitoring Kualitas Udara Kampus ITPLN Jakarta
          </p>
        </div>
      </Card>
    </div>
  )
}

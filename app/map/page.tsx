"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, ExternalLink } from "lucide-react"

export default function MapPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="flex flex-col gap-6 p-6 md:p-8">
          <div>
            <h1 className="text-3xl font-bold">Tampilan Peta</h1>
            <p className="text-muted-foreground mt-2">
              Menara PLN, Jl. Outer Ring Road Lantai 2, RT.1/RW.1, Duri Kosambi, Kecamatan Cengkareng, Kota Jakarta
              Barat, Daerah Khusus Ibukota Jakarta 11750
            </p>
          </div>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Peta Zona Kualitas Udara
                  </CardTitle>
                  <CardDescription>Visualisasi zona AQI berdasarkan lokasi di sekitar kampus</CardDescription>
                </div>
                <a
                  href="https://maps.app.goo.gl/h8YvHYqx3CxXUvd96"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Buka di Peta
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="relative w-full h-[500px]">
                  {/* Base Map */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.889744!2d106.7240531!3d-6.1388889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f8e9c95de1d7%3A0x5e3d0a3c8d3f8a0!2sMenara%20PLN%2C%20Institut%20Teknologi%20PLN!5e0!3m2!1sid!2sid!4v1730753547392!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  />

                  {/* AQI Zone Overlays */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Green Zone - Baik (Center/Kampus) */}
                    <div
                      className="absolute bg-green-500/30 rounded-full blur-2xl"
                      style={{
                        width: "180px",
                        height: "180px",
                        top: "45%",
                        left: "48%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />

                    {/* Yellow Zone - Sedang (North West) */}
                    <div
                      className="absolute bg-yellow-400/35 rounded-full blur-2xl"
                      style={{
                        width: "150px",
                        height: "150px",
                        top: "20%",
                        left: "25%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />

                    {/* Yellow Zone - Sedang (South East) */}
                    <div
                      className="absolute bg-yellow-400/35 rounded-full blur-2xl"
                      style={{
                        width: "140px",
                        height: "140px",
                        top: "70%",
                        left: "70%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />

                    {/* Orange Zone - Tidak Sehat (East) */}
                    <div
                      className="absolute bg-orange-500/40 rounded-full blur-2xl"
                      style={{
                        width: "120px",
                        height: "120px",
                        top: "40%",
                        left: "80%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />

                    {/* Red Zone - Sangat Tidak Sehat (North East) */}
                    <div
                      className="absolute bg-red-500/40 rounded-full blur-2xl"
                      style={{
                        width: "100px",
                        height: "100px",
                        top: "15%",
                        left: "75%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-sm mb-3">Legenda Zona Kualitas Udara</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full" />
                    <div>
                      <p className="text-sm font-medium">Hijau - Baik</p>
                      <p className="text-xs text-muted-foreground">Udara sehat</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full" />
                    <div>
                      <p className="text-sm font-medium">Kuning - Sedang</p>
                      <p className="text-xs text-muted-foreground">Sensitif hati-hati</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded-full" />
                    <div>
                      <p className="text-sm font-medium">Oranye - Tidak Sehat</p>
                      <p className="text-xs text-muted-foreground">Kurangi aktivitas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full" />
                    <div>
                      <p className="text-sm font-medium">Merah - Berbahaya</p>
                      <p className="text-xs text-muted-foreground">Hindari keluar</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}

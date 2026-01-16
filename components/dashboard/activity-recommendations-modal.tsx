"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAQIData } from "@/hooks/use-aqi-data"
import { Activity, CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react"

interface ActivityRecommendationsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ActivityRecommendationsModal({ open, onOpenChange }: ActivityRecommendationsModalProps) {
  const { getAverageAQI, getAQILevel, getAQILevelLabel } = useAQIData()
  const currentAQI = getAverageAQI()
  const level = getAQILevel(currentAQI)

  const getRecommendations = () => {
    switch (level) {
      case "good":
        return {
          title: "Kondisi Udara Baik",
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          icon: CheckCircle2,
          outdoor: [
            { activity: "Jogging atau lari pagi", safe: true },
            { activity: "Bersepeda keliling kampus", safe: true },
            { activity: "Olahraga outdoor (futsal, basket)", safe: true },
            { activity: "Piknik atau istirahat di taman", safe: true },
          ],
          indoor: [
            { activity: "Belajar di perpustakaan", note: "Tetap nyaman" },
            { activity: "Praktikum di laboratorium", note: "Tanpa risiko tambahan" },
          ],
          tips: [
            "Waktu yang sempurna untuk aktivitas outdoor",
            "Tidak perlu masker saat beraktivitas",
            "Manfaatkan udara segar untuk olahraga",
          ],
        }
      case "moderate":
        return {
          title: "Kondisi Udara Sedang",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          icon: Info,
          outdoor: [
            { activity: "Jalan santai di kampus", safe: true, note: "Kurangi intensitas" },
            { activity: "Olahraga ringan", safe: true, note: "Hindari intensitas tinggi" },
            { activity: "Aktivitas outdoor singkat", safe: true, note: "Maksimal 30-45 menit" },
          ],
          indoor: [
            { activity: "Gym atau fitness indoor", note: "Lebih disarankan" },
            { activity: "Kegiatan di ruang ber-AC", note: "Pilihan terbaik" },
            { activity: "Belajar kelompok di dalam ruangan", note: "Lebih aman" },
          ],
          sensitive: [
            "Orang dengan asma atau masalah pernapasan sebaiknya membatasi aktivitas outdoor",
            "Anak-anak dan lansia disarankan mengurangi durasi di luar ruangan",
          ],
          tips: [
            "Pertimbangkan menggunakan masker jika sensitif",
            "Batasi aktivitas berat di luar ruangan",
            "Lebih baik pilih aktivitas indoor",
          ],
        }
      case "unhealthy":
        return {
          title: "Kondisi Udara Tidak Sehat",
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          icon: AlertTriangle,
          outdoor: [
            { activity: "Olahraga outdoor intensif", safe: false },
            { activity: "Aktivitas fisik berat", safe: false },
            { activity: "Berjalan cepat berkepanjangan", safe: false, note: "Hanya jika mendesak" },
          ],
          indoor: [
            { activity: "Olahraga di gym indoor", note: "Sangat disarankan" },
            { activity: "Aktivitas dalam ruangan ber-AC", note: "Pilihan utama" },
            { activity: "Istirahat dan hidrasi cukup", note: "Penting" },
          ],
          sensitive: [
            "Semua kelompok sensitif harus menghindari aktivitas outdoor",
            "Gunakan masker N95 jika harus keluar",
            "Segera masuk jika merasakan gejala seperti sesak napas atau iritasi",
          ],
          tips: [
            "Wajib gunakan masker berkualitas (N95/KN95)",
            "Hindari semua aktivitas outdoor yang tidak perlu",
            "Tutup jendela dan gunakan air purifier",
            "Tetap terhidrasi dengan baik",
          ],
        }
      case "severe":
        return {
          title: "Kondisi Udara Berbahaya",
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          icon: XCircle,
          outdoor: [{ activity: "Semua aktivitas outdoor", safe: false, note: "DIHINDARI SEPENUHNYA" }],
          indoor: [
            { activity: "Tetap di dalam ruangan tertutup", note: "WAJIB" },
            { activity: "Gunakan air purifier", note: "Sangat penting" },
            { activity: "Istirahat total", note: "Kurangi aktivitas fisik" },
          ],
          sensitive: [
            "BAHAYA: Semua orang berisiko mengalami dampak kesehatan serius",
            "Segera cari bantuan medis jika mengalami kesulitan bernapas",
            "Anak-anak, lansia, dan penderita penyakit pernapasan harus ekstra hati-hati",
          ],
          tips: [
            "JANGAN keluar ruangan kecuali sangat mendesak",
            "Gunakan masker N95 dan kacamata pelindung jika terpaksa keluar",
            "Tutup semua jendela dan pintu",
            "Nyalakan air purifier di ruangan",
            "Pertimbangkan untuk tidak berangkat kuliah",
          ],
        }
    }
  }

  const recommendations = getRecommendations()
  const IconComponent = recommendations.icon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Activity className="h-5 w-5" />
            Rekomendasi Aktivitas
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Status */}
          <div className={`${recommendations.bgColor} ${recommendations.borderColor} border rounded-lg p-4`}>
            <div className="flex items-center gap-3 mb-2">
              <IconComponent className={`h-6 w-6 ${recommendations.color}`} />
              <div>
                <h3 className={`font-semibold ${recommendations.color}`}>{recommendations.title}</h3>
                <p className="text-sm text-muted-foreground">
                  AQI Saat Ini: <span className="font-bold">{currentAQI}</span> ({getAQILevelLabel(level)})
                </p>
              </div>
            </div>
          </div>

          {/* Outdoor Activities */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <div className="w-1 h-5 bg-primary rounded" />
              Aktivitas Outdoor
            </h4>
            <div className="space-y-2">
              {recommendations.outdoor.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="mt-0.5">
                    {item.safe === true ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : item.safe === false ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.activity}</p>
                    {item.note && <p className="text-xs text-muted-foreground mt-1">{item.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indoor Activities */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <div className="w-1 h-5 bg-blue-500 rounded" />
              Aktivitas Indoor
            </h4>
            <div className="space-y-2">
              {recommendations.indoor.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.activity}</p>
                    {item.note && <p className="text-xs text-muted-foreground mt-1">{item.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sensitive Groups Warning */}
          {recommendations.sensitive && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Perhatian Khusus untuk Kelompok Sensitif
              </h4>
              <ul className="space-y-1 text-sm text-orange-800">
                {recommendations.sensitive.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Tips & Saran</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              {recommendations.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

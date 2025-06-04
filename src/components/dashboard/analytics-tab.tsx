import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home } from "lucide-react"
import { getDeviceIcon, type DashboardMetrics } from "@/lib/data"

interface AnalyticsTabProps {
  metrics: DashboardMetrics
}

export default function AnalyticsTab({ metrics }: AnalyticsTabProps) {
  const { totalCurrentPower, devices } = metrics

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-none shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Consumo por Categoria</CardTitle>
          <CardDescription>Distribuição do consumo energético</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(
              devices.reduce(
                (acc, device) => {
                  acc[device.type] = (acc[device.type] || 0) + device.currentPower
                  return acc
                },
                {} as Record<string, number>,
              ),
            ).map(([type, power]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {(() => {
                    const IconComponent = getDeviceIcon(type)
                    return <IconComponent className="h-5 w-5" />
                  })()}
                  <span className="text-sm font-medium">{type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-emerald-600 h-2 rounded-full"
                      style={{ width: `${(power / totalCurrentPower) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{power}W</span>
                  <span className="text-xs text-gray-500">({((power / totalCurrentPower) * 100).toFixed(1)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Eficiência Energética</CardTitle>
          <CardDescription>Status dos dispositivos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="font-medium">Dispositivos Eficientes</span>
              </div>
              <span className="font-bold">{devices.filter((d) => !d.isAnomaly && !d.hasPhantomLoad).length}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="font-medium">Com Consumo Fantasma</span>
              </div>
              <span className="font-bold">{metrics.phantomLoadDevices.length}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="font-medium">Com Anomalias</span>
              </div>
              <span className="font-bold">{metrics.anomalyDevices.length}</span>
            </div>

            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Distribuição por Local</h4>
              <div className="space-y-2">
                {Object.entries(
                  devices.reduce(
                    (acc, device) => {
                      acc[device.location] = (acc[device.location] || 0) + 1
                      return acc
                    },
                    {} as Record<string, number>,
                  ),
                ).map(([location, count]) => (
                  <div key={location} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{count}</span>
                      <span className="text-xs text-gray-500">({((count / devices.length) * 100).toFixed(0)}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

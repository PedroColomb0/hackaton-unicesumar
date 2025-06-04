"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Device } from "@/lib/data"
import { getStatusColor, getStatusText } from "@/lib/data"
import { getDeviceIcon } from "@/lib/data"

interface DevicesListProps {
  filteredDevices: Device[]
  onDeviceClick: (device: Device) => void
  costPerKwh: number
}

export default function DevicesList({ filteredDevices, onDeviceClick, costPerKwh }: DevicesListProps) {
  if (filteredDevices.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center shadow-sm">
        <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Search className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Nenhum dispositivo encontrado</h3>
        <p className="text-gray-500 mt-1">Tente ajustar seus filtros ou adicionar novos dispositivos.</p>
        <Button variant="outline" className="mt-4">
          Limpar filtros
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {filteredDevices.map((device) => (
        <Card
          key={device.id}
          className="hover:shadow-md transition-shadow cursor-pointer border-none shadow-sm bg-white"
          onClick={() => onDeviceClick(device)}
        >
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center`}>
                  {(() => {
                    const IconComponent = getDeviceIcon(device.type)
                    return <IconComponent className="h-5 w-5" />
                  })()}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-lg">{device.name}</h3>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`}></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {device.location} • {device.type}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{device.currentPower}W</p>
                  <p className="text-xs text-gray-600">{getStatusText(device.status)}</p>
                </div>

                <div className="text-center">
                  <p className="text-lg font-semibold">{device.dailyConsumption.toFixed(1)} kWh</p>
                  <p className="text-xs text-gray-600">Hoje</p>
                </div>

                <div className="text-center">
                  <p className="text-lg font-semibold">R$ {(device.monthlyConsumption * costPerKwh).toFixed(2)}</p>
                  <p className="text-xs text-gray-600">Mês estimado</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {device.isAnomaly && (
                    <Badge variant="destructive" className="text-xs">
                      Anomalia
                    </Badge>
                  )}
                  {device.hasPhantomLoad && (
                    <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800 hover:bg-amber-200">
                      Consumo Fantasma
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Consumo vs Média</span>
                <span>{((device.currentPower / device.averagePower) * 100).toFixed(0)}%</span>
              </div>
              <Progress value={(device.currentPower / device.averagePower) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

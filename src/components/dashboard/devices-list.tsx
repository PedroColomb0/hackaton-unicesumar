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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredDevices.map((device) => (
        <Card
          key={device.id}
          className="h-64 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 border-none shadow-sm bg-white"
          onClick={() => {
            onDeviceClick(device)
            // Scroll suave para a seção de detalhes
            setTimeout(() => {
              const detailsElement = document.getElementById("device-details")
              if (detailsElement) {
                detailsElement.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "nearest",
                })
              }
            }, 100)
          }}
        >
          <CardContent className="p-4 flex flex-col h-full">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                {(() => {
                  const IconComponent = getDeviceIcon(device.type)
                  return <IconComponent className="h-5 w-5" />
                })()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg truncate">{device.name}</h3>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`}></div>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {device.location} • {device.type}
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-xl font-bold">{device.currentPower}W</p>
                  <p className="text-xs text-gray-600">{getStatusText(device.status)}</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{device.dailyConsumption.toFixed(1)} kWh</p>
                  <p className="text-xs text-gray-600">Hoje</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg font-semibold text-emerald-600">
                  R$ {(device.monthlyConsumption * costPerKwh).toFixed(2)}
                </p>
                <p className="text-xs text-gray-600">Mês estimado</p>
              </div>

              <div className="flex flex-wrap gap-1 justify-center">
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

            <div className="mt-auto">
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

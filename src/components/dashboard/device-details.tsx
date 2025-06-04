"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Activity, AlertTriangle, Eye, Settings, Trash2 } from "lucide-react"
import type { Device } from "@/lib/data"
import { getStatusColor, getStatusText } from "@/lib/data"
import { getDeviceIcon } from "@/lib/data"

interface DeviceDetailsProps {
  device: Device
  onClose: () => void
  onRemove: (id: string) => void
  costPerKwh: number
  estimatedMonthlyCost: number
}

export default function DeviceDetails({
  device,
  onClose,
  onRemove,
  costPerKwh,
  estimatedMonthlyCost,
}: DeviceDetailsProps) {
  return (
    <Card className="border-none shadow-lg bg-white">
      <CardHeader className="pb-3 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {(() => {
              const IconComponent = getDeviceIcon(device.type)
              return <IconComponent className="h-5 w-5" />
            })()}
            <div>
              <CardTitle>{device.name}</CardTitle>
              <CardDescription>{device.location}</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Informações Básicas</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tipo:</span>
                  <span className="text-sm font-medium">{device.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`}></div>
                  <span className="text-sm font-medium">{getStatusText(device.status)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Última atualização:</span>
                  <span className="text-sm font-medium">{device.lastUpdate.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Alertas</h3>
              <div className="mt-2 space-y-2">
                {device.isAnomaly && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 rounded-md">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-700">Consumo anômalo detectado</span>
                  </div>
                )}
                {device.hasPhantomLoad && (
                  <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-md">
                    <Eye className="h-4 w-4 text-amber-500" />
                    <span className="text-sm text-amber-700">Consumo fantasma detectado</span>
                  </div>
                )}
                {!device.isAnomaly && !device.hasPhantomLoad && (
                  <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-md">
                    <Activity className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm text-emerald-700">Funcionamento normal</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Consumo de Energia</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Consumo atual:</span>
                  <span className="text-sm font-medium">{device.currentPower}W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Consumo médio:</span>
                  <span className="text-sm font-medium">{device.averagePower}W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Consumo diário:</span>
                  <span className="text-sm font-medium">{device.dailyConsumption.toFixed(1)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Consumo mensal:</span>
                  <span className="text-sm font-medium">{device.monthlyConsumption.toFixed(1)} kWh</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Comparação com Média</h3>
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Consumo vs Média</span>
                  <span>{((device.currentPower / device.averagePower) * 100).toFixed(0)}%</span>
                </div>
                <Progress value={(device.currentPower / device.averagePower) * 100} className="h-2" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Custos</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Custo diário:</span>
                  <span className="text-sm font-medium">R$ {(device.dailyConsumption * costPerKwh).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Custo mensal:</span>
                  <span className="text-sm font-medium">R$ {(device.monthlyConsumption * costPerKwh).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">% do custo total:</span>
                  <span className="text-sm font-medium">
                    {(((device.monthlyConsumption * costPerKwh) / estimatedMonthlyCost) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Ações</h3>
              <div className="mt-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
                  <Settings className="h-4 w-4" />
                  Configurar Dispositivo
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full flex items-center justify-center gap-1"
                  onClick={() => onRemove(device.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Remover Dispositivo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

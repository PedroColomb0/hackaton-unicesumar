"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Activity, AlertTriangle, Eye, Settings, Trash2 } from "lucide-react"
import type { Device } from "@/lib/data"
import { getStatusColor, getStatusText } from "@/lib/data"
import { getDeviceIcon } from "@/lib/data"
import { useState } from "react"
import DeviceConfigModal from "./device-config-modal"

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
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false)

  return (
    <>
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="pb-3 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {(() => {
                const IconComponent = getDeviceIcon(device.type)
                return <IconComponent className="h-5 w-5" />
              })()}
              <div>
                <CardTitle className="text-gray-900">{device.name}</CardTitle>
                <CardDescription className="text-gray-600">{device.location}</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
                    <span className="text-sm font-medium text-gray-900">{device.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`}></div>
                      <span className="text-sm font-medium text-gray-900">{getStatusText(device.status)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Última atualização:</span>
                    <span className="text-sm font-medium text-gray-900">{device.lastUpdate.toLocaleTimeString()}</span>
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
                    <span className="text-sm font-medium text-gray-900">{device.currentPower}W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Consumo médio:</span>
                    <span className="text-sm font-medium text-gray-900">{device.averagePower}W</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Consumo diário:</span>
                    <span className="text-sm font-medium text-gray-900">{device.dailyConsumption.toFixed(1)} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Consumo mensal:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {device.monthlyConsumption.toFixed(1)} kWh
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Comparação com Média</h3>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Consumo vs Média</span>
                    <span className="text-gray-900 font-medium">
                      {((device.currentPower / device.averagePower) * 100).toFixed(0)}%
                    </span>
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
                    <span className="text-sm font-medium text-gray-900">
                      R$ {(device.dailyConsumption * costPerKwh).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Custo mensal:</span>
                    <span className="text-sm font-medium text-gray-900">
                      R$ {(device.monthlyConsumption * costPerKwh).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">% do custo total:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {(((device.monthlyConsumption * costPerKwh) / estimatedMonthlyCost) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Ações</h3>
                <div className="mt-2 space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center justify-center gap-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsConfigModalOpen(true)}
                  >
                    <Settings className="h-4 w-4" />
                    Configurar Dispositivo
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white"
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

      <DeviceConfigModal device={device} isOpen={isConfigModalOpen} onClose={() => setIsConfigModalOpen(false)} />
    </>
  )
}
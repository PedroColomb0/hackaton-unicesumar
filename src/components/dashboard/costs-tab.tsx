"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getDeviceIcon, type DashboardMetrics } from "@/lib/data"
import type { Device } from "@/lib/data"

interface CostsTabProps {
  metrics: DashboardMetrics
  onDeviceClick: (device: Device) => void
}

export default function CostsTab({ metrics, onDeviceClick }: CostsTabProps) {
  const {
    totalDailyConsumption,
    totalMonthlyConsumption,
    costPerKwh,
    estimatedMonthlyCost,
    phantomLoadCost,
    phantomLoadDevices,
    devices,
  } = metrics

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle>Custo Atual</CardTitle>
            <CardDescription>Baseado no consumo de hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">
              R$ {(totalDailyConsumption * costPerKwh).toFixed(2)}
            </div>
            <p className="text-sm text-gray-600 mt-1">Custo do dia</p>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span>Consumo total:</span>
                <span className="font-medium">{totalDailyConsumption.toFixed(1)} kWh</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Tarifa:</span>
                <span className="font-medium">R$ {costPerKwh.toFixed(2)}/kWh</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle>Previsão Mensal</CardTitle>
            <CardDescription>Estimativa baseada no padrão atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">R$ {estimatedMonthlyCost.toFixed(2)}</div>
            <p className="text-sm text-gray-600 mt-1">Previsão do mês</p>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span>Consumo mensal:</span>
                <span className="font-medium">{totalMonthlyConsumption.toFixed(1)} kWh</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Média diária:</span>
                <span className="font-medium">R$ {(totalDailyConsumption * costPerKwh).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle>Economia Potencial</CardTitle>
            <CardDescription>Eliminando consumo fantasma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">R$ {phantomLoadCost.toFixed(2)}</div>
            <p className="text-sm text-gray-600 mt-1">Economia mensal possível</p>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span>Dispositivos em standby:</span>
                <span className="font-medium">{phantomLoadDevices.length}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>% do custo total:</span>
                <span className="font-medium">{((phantomLoadCost / estimatedMonthlyCost) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Detalhamento de Custos por Dispositivo</CardTitle>
          <CardDescription>Custo mensal estimado de cada aparelho</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {devices
              .sort((a, b) => b.monthlyConsumption - a.monthlyConsumption)
              .map((device) => {
                const monthlyCost = device.monthlyConsumption * costPerKwh
                const percentage = (monthlyCost / estimatedMonthlyCost) * 100

                return (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => onDeviceClick(device)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        {(() => {
                          const IconComponent = getDeviceIcon(device.type)
                          return <IconComponent className="h-5 w-5" />
                        })()}
                      </div>
                      <div>
                        <p className="font-medium">{device.name}</p>
                        <p className="text-sm text-gray-600">{device.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-semibold">R$ {monthlyCost.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{percentage.toFixed(1)}% do total</p>
                      </div>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

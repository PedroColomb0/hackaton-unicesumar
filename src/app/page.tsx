"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Zap, AlertTriangle, DollarSign, Activity, Eye } from "lucide-react"

// Tipos de dados
interface Device {
  id: string
  name: string
  type: string
  status: "online" | "offline" | "standby"
  currentPower: number // Watts
  averagePower: number // Watts
  dailyConsumption: number // kWh
  monthlyConsumption: number // kWh
  location: string
  isAnomaly: boolean
  hasPhantomLoad: boolean
  lastUpdate: Date
}

// Dados simulados dos dispositivos
const mockDevices: Device[] = [
  {
    id: "1",
    name: "Smart TV Samsung",
    type: "Entretenimento",
    status: "standby",
    currentPower: 15,
    averagePower: 120,
    dailyConsumption: 2.8,
    monthlyConsumption: 84,
    location: "Sala de Estar",
    isAnomaly: false,
    hasPhantomLoad: true,
    lastUpdate: new Date(),
  },
  {
    id: "2",
    name: "Geladeira Frost Free",
    type: "Eletrodoméstico",
    status: "online",
    currentPower: 180,
    averagePower: 150,
    dailyConsumption: 3.6,
    monthlyConsumption: 108,
    location: "Cozinha",
    isAnomaly: true,
    hasPhantomLoad: false,
    lastUpdate: new Date(),
  },
  {
    id: "3",
    name: "Ar Condicionado",
    type: "Climatização",
    status: "online",
    currentPower: 1200,
    averagePower: 1100,
    dailyConsumption: 8.8,
    monthlyConsumption: 264,
    location: "Quarto Principal",
    isAnomaly: false,
    hasPhantomLoad: false,
    lastUpdate: new Date(),
  },
  {
    id: "4",
    name: "Micro-ondas",
    type: "Eletrodoméstico",
    status: "standby",
    currentPower: 8,
    averagePower: 45,
    dailyConsumption: 0.3,
    monthlyConsumption: 9,
    location: "Cozinha",
    isAnomaly: false,
    hasPhantomLoad: true,
    lastUpdate: new Date(),
  },
  {
    id: "5",
    name: "Computador Desktop",
    type: "Eletrônicos",
    status: "online",
    currentPower: 350,
    averagePower: 280,
    dailyConsumption: 4.2,
    monthlyConsumption: 126,
    location: "Escritório",
    isAnomaly: true,
    hasPhantomLoad: false,
    lastUpdate: new Date(),
  },
  {
    id: "6",
    name: "Lâmpadas LED",
    type: "Iluminação",
    status: "online",
    currentPower: 60,
    averagePower: 45,
    dailyConsumption: 0.9,
    monthlyConsumption: 27,
    location: "Geral",
    isAnomaly: false,
    hasPhantomLoad: false,
    lastUpdate: new Date(),
  },
]

export default function EnergyMonitorDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [devices, setDevices] = useState<Device[]>(mockDevices)
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)

  // Function to handle device selection
  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device)
  }

  // Cálculos gerais
  const totalCurrentPower = devices.reduce((sum, device) => sum + device.currentPower, 0)
  const totalDailyConsumption = devices.reduce((sum, device) => sum + device.dailyConsumption, 0)
  const totalMonthlyConsumption = devices.reduce((sum, device) => sum + device.monthlyConsumption, 0)
  const anomalyDevices = devices.filter((device) => device.isAnomaly)
  const phantomLoadDevices = devices.filter((device) => device.hasPhantomLoad)
  const onlineDevices = devices.filter((device) => device.status === "online").length

  // Previsão de custo (R$ 0,65 por kWh - média Brasil)
  const costPerKwh = 0.65
  const estimatedMonthlyCost = totalMonthlyConsumption * costPerKwh
  const phantomLoadCost = phantomLoadDevices.reduce(
    (sum, device) => sum + ((device.currentPower * 24 * 30) / 1000) * costPerKwh,
    0,
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "offline":
        return "bg-red-500"
      case "standby":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Ativo"
      case "offline":
        return "Desconectado"
      case "standby":
        return "Em Standby"
      default:
        return "Desconhecido"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Monitor de Energia IoT</h1>
            <p className="text-gray-600">Monitoramento em tempo real do consumo energético</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Ao vivo</span>
            </div>
          </div>
        </div>

        {/* Selected Device Details */}
        {selectedDevice && (
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Dispositivo Selecionado</CardTitle>
              <CardDescription>{selectedDevice.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Localização: {selectedDevice.location}</p>
              <p>Tipo: {selectedDevice.type}</p>
              <p>Status: {getStatusText(selectedDevice.status)}</p>
              <p>Consumo Atual: {selectedDevice.currentPower}W</p>
              <p>Consumo Diário: {selectedDevice.dailyConsumption.toFixed(1)} kWh</p>
              <p>Custo Mensal Estimado: R$ {(selectedDevice.monthlyConsumption * costPerKwh).toFixed(2)}</p>
              <button
                className="mt-2 text-blue-600 hover:underline"
                onClick={() => setSelectedDevice(null)}
              >
                Fechar
              </button>
            </CardContent>
          </Card>
        )}

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consumo Atual</CardTitle>
              <Zap className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCurrentPower.toFixed(0)}W</div>
              <p className="text-xs text-muted-foreground">{totalDailyConsumption.toFixed(1)} kWh hoje</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dispositivos Ativos</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {onlineDevices}/{devices.length}
              </div>
              <p className="text-xs text-muted-foreground">Conectados à rede</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Custo Estimado</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {estimatedMonthlyCost.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Previsão mensal</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alertas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{anomalyDevices.length + phantomLoadDevices.length}</div>
              <p className="text-xs text-muted-foreground">Requerem atenção</p>
            </CardContent>
          </Card>
        </div>

        {/* Alertas */}
        {(anomalyDevices.length > 0 || phantomLoadDevices.length > 0) && (
          <div className="space-y-3">
            {anomalyDevices.length > 0 && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Anomalias Detectadas</AlertTitle>
                <AlertDescription className="text-red-700">
                  {anomalyDevices.length} dispositivo(s) com consumo anômalo:{" "}
                  {anomalyDevices.map((d) => d.name).join(", ")}
                </AlertDescription>
              </Alert>
            )}

            {phantomLoadDevices.length > 0 && (
              <Alert className="border-yellow-200 bg-yellow-50">
                <Eye className="h-4 w-4 text-yellow-600" />
                <AlertTitle className="text-yellow-800">Consumo Fantasma Detectado</AlertTitle>
                <AlertDescription className="text-yellow-700">
                  {phantomLoadDevices.length} dispositivo(s) consumindo energia em standby. Custo adicional: R${" "}
                  {phantomLoadCost.toFixed(2)}/mês
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Tabs Principal */}
        <Tabs defaultValue="devices" className="space-y-4">
          <TabsList>
            <TabsTrigger value="devices">Dispositivos</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
            <TabsTrigger value="costs">Custos</TabsTrigger>
          </TabsList>

          <TabsContent value="devices" className="space-y-4">
            <div className="grid gap-4">
              {devices.map((device) => (
                <Card
                  key={device.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleDeviceClick(device)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status)}`}></div>
                          <div>
                            <h3 className="font-semibold text-lg">{device.name}</h3>
                            <p className="text-sm text-gray-600">
                              {device.location} • {device.type}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="text-2xl font-bold">{device.currentPower}W</p>
                          <p className="text-sm text-gray-600">{getStatusText(device.status)}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-semibold">{device.dailyConsumption.toFixed(1)} kWh</p>
                          <p className="text-sm text-gray-600">Hoje</p>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-semibold">
                            R$ {(device.monthlyConsumption * costPerKwh).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">Mês estimado</p>
                        </div>

                        <div className="flex flex-col space-y-1">
                          {device.isAnomaly && (
                            <Badge variant="destructive" className="text-xs">
                              Anomalia
                            </Badge>
                          )}
                          {device.hasPhantomLoad && (
                            <Badge variant="secondary" className="text-xs">
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
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
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
                        <span className="text-sm font-medium">{type}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(power / totalCurrentPower) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{power}W</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Eficiência Energética</CardTitle>
                  <CardDescription>Status dos dispositivos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium">Dispositivos Eficientes</span>
                      </div>
                      <span className="font-bold">
                        {devices.filter((d) => !d.isAnomaly && !d.hasPhantomLoad).length}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="font-medium">Com Consumo Fantasma</span>
                      </div>
                      <span className="font-bold">{phantomLoadDevices.length}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="font-medium">Com Anomalias</span>
                      </div>
                      <span className="font-bold">{anomalyDevices.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="costs" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Custo Atual</CardTitle>
                  <CardDescription>Baseado no consumo de hoje</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    R$ {(totalDailyConsumption * costPerKwh).toFixed(2)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Custo do dia</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Previsão Mensal</CardTitle>
                  <CardDescription>Estimativa baseada no padrão atual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">R$ {estimatedMonthlyCost.toFixed(2)}</div>
                  <p className="text-sm text-gray-600 mt-1">Previsão do mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Economia Potencial</CardTitle>
                  <CardDescription>Eliminando consumo fantasma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">R$ {phantomLoadCost.toFixed(2)}</div>
                  <p className="text-sm text-gray-600 mt-1">Economia mensal possível</p>
                </CardContent>
              </Card>
            </div>

            <Card>
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
                        <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status)}`}></div>
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
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
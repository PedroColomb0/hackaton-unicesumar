"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, DollarSign, Power } from "lucide-react"
import { type Device, mockDevices } from "@/lib/data"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import SummaryCards from "@/components/dashboard/summary-cards"
import AlertNotifications from "@/components/dashboard/alert-notifications"
import DeviceDetails from "@/components/dashboard/device-details"
import DeviceFilters from "@/components/dashboard/device-filters"
import DevicesList from "@/components/dashboard/devices-list"
import AnalyticsTab from "@/components/dashboard/analytics-tab"
import CostsTab from "@/components/dashboard/costs-tab"
import AddDeviceDialog from "@/components/dashboard/add-device-dialog"
import { useToast } from "@/hooks/use-toast"

export default function EnergyMonitorDashboard() {
  const [devices, setDevices] = useState<Device[]>(mockDevices)
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string | null>(null)
  const [filterLocation, setFilterLocation] = useState<string | null>(null)
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false)
  const { toast } = useToast()

  // Function to handle device selection
  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device)
  }

  // Function to add a new device
  const handleAddDevice = (newDevice: Partial<Device>) => {
    if (!newDevice.name || !newDevice.type || !newDevice.location) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    const id = (devices.length + 1).toString()
    const currentPower = Number(newDevice.currentPower) || 0
    const averagePower = Number(newDevice.averagePower) || currentPower

    // Calculate estimated consumption
    const dailyConsumption = (currentPower * 24) / 1000
    const monthlyConsumption = dailyConsumption * 30

    const device: Device = {
      id,
      name: newDevice.name,
      type: newDevice.type,
      location: newDevice.location,
      status: newDevice.status as "online" | "offline" | "standby",
      currentPower,
      averagePower,
      dailyConsumption,
      monthlyConsumption,
      isAnomaly: false,
      hasPhantomLoad: currentPower < 20 && currentPower > 0 && newDevice.status === "standby",
      lastUpdate: new Date(),
    }

    setDevices([...devices, device])
    setIsAddDeviceOpen(false)

    toast({
      title: "Dispositivo adicionado",
      description: `${device.name} foi adicionado com sucesso.`,
    })
  }

  // Function to remove a device
  const handleRemoveDevice = (id: string) => {
    setDevices(devices.filter((device) => device.id !== id))
    if (selectedDevice && selectedDevice.id === id) {
      setSelectedDevice(null)
    }

    toast({
      title: "Dispositivo removido",
      description: "O dispositivo foi removido com sucesso.",
    })
  }

  // Function to simulate refresh data
  const handleRefreshData = () => {
    // Simulate data refresh with small random variations
    const updatedDevices = devices.map((device) => {
      const variation = Math.random() * 0.2 - 0.1 // -10% to +10%
      const newCurrentPower = Math.max(1, Math.round(device.currentPower * (1 + variation)))
      const newDailyConsumption = (newCurrentPower * 24) / 1000
      const newMonthlyConsumption = newDailyConsumption * 30

      return {
        ...device,
        currentPower: newCurrentPower,
        dailyConsumption: newDailyConsumption,
        monthlyConsumption: newMonthlyConsumption,
        lastUpdate: new Date(),
        isAnomaly: Math.random() > 0.8 ? true : device.isAnomaly,
      }
    })

    setDevices(updatedDevices)

    toast({
      title: "Dados atualizados",
      description: "Os dados de consumo foram atualizados.",
    })
  }

  // Filter devices based on search term and filters
  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !filterType || device.type === filterType
    const matchesLocation = !filterLocation || device.location === filterLocation

    return matchesSearch && matchesType && matchesLocation
  })

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

  // Dashboard metrics object to pass to components
  const dashboardMetrics = {
    totalCurrentPower,
    totalDailyConsumption,
    totalMonthlyConsumption,
    anomalyDevices,
    phantomLoadDevices,
    onlineDevices,
    costPerKwh,
    estimatedMonthlyCost,
    phantomLoadCost,
    devices,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <DashboardHeader onAddDevice={() => setIsAddDeviceOpen(true)} onRefreshData={handleRefreshData} />

        {/* Summary Cards */}
        <SummaryCards metrics={dashboardMetrics} />

        {/* Alerts */}
        <AlertNotifications
          anomalyDevices={anomalyDevices}
          phantomLoadDevices={phantomLoadDevices}
          phantomLoadCost={phantomLoadCost}
        />

        {/* Selected Device Details */}
        {selectedDevice && (
          <DeviceDetails
            device={selectedDevice}
            onClose={() => setSelectedDevice(null)}
            onRemove={handleRemoveDevice}
            costPerKwh={costPerKwh}
            estimatedMonthlyCost={estimatedMonthlyCost}
          />
        )}

        {/* Filtros e Pesquisa */}
        <DeviceFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          filterLocation={filterLocation}
          setFilterLocation={setFilterLocation}
        />

        {/* Tabs Principal */}
        <Tabs defaultValue="devices" className="space-y-4">
          <TabsList className="bg-white shadow-sm">
            <TabsTrigger
              value="devices"
              className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700"
            >
              <Power className="h-4 w-4 mr-1" />
              Dispositivos
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700"
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Análises
            </TabsTrigger>
            <TabsTrigger
              value="costs"
              className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700"
            >
              <DollarSign className="h-4 w-4 mr-1" />
              Custos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="devices" className="space-y-4">
            <DevicesList filteredDevices={filteredDevices} onDeviceClick={handleDeviceClick} costPerKwh={costPerKwh} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <AnalyticsTab metrics={dashboardMetrics} />
          </TabsContent>

          <TabsContent value="costs" className="space-y-4">
            <CostsTab metrics={dashboardMetrics} onDeviceClick={handleDeviceClick} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal para adicionar dispositivo */}
      <AddDeviceDialog isOpen={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen} onAddDevice={handleAddDevice} />
    </div>
  )
}

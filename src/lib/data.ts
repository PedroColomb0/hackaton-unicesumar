import { Tv, Refrigerator, Thermometer, Smartphone, Lightbulb, Power } from "lucide-react"

// Tipos de dados
export interface Device {
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

// Add this after the existing interfaces
export interface DashboardMetrics {
  totalCurrentPower: number
  totalDailyConsumption: number
  totalMonthlyConsumption: number
  anomalyDevices: Device[]
  phantomLoadDevices: Device[]
  onlineDevices: number
  costPerKwh: number
  estimatedMonthlyCost: number
  phantomLoadCost: number
  devices: Device[]
}

// Dados simulados dos dispositivos
export const mockDevices: Device[] = [
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

// Tipos de dispositivos disponíveis
export const deviceTypes = ["Eletrodoméstico", "Entretenimento", "Climatização", "Eletrônicos", "Iluminação", "Outros"]

// Locais disponíveis
export const locations = [
  "Sala de Estar",
  "Cozinha",
  "Quarto Principal",
  "Quarto de Hóspedes",
  "Escritório",
  "Banheiro",
  "Área Externa",
  "Geral",
]

// Função para obter o status do dispositivo
export const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-emerald-500"
    case "offline":
      return "bg-red-500"
    case "standby":
      return "bg-amber-500"
    default:
      return "bg-gray-500"
  }
}

export const getStatusText = (status: string) => {
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

// Add this function at the end of the file
export const getDeviceIcon = (type: string) => {
  switch (type) {
    case "Entretenimento":
      return Tv
    case "Eletrodoméstico":
      return Refrigerator
    case "Climatização":
      return Thermometer
    case "Eletrônicos":
      return Smartphone
    case "Iluminação":
      return Lightbulb
    default:
      return Power
  }
}

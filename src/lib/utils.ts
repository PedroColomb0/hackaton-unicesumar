import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// This file is generated based on the existing code and the missing exports.
// It might not be perfect, but it should be a good starting point.

import { Tv, Refrigerator, Thermometer, Smartphone, Lightbulb, Power } from "lucide-react"
import type { Device } from "./data"

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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

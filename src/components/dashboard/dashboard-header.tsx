"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle, RefreshCw, Zap } from "lucide-react"

interface DashboardHeaderProps {
  onAddDevice: () => void
  onRefreshData: () => void
}

export default function DashboardHeader({ onAddDevice, onRefreshData }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm">
      <div>
        <div className="flex items-center gap-2">
          <Zap className="h-8 w-8 text-emerald-500" />
          <h1 className="text-3xl font-bold text-gray-900">Monitor de Energia IoT</h1>
        </div>
        <p className="text-gray-600 mt-1">Monitoramento em tempo real do consumo energético</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-emerald-700 font-medium">Ao vivo</span>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={onRefreshData}>
          <RefreshCw className="h-4 w-4" />
          Atualizar
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700"
          onClick={onAddDevice}
        >
          <PlusCircle className="h-4 w-4" />
          Adicionar Dispositivo
        </Button>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { X, Settings, Save, RotateCcw } from "lucide-react"
import type { Device } from "@/lib/data"
import { deviceTypes, locations } from "@/lib/data"

interface DeviceConfigModalProps {
  device: Device
  isOpen: boolean
  onClose: () => void
}

export default function DeviceConfigModal({ device, isOpen, onClose }: DeviceConfigModalProps) {
  const [config, setConfig] = useState({
    name: device.name,
    type: device.type,
    location: device.location,
    maxPower: device.averagePower * 1.5,
    minPower: 0,
    alertsEnabled: true,
    phantomLoadDetection: true,
    autoShutdown: false,
    scheduleEnabled: false,
    scheduleStart: "22:00",
    scheduleEnd: "06:00",
  })

  if (!isOpen) return null

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    console.log("Salvando configurações:", config)
    onClose()
  }

  const handleReset = () => {
    setConfig({
      name: device.name,
      type: device.type,
      location: device.location,
      maxPower: device.averagePower * 1.5,
      minPower: 0,
      alertsEnabled: true,
      phantomLoadDetection: true,
      autoShutdown: false,
      scheduleEnabled: false,
      scheduleStart: "22:00",
      scheduleEnd: "06:00",
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-emerald-600" />
            <h2 className="text-xl font-semibold text-gray-900">Configurar Dispositivo</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Informações Básicas</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="device-name" className="text-sm font-medium text-gray-700">
                  Nome do Dispositivo
                </Label>
                <Input
                  id="device-name"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="device-type" className="text-sm font-medium text-gray-700">
                  Tipo
                </Label>
                <Select value={config.type} onValueChange={(value) => setConfig({ ...config, type: value })}>
                  <SelectTrigger className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg">
                    {deviceTypes.map((type) => (
                      <SelectItem key={type} value={type} className="hover:bg-gray-50">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="device-location" className="text-sm font-medium text-gray-700">
                  Localização
                </Label>
                <Select value={config.location} onValueChange={(value) => setConfig({ ...config, location: value })}>
                  <SelectTrigger className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg">
                    {locations.map((location) => (
                      <SelectItem key={location} value={location} className="hover:bg-gray-50">
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Limites de Consumo */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Limites de Consumo</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="max-power" className="text-sm font-medium text-gray-700">
                  Potência Máxima (W)
                </Label>
                <Input
                  id="max-power"
                  type="number"
                  value={config.maxPower}
                  onChange={(e) => setConfig({ ...config, maxPower: Number(e.target.value) })}
                  className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="min-power" className="text-sm font-medium text-gray-700">
                  Potência Mínima (W)
                </Label>
                <Input
                  id="min-power"
                  type="number"
                  value={config.minPower}
                  onChange={(e) => setConfig({ ...config, minPower: Number(e.target.value) })}
                  className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Configurações de Alertas */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Alertas e Monitoramento</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <Label className="text-sm font-medium text-gray-900">Alertas Habilitados</Label>
                  <p className="text-xs text-gray-600">Receber notificações sobre anomalias</p>
                </div>
                <Switch
                  checked={config.alertsEnabled}
                  onCheckedChange={(checked) => setConfig({ ...config, alertsEnabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <Label className="text-sm font-medium text-gray-900">Detecção de Consumo Fantasma</Label>
                  <p className="text-xs text-gray-600">Monitorar consumo em standby</p>
                </div>
                <Switch
                  checked={config.phantomLoadDetection}
                  onCheckedChange={(checked) => setConfig({ ...config, phantomLoadDetection: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <Label className="text-sm font-medium text-gray-900">Desligamento Automático</Label>
                  <p className="text-xs text-gray-600">Desligar automaticamente em caso de anomalia</p>
                </div>
                <Switch
                  checked={config.autoShutdown}
                  onCheckedChange={(checked) => setConfig({ ...config, autoShutdown: checked })}
                />
              </div>
            </div>
          </div>

          {/* Agendamento */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Agendamento</h3>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <Label className="text-sm font-medium text-gray-900">Agendamento Habilitado</Label>
                <p className="text-xs text-gray-600">Controlar dispositivo por horário</p>
              </div>
              <Switch
                checked={config.scheduleEnabled}
                onCheckedChange={(checked) => setConfig({ ...config, scheduleEnabled: checked })}
              />
            </div>

            {config.scheduleEnabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schedule-start" className="text-sm font-medium text-gray-700">
                    Horário de Início
                  </Label>
                  <Input
                    id="schedule-start"
                    type="time"
                    value={config.scheduleStart}
                    onChange={(e) => setConfig({ ...config, scheduleStart: e.target.value })}
                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schedule-end" className="text-sm font-medium text-gray-700">
                    Horário de Fim
                  </Label>
                  <Input
                    id="schedule-end"
                    type="time"
                    value={config.scheduleEnd}
                    onChange={(e) => setConfig({ ...config, scheduleEnd: e.target.value })}
                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            <RotateCcw className="h-4 w-4" />
            Resetar
          </Button>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="border-gray-300 text-gray-700 hover:bg-gray-100">
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
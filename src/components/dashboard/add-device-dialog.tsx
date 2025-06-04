"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { deviceTypes, locations } from "@/lib/data"
import type { Device } from "@/lib/data"

interface AddDeviceDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onAddDevice: (device: Partial<Device>) => void
}

export default function AddDeviceDialog({ isOpen, onOpenChange, onAddDevice }: AddDeviceDialogProps) {
  const [newDevice, setNewDevice] = useState<Partial<Device>>({
    name: "",
    type: "",
    location: "",
    currentPower: 0,
    averagePower: 0,
    status: "online",
  })

  const handleSubmit = () => {
    onAddDevice(newDevice)
    setNewDevice({
      name: "",
      type: "",
      location: "",
      currentPower: 0,
      averagePower: 0,
      status: "online",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Adicionar Novo Dispositivo</DialogTitle>
          <DialogDescription className="text-gray-600">
            Preencha os detalhes do dispositivo que deseja monitorar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-gray-700">
              Nome*
            </Label>
            <Input
              id="name"
              value={newDevice.name}
              onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
              className="col-span-3 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="Ex: Smart TV Samsung"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right text-gray-700">
              Tipo*
            </Label>
            <Select
              value={newDevice.type || "none"}
              onValueChange={(value) => setNewDevice({ ...newDevice, type: value === "none" ? "" : value })}
            >
              <SelectTrigger className="col-span-3 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="none" className="hover:bg-gray-50">
                  Selecione o tipo
                </SelectItem>
                {deviceTypes.map((type) => (
                  <SelectItem key={type} value={type} className="hover:bg-gray-50">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right text-gray-700">
              Local*
            </Label>
            <Select
              value={newDevice.location || "none"}
              onValueChange={(value) => setNewDevice({ ...newDevice, location: value === "none" ? "" : value })}
            >
              <SelectTrigger className="col-span-3 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Selecione o local" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="none" className="hover:bg-gray-50">
                  Selecione o local
                </SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location} className="hover:bg-gray-50">
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="power" className="text-right text-gray-700">
              Potência (W)
            </Label>
            <Input
              id="power"
              type="number"
              value={newDevice.currentPower || ""}
              onChange={(e) => setNewDevice({ ...newDevice, currentPower: Number(e.target.value) })}
              className="col-span-3 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="Ex: 100"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="average" className="text-right text-gray-700">
              Média (W)
            </Label>
            <Input
              id="average"
              type="number"
              value={newDevice.averagePower || ""}
              onChange={(e) => setNewDevice({ ...newDevice, averagePower: Number(e.target.value) })}
              className="col-span-3 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="Potência média do dispositivo"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right text-gray-700">
              Status
            </Label>
            <Select
              value={newDevice.status || "online"}
              onValueChange={(value) =>
                setNewDevice({ ...newDevice, status: value as "online" | "offline" | "standby" })
              }
            >
              <SelectTrigger className="col-span-3 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="online" className="hover:bg-gray-50">
                  Ativo
                </SelectItem>
                <SelectItem value="standby" className="hover:bg-gray-50">
                  Em Standby
                </SelectItem>
                <SelectItem value="offline" className="hover:bg-gray-50">
                  Desconectado
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="bg-gray-50 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Adicionar Dispositivo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
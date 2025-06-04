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
          <DialogTitle>Adicionar Novo Dispositivo</DialogTitle>
          <DialogDescription>Preencha os detalhes do dispositivo que deseja monitorar.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome*
            </Label>
            <Input
              id="name"
              value={newDevice.name}
              onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
              className="col-span-3"
              placeholder="Ex: Smart TV Samsung"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Tipo*
            </Label>
            <Select value={newDevice.type} onValueChange={(value) => setNewDevice({ ...newDevice, type: value })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {deviceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Local*
            </Label>
            <Select
              value={newDevice.location}
              onValueChange={(value) => setNewDevice({ ...newDevice, location: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o local" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="power" className="text-right">
              Potência (W)
            </Label>
            <Input
              id="power"
              type="number"
              value={newDevice.currentPower || ""}
              onChange={(e) => setNewDevice({ ...newDevice, currentPower: Number(e.target.value) })}
              className="col-span-3"
              placeholder="Ex: 100"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="average" className="text-right">
              Média (W)
            </Label>
            <Input
              id="average"
              type="number"
              value={newDevice.averagePower || ""}
              onChange={(e) => setNewDevice({ ...newDevice, averagePower: Number(e.target.value) })}
              className="col-span-3"
              placeholder="Potência média do dispositivo"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={newDevice.status}
              onValueChange={(value) =>
                setNewDevice({ ...newDevice, status: value as "online" | "offline" | "standby" })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Ativo</SelectItem>
                <SelectItem value="standby">Em Standby</SelectItem>
                <SelectItem value="offline">Desconectado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
            Adicionar Dispositivo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

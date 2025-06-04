import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Eye } from "lucide-react"
import type { Device } from "@/lib/data"

interface AlertNotificationsProps {
  anomalyDevices: Device[]
  phantomLoadDevices: Device[]
  phantomLoadCost: number
}

export default function AlertNotifications({
  anomalyDevices,
  phantomLoadDevices,
  phantomLoadCost,
}: AlertNotificationsProps) {
  if (anomalyDevices.length === 0 && phantomLoadDevices.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      {anomalyDevices.length > 0 && (
        <Alert className="border-red-200 bg-red-50 border shadow-sm">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800 font-medium">Anomalias Detectadas</AlertTitle>
          <AlertDescription className="text-red-700">
            {anomalyDevices.length} dispositivo(s) com consumo anômalo: {anomalyDevices.map((d) => d.name).join(", ")}
          </AlertDescription>
        </Alert>
      )}

      {phantomLoadDevices.length > 0 && (
        <Alert className="border-amber-200 bg-amber-50 border shadow-sm">
          <Eye className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800 font-medium">Consumo Fantasma Detectado</AlertTitle>
          <AlertDescription className="text-amber-700">
            {phantomLoadDevices.length} dispositivo(s) consumindo energia em standby. Custo adicional: R${" "}
            {phantomLoadCost.toFixed(2)}/mês
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

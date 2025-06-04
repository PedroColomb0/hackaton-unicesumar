import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Activity, AlertTriangle, DollarSign, Zap } from "lucide-react"
import type { DashboardMetrics } from "@/lib/data"

interface SummaryCardsProps {
  metrics: DashboardMetrics
}

export default function SummaryCards({ metrics }: SummaryCardsProps) {
  const {
    totalCurrentPower,
    totalDailyConsumption,
    onlineDevices,
    devices,
    estimatedMonthlyCost,
    anomalyDevices,
    phantomLoadDevices,
  } = metrics

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-none shadow-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Consumo Atual</CardTitle>
          <Zap className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCurrentPower.toFixed(0)}W</div>
          <p className="text-xs text-muted-foreground">{totalDailyConsumption.toFixed(1)} kWh hoje</p>
          <Progress value={(totalCurrentPower / 3000) * 100} className="h-1 mt-2" />
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dispositivos Ativos</CardTitle>
          <Activity className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {onlineDevices}/{devices.length}
          </div>
          <p className="text-xs text-muted-foreground">Conectados à rede</p>
          <Progress value={(onlineDevices / devices.length) * 100} className="h-1 mt-2" />
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Custo Estimado</CardTitle>
          <DollarSign className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ {estimatedMonthlyCost.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Previsão mensal</p>
          <Progress value={(estimatedMonthlyCost / 500) * 100} className="h-1 mt-2" />
        </CardContent>
      </Card>

      <Card className="border-none shadow-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Alertas</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{anomalyDevices.length + phantomLoadDevices.length}</div>
          <p className="text-xs text-muted-foreground">Requerem atenção</p>
          <Progress
            value={((anomalyDevices.length + phantomLoadDevices.length) / devices.length) * 100}
            className="h-1 mt-2"
          />
        </CardContent>
      </Card>
    </div>
  )
}

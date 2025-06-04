"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshCw, Search } from "lucide-react"
import { deviceTypes, locations } from "@/lib/data"

interface DeviceFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  filterType: string | null
  setFilterType: (value: string | null) => void
  filterLocation: string | null
  setFilterLocation: (value: string | null) => void
}

export default function DeviceFilters({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  filterLocation,
  setFilterLocation,
}: DeviceFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Pesquisar dispositivos..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={filterType || ""} onValueChange={(value) => setFilterType(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              {deviceTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterLocation || ""} onValueChange={(value) => setFilterLocation(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por local" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os locais</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setSearchTerm("")
              setFilterType(null)
              setFilterLocation(null)
            }}
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Limpar filtros</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

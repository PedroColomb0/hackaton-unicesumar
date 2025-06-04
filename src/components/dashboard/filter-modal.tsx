"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { X, Filter, RotateCcw } from "lucide-react"
import { deviceTypes, locations } from "@/lib/data"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  filterType: string | null
  setFilterType: (value: string | null) => void
  filterLocation: string | null
  setFilterLocation: (value: string | null) => void
}

export default function FilterModal({
  isOpen,
  onClose,
  filterType,
  setFilterType,
  filterLocation,
  setFilterLocation,
}: FilterModalProps) {
  if (!isOpen) return null

  const handleClearFilters = () => {
    setFilterType(null)
    setFilterLocation(null)
  }

  const handleApplyFilters = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-emerald-600" />
            <h2 className="text-xl font-semibold text-gray-900">Filtros</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="filter-type" className="text-sm font-medium text-gray-700">
              Filtrar por Tipo
            </Label>
            <Select
              value={filterType || "all"}
              onValueChange={(value) => setFilterType(value === "all" ? null : value)}
            >
              <SelectTrigger className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="all" className="hover:bg-gray-50">
                  Todos os tipos
                </SelectItem>
                {deviceTypes.map((type) => (
                  <SelectItem key={type} value={type} className="hover:bg-gray-50">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="filter-location" className="text-sm font-medium text-gray-700">
              Filtrar por Local
            </Label>
            <Select
              value={filterLocation || "all"}
              onValueChange={(value) => setFilterLocation(value === "all" ? null : value)}
            >
              <SelectTrigger className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Selecione um local" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="all" className="hover:bg-gray-50">
                  Todos os locais
                </SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location} className="hover:bg-gray-50">
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(filterType || filterLocation) && (
            <div className="p-3 bg-emerald-50 rounded-lg">
              <p className="text-sm text-emerald-800">
                <strong>Filtros ativos:</strong>
              </p>
              <div className="mt-1 space-y-1">
                {filterType && <p className="text-xs text-emerald-700">• Tipo: {filterType}</p>}
                {filterLocation && <p className="text-xs text-emerald-700">• Local: {filterLocation}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            <RotateCcw className="h-4 w-4" />
            Limpar Filtros
          </Button>

          <Button onClick={handleApplyFilters} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </div>
  )
}
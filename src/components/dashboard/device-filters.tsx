"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw, Search, Filter } from "lucide-react"
import { useState } from "react"
import FilterModal from "./filter-modal"

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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Pesquisar dispositivos..."
              className="pl-9 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              Filtrar por Tipo
            </Button>

            <Button
              variant="outline"
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              Filtrar por Local
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setSearchTerm("")
                setFilterType(null)
                setFilterLocation(null)
              }}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Limpar filtros</span>
            </Button>
          </div>
        </div>
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filterType={filterType}
        setFilterType={setFilterType}
        filterLocation={filterLocation}
        setFilterLocation={setFilterLocation}
      />
    </>
  )
}

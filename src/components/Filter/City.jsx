'use client'
import { ChevronDown } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

const europeanCities = [
    { label: 'Berlin', value: 'berlin', count: 1000000 },
    { label: 'Paris', value: 'paris', count: 2200000 },
    { label: 'London', value: 'london', count: 8900000 },
    { label: 'Rome', value: 'rome', count: 2800000 },
    { label: 'Madrid', value: 'madrid', count: 3200000 },
    { label: 'Vienna', value: 'vienna', count: 1900000 },
    { label: 'Amsterdam', value: 'amsterdam', count: 870000 },
    { label: 'Barcelona', value: 'barcelona', count: 1600000 },
    { label: 'Lisbon', value: 'lisbon', count: 550000 },
    { label: 'Copenhagen', value: 'copenhagen', count: 800000 },
    { label: 'Stockholm', value: 'stockholm', count: 975000 },
    { label: 'Oslo', value: 'oslo', count: 700000 },
    { label: 'Helsinki', value: 'helsinki', count: 650000 },
    { label: 'Budapest', value: 'budapest', count: 1750000 },
    { label: 'Prague', value: 'prague', count: 1300000 },
    { label: 'Warsaw', value: 'warsaw', count: 1800000 },
    { label: 'Brussels', value: 'brussels', count: 1150000 },
    { label: 'Zurich', value: 'zurich', count: 430000 },
    { label: 'Geneva', value: 'geneva', count: 200000 },
    { label: 'Frankfurt', value: 'frankfurt', count: 750000 },
    { label: 'Munich', value: 'munich', count: 1500000 },
    { label: 'Hamburg', value: 'hamburg', count: 1800000 },
    { label: 'Belgrade', value: 'belgrade', count: 1200000 },
    { label: 'Zagreb', value: 'zagreb', count: 800000 },
    { label: 'Athens', value: 'athens', count: 3200000 },
    { label: 'Ljubljana', value: 'ljubljana', count: 300000 },
    { label: 'Bucharest', value: 'bucharest', count: 2000000 },
    { label: 'Sofia', value: 'sofia', count: 1300000 },
    { label: 'Tallinn', value: 'tallinn', count: 450000 },
    { label: 'Vilnius', value: 'vilnius', count: 600000 },
]

export const City = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedCities, setSelectedCities] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const filtersContainerRef = useRef(null)
    const searchParams = useSearchParams()

    const handleSelectCities = (value) => {
        setSelectedCities((prev) => {
            const updatedCities = prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]

            const url = new URL(window.location)
            const params = new URLSearchParams(url.search)

            if (updatedCities.length === 0) {
                params.delete('city')
            } else {
                params.set('city', updatedCities.join(','))
            }

            window.history.pushState(
                {},
                '',
                `${url.pathname}?${params.toString()}`
            )
            return updatedCities
        })
    }

    const toggleFilter = () => {
        setIsOpen((prev) => !prev)
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value)
    }

    const filteredCities = europeanCities.filter((city) =>
        city.label.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                filtersContainerRef.current &&
                !filtersContainerRef.current.contains(event.target)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Read the 'city' parameter from the URL on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const cityParam = params.get('city')

        if (cityParam) {
            const citiesFromURL = cityParam
                .split(',')
                .filter((value) =>
                    europeanCities.some((city) => city.value === value)
                )
            setSelectedCities(citiesFromURL)
        }
    }, [searchParams])

    return (
        <div ref={filtersContainerRef}>
            <div className="relative mb-4">
                <label className="block mb-2 font-medium">Города</label>
                <button
                    onClick={toggleFilter}
                    className="w-full border rounded-lg px-4 py-2 flex justify-between items-center"
                >
                    {selectedCities.length > 0
                        ? `${selectedCities.length} выбрано`
                        : 'Выберите город'}
                    <ChevronDown size={20} />
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {/* Search input */}
                        <div className="p-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Поиск по городу..."
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>

                        {/* Cities list */}
                        {filteredCities.map(({ label, value, count }) => (
                            <label
                                key={value}
                                className={`flex items-center px-4 py-2 cursor-pointer ${
                                    selectedCities.includes(value)
                                        ? 'bg-gray-200'
                                        : 'hover:bg-gray-100'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCities.includes(value)}
                                    onChange={() => handleSelectCities(value)}
                                    className="mr-2"
                                />
                                {label}
                                <span className="ml-auto text-gray-500">
                                    ({count})
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

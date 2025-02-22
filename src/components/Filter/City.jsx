'use client'
import { ChevronDown } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

const europeanCities = [
    { label: 'Bayreuth' },
    { label: 'Berlin' },
    { label: 'Bernburg / Saale' },
    { label: 'Bingen am Rhein' },
    { label: 'Bonn' },
    { label: 'Cologne' },
    { label: 'Cotibus' },
    { label: 'Dortmund' },
    { label: 'Dresden' },
    { label: 'Eberswalde' },
    { label: 'Frankfurt am Main' },
    { label: 'Freiburg im Breisgau' },
    { label: 'Freising' },
    { label: 'Fulda' },
    { label: 'Geisenheim' },
    { label: 'Gießen' },
    { label: 'Göttingen' },
    { label: 'Hamburg' },
    { label: 'Hanover' },
    { label: 'Höxter' },
    { label: 'Kiel' },
    { label: 'Kulmbach' },
    { label: 'Landau in der Pfalz' },
    { label: 'Leipzig' },
    { label: 'Lübeck' },
    { label: 'Lüneburg' },
    { label: 'Munich' },
    { label: 'Neubrandenburg' },
    { label: 'Neustadt an der Weinstraße' },
    { label: 'Nürtingen' },
    { label: 'Offenburg' },
    { label: 'Osnabrück' },
    { label: 'Potsdam' },
    { label: 'Rosenheim' },
    { label: 'Singapore' },
    { label: 'Straßsund' },
    { label: 'Stuttgart' },
    { label: 'Tharandt' },
    { label: 'Trier' },
    { label: 'Weidenbach' },
    { label: 'Weimar' },
    { label: 'Witzenhausen' },
    { label: 'Zittau' },
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
            params.delete('cit[]')

            updatedCities.forEach((city) => {
                params.append('cit[]', city)
            })

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

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const citiesFromURL = params.getAll('cit[]')
        setSelectedCities(
            citiesFromURL.filter((value) =>
                europeanCities.some((city) => city.label === value)
            )
        )
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
                        <div className="p-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Поиск по городу..."
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        {filteredCities.map(({ label }) => (
                            <label
                                key={label}
                                className={`flex items-center px-4 py-2 cursor-pointer ${
                                    selectedCities.includes(label)
                                        ? 'bg-gray-200'
                                        : 'hover:bg-gray-100'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCities.includes(label)}
                                    onChange={() => handleSelectCities(label)}
                                    className="mr-2"
                                />
                                {label}
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

'use client'
import { ChevronDown } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

const startSemesters = [
    { label: 'Летний семестр', value: '2' },
    { label: 'Зимний семестр', value: '1' },
    { label: 'Другие', value: '5' },
]

export const Begining = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedBegining, setSelectedBegining] = useState([])
    const filtersContainerRef = useRef(null)
    const searchParams = useSearchParams()

    // Handle selecting/deselecting start semesters and updating URL params
    const handleSelectBegining = (value) => {
        setSelectedBegining((prev) => {
            const newBegining = prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]

            const url = new URL(window.location)
            const params = new URLSearchParams(url.search)

            // Clear existing 'bgn[]' parameters
            params.delete('bgn[]')

            // Add selected semesters as 'bgn[]' parameters
            newBegining.forEach((item) => {
                params.append('bgn[]', item)
            })

            window.history.pushState(
                {},
                '',
                `${url.pathname}?${params.toString()}`
            )

            return newBegining
        })
    }

    // Toggle the filter dropdown visibility
    const toggleFilter = () => {
        setIsOpen(!isOpen)
    }

    // Close the dropdown if clicking outside
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

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Sync selected start semesters with URL params on page load
    useEffect(() => {
        const url = new URL(window.location)
        const params = new URLSearchParams(url.search)
        const beginingParam = params.getAll('bgn[]')

        if (beginingParam.length > 0) {
            setSelectedBegining(beginingParam)
        }
    }, [searchParams])

    return (
        <div ref={filtersContainerRef}>
            <div className="relative mb-4">
                <label className="block mb-2 font-medium">Начало курса</label>
                <button
                    onClick={toggleFilter}
                    className="w-full border rounded-lg px-4 py-2 flex justify-between items-center"
                >
                    {selectedBegining.length > 0
                        ? `${selectedBegining.length} выбрано`
                        : 'Выберите начало'}
                    <ChevronDown size={20} />
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {startSemesters.map(({ label, value, count }) => (
                            <label
                                key={value}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedBegining.includes(value)}
                                    onChange={() => handleSelectBegining(value)}
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

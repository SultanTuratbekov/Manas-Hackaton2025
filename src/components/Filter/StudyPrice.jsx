'use client'
import { ChevronDown } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

const tuitionFees = [
    {
        label: 'Менее 500 евро',
        value: 'lessThan500',
        range: '0-500',
        count: 500,
    },
    {
        label: '500 - 1000 евро',
        value: '500to1000',
        range: '500-1000',
        count: 1200,
    },
    {
        label: '1000 - 3000 евро',
        value: '1000to3000',
        range: '1000-3000',
        count: 850,
    },
    {
        label: '3000 - 5000 евро',
        value: '3000to5000',
        range: '3000-5000',
        count: 600,
    },
    {
        label: 'Более 5000 евро',
        value: 'moreThan5000',
        range: '5000+',
        count: 300,
    },
]

export const StudyPrice = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTuitionFees, setSelectedTuitionFees] = useState(null)
    const filtersContainerRef = useRef(null)
    const searchParams = useSearchParams()

    // Handle selection and update URL parameter
    const handleSelectTuitionFees = (value) => {
        setSelectedTuitionFees(value)

        const url = new URL(window.location)
        const params = new URLSearchParams(url.search)

        if (!value) {
            params.delete('tuitionFees')
        } else {
            params.set('tuitionFees', value)
        }

        window.history.pushState({}, '', `${url.pathname}?${params.toString()}`)
        setIsOpen(false)
    }

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

    // Set selected value from URL on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const tuitionParam = params.get('tuitionFees')

        if (
            tuitionParam &&
            tuitionFees.some((fee) => fee.value === tuitionParam)
        ) {
            setSelectedTuitionFees(tuitionParam)
        }
    }, [searchParams])

    return (
        <div ref={filtersContainerRef}>
            <div className="relative mb-4">
                <label className="block mb-2 font-medium">
                    Плата за обучение
                </label>
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="w-full border rounded-lg px-4 py-2 flex justify-between items-center"
                >
                    {selectedTuitionFees
                        ? tuitionFees.find(
                              (fee) => fee.value === selectedTuitionFees
                          )?.label
                        : 'Выберите цену за обучение'}
                    <ChevronDown size={20} />
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {tuitionFees.map(({ label, value, count }) => (
                            <label
                                key={value}
                                className={`flex items-center px-4 py-2 cursor-pointer ${
                                    selectedTuitionFees === value
                                        ? 'bg-gray-200'
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={() => handleSelectTuitionFees(value)}
                            >
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

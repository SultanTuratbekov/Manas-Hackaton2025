'use client'
import { ChevronDown } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

const tuitionFees = [
    {
        label: 'Бесплатно',
        value: '1',
    },
    {
        label: 'до 500 евро',
        value: '2',
    },
    {
        label: 'до 5000 евро',
        value: '3',
    },
    {
        label: 'до 10000 евро',
        value: '4',
    },
]

export const StudyPrice = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTuitionFee, setSelectedTuitionFee] = useState(null)
    const filtersContainerRef = useRef(null)
    const searchParams = useSearchParams()

    // Handle selection and update URL parameter
    const handleSelectTuitionFee = (value) => {
        setSelectedTuitionFee(value)

        const url = new URL(window.location)
        const params = new URLSearchParams(url.search)

        if (!value) {
            params.delete('fee')
        } else {
            params.set('fee', value)
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
        const tuitionParam = params.get('fee')

        if (
            tuitionParam &&
            tuitionFees.some((fee) => fee.value === tuitionParam)
        ) {
            setSelectedTuitionFee(tuitionParam)
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
                    {selectedTuitionFee
                        ? tuitionFees.find(
                              (fee) => fee.value === selectedTuitionFee
                          )?.label
                        : 'Выберите цену за обучение'}
                    <ChevronDown size={20} />
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {tuitionFees.map(({ label, value }) => (
                            <label
                                key={value}
                                className={`flex items-center px-4 py-2 cursor-pointer ${
                                    selectedTuitionFee === value
                                        ? 'bg-gray-200'
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={() => handleSelectTuitionFee(value)}
                            >
                                {label}
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

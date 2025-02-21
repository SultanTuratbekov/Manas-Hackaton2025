import { ChevronDown } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'

const startSemesters = [
    { label: 'Летний семестр', value: 'summer', count: 350 },
    { label: 'Зимний семестр', value: 'winter', count: 500 },
    { label: 'Весенний семестр', value: 'spring', count: 200 },
    { label: 'Осенний семестр', value: 'autumn', count: 600 },
    { label: 'Гибкий старт', value: 'flexible', count: 150 },
]

export const Begining = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedBegining, setSelectedBegining] = useState([])
    const filtersContainerRef = useRef(null)

    const handleSelectBegining = (value) => {
        setSelectedBegining((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        )
    }

    const toggleFilter = () => {
        setIsOpen(!isOpen)
    }

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

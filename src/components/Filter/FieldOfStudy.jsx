import { ChevronDown } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'

const studyFields = [
    { label: 'Програмная инженерия', value: 'programming', count: 342 },
    { label: 'Прикладная математика', value: 'math', count: 1588 },
    { label: 'Искусство', value: 'art', count: 175 },
]

export const FieldOfStudy = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState(null)
    const filtersContainerRef = useRef(null)

    const handleSelectFieldOfStudy = (value) => {
        setSelectedFieldOfStudy(value)
        setIsOpen(false)
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
                <label className="block mb-2 font-medium">Тип курса</label>
                <button
                    onClick={toggleFilter}
                    className="w-full border rounded-lg px-4 py-2 flex justify-between items-center"
                >
                    {selectedFieldOfStudy
                        ? selectedFieldOfStudy
                        : 'Выберите тип курса'}
                    <ChevronDown size={20} />
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {studyFields.map(({ label, value, count }) => (
                            <label
                                key={value}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelectFieldOfStudy(label)}
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

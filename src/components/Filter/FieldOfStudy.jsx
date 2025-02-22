import { ChevronDown } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

const studyFields = [
    { label: 'Програмная инженерия', value: 'programming', count: 342 },
    { label: 'Прикладная математика', value: 'math', count: 1588 },
    { label: 'Искусство', value: 'art', count: 175 },
]

export const FieldOfStudy = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState(null)
    const filtersContainerRef = useRef(null)
    const params = useSearchParams()

    // Handle selecting field of study and updating URL params
    const handleSelectFieldOfStudy = (value) => {
        setSelectedFieldOfStudy(value)

        const url = new URL(window.location)
        const params = new URLSearchParams(url.search)

        if (!value) {
            params.delete('fieldOfStudy')
        } else {
            params.set('fieldOfStudy', value)
        }

        window.history.pushState({}, '', `${url.pathname}?${params.toString()}`)
        setIsOpen(false)
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

    // Sync selected field of study with URL params on page load
    useEffect(() => {
        const url = new URL(window.location)
        const params = new URLSearchParams(url.search)
        const fieldOfStudyParam = params.get('fieldOfStudy')

        if (fieldOfStudyParam) {
            setSelectedFieldOfStudy(fieldOfStudyParam)
        }
    }, [params])

    return (
        <div ref={filtersContainerRef}>
            <div className="relative mb-4">
                <label className="block mb-2 font-medium">Направление</label>
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

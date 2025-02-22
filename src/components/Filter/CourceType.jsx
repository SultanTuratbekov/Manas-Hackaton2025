import { ChevronDown } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

const courseTypes = [
    { label: "Bachelor's degree", value: 'bachelor', count: 342 },
    { label: "Master's degree", value: 'master', count: 1588 },
    { label: 'PhD / Doctorate', value: 'phd', count: 175 },
    {
        label: 'Cross-faculty graduate and research school',
        value: 'cross-faculty',
        count: 26,
    },
    { label: 'Prep course', value: 'prep', count: 34 },
    { label: 'Language course', value: 'language', count: 135 },
    { label: 'Short course', value: 'short', count: 120 },
]

export const CourceType = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedCourseType, setSelectedCourseType] = useState([])
    const filtersContainerRef = useRef(null)
    const params = useSearchParams()

    // Handle selecting/deselecting course types and updating URL params
    const handleSelectCourseType = (value) => {
        setSelectedCourseType((prev) => {
            const newCourceType = prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]

            const url = new URL(window.location)
            const params = new URLSearchParams(url.search)

            if (newCourceType.length === 0) {
                params.delete('courceType')
            } else {
                params.set('courceType', newCourceType.join(','))
            }

            window.history.pushState(
                {},
                '',
                `${url.pathname}?${params.toString()}`
            )

            return newCourceType
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

    // Sync selected course types with URL params on page load
    useEffect(() => {
        const url = new URL(window.location)
        const params = new URLSearchParams(url.search)
        const courseTypeParam = params.get('courceType')

        if (courseTypeParam) {
            setSelectedCourseType(courseTypeParam.split(','))
        }
    }, [params])

    return (
        <div ref={filtersContainerRef}>
            <div className="relative mb-4">
                <label className="block mb-2 font-medium">Тип курса</label>
                <button
                    onClick={toggleFilter}
                    className="w-full border rounded-lg px-4 py-2 flex justify-between items-center"
                >
                    {selectedCourseType.length > 0
                        ? `${selectedCourseType.length} выбрано`
                        : 'Выберите тип курса'}
                    <ChevronDown size={20} />
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {courseTypes.map(({ label, value, count }) => (
                            <label
                                key={value}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCourseType.includes(value)}
                                    onChange={() =>
                                        handleSelectCourseType(value)
                                    }
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

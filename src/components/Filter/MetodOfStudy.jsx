import { ChevronDown } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'

const learningMethods = [
    { label: 'Online', value: 'online', count: 1500 },
    { label: 'Offline', value: 'offline', count: 850 },
    { label: 'Hybrid (50% Online, 50% Offline)', value: 'hybrid', count: 1200 },
    {
        label: 'Blended (Mostly Online with Some Offline)',
        value: 'blended',
        count: 1000,
    },
    { label: 'Self-paced Online', value: 'self-paced', count: 900 },
    { label: 'In-person (Classroom)', value: 'in-person', count: 650 },
]

export const MetodOfStudy = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedMetodsOfStudy, setSelectedMetodsOfStudy] = useState([])
    const filtersContainerRef = useRef(null)

    const handleSelectMetodOfStudy = (value) => {
        setSelectedMetodsOfStudy((prev) =>
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
                <label className="block mb-2 font-medium">Метод обучения</label>
                <button
                    onClick={toggleFilter}
                    className="w-full border rounded-lg px-4 py-2 flex justify-between items-center"
                >
                    {selectedMetodsOfStudy.length > 0
                        ? `${selectedMetodsOfStudy.length} выбрано`
                        : 'Выберите тип курса'}
                    <ChevronDown size={20} />
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {learningMethods.map(({ label, value, count }) => (
                            <label
                                key={value}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedMetodsOfStudy.includes(
                                        value
                                    )}
                                    onChange={() =>
                                        handleSelectMetodOfStudy(value)
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

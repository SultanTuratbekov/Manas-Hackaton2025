'use client'
import { ChevronDown } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

const learningMethods = [
    { label: 'Fully on-site', value: '7' },
    { label: 'Fully online', value: '1' },
    { label: 'Hybrid (50% Online, 50% Offline)', value: '2' },
    { label: 'Less than 50% online', value: '5' },
    { label: 'More than 50% online', value: '6' },
]

export const MetodOfStudy = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedMetodsOfStudy, setSelectedMetodsOfStudy] = useState([])
    const filtersContainerRef = useRef(null)
    const params = useSearchParams()

    // Handle selecting methods of study and update URL params
    const handleSelectMetodOfStudy = (value) => {
        setSelectedMetodsOfStudy((prev) => {
            const newMethodOfStudy = prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]

            const url = new URL(window.location)
            const searchParams = new URLSearchParams(url.search)

            // Clear the existing modStd[] parameters
            searchParams.delete('modStd[]')

            // Add the selected methods to modStd[] in the URL
            newMethodOfStudy.forEach((method) => {
                searchParams.append('modStd[]', method)
            })

            window.history.pushState(
                {},
                '',
                `${url.pathname}?${searchParams.toString()}`
            )

            return newMethodOfStudy
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

    // Sync selected filters with URL params on page load
    useEffect(() => {
        const url = new URL(window.location)
        const searchParams = new URLSearchParams(url.search)
        const methodOfStudyParams = searchParams.getAll('modStd[]')

        if (methodOfStudyParams.length > 0) {
            setSelectedMetodsOfStudy(methodOfStudyParams)
        }
    }, [params])

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
                        {learningMethods.map(({ label, value }) => (
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
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

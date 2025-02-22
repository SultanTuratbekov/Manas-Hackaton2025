'use client'
import { ChevronDown } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const languageTypes = [
    { label: 'English only', value: 'english', langValue: 2 },
    { label: 'German only', value: 'german', langValue: 1 },
    { label: 'German & English', value: 'german&english', langValue: 4 },
    { label: 'Other', value: 'other', langValue: 3 },
]

export const CourseLanguage = () => {
    const [selectedLanguages, setSelectedLanguages] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const filtersContainerRef = useRef(null)
    const params = useSearchParams()

    // Handle selecting/unselecting languages and updating URL params
    const handleSelectLanguage = (value, langValue) => {
        setSelectedLanguages((prev) => {
            const isSelected = prev.includes(value)
            const updatedLanguages = isSelected
                ? prev.filter((lang) => lang !== value)
                : [...prev, value]

            const url = new URL(window.location)
            const searchParams = new URLSearchParams(url.search)

            const existingLangValues = searchParams.getAll('lang[]').map(Number)

            if (isSelected) {
                // Remove langValue from URL
                const updatedLangValues = existingLangValues.filter(
                    (v) => v !== langValue
                )
                searchParams.delete('lang[]')
                updatedLangValues.forEach((v) =>
                    searchParams.append('lang[]', v)
                )
            } else {
                // Add langValue to URL if not already present
                if (!existingLangValues.includes(langValue)) {
                    searchParams.append('lang[]', langValue)
                }
            }

            window.history.pushState(
                {},
                '',
                `${url.pathname}?${searchParams.toString()}`
            )
            return updatedLanguages
        })
    }

    // Toggle dropdown visibility
    const toggleFilter = () => setIsOpen((prev) => !prev)

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

    // Sync selected languages with URL on page load
    useEffect(() => {
        const url = new URL(window.location)
        const langParams = url.searchParams.getAll('lang[]').map(Number)

        const selected = languageTypes
            .filter(({ langValue }) => langParams.includes(langValue))
            .map(({ value }) => value)

        setSelectedLanguages(selected)
    }, [params])

    return (
        <div ref={filtersContainerRef}>
            <div className="relative mb-4">
                <label className="block mb-2 font-medium">Языки обучения</label>
                <button
                    onClick={toggleFilter}
                    className="w-full border rounded-lg px-4 py-2 flex justify-between items-center"
                >
                    {selectedLanguages.length > 0
                        ? `${selectedLanguages.length} выбрано`
                        : 'Выберите язык'}
                    <ChevronDown size={20} />
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {languageTypes.map(({ label, value, langValue }) => (
                            <label
                                key={value}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedLanguages.includes(value)}
                                    onChange={() =>
                                        handleSelectLanguage(value, langValue)
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

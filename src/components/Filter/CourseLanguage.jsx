'use client'
import { ChevronDown } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const languageTypes = [
    { label: 'English', value: 'english' },
    { label: 'German', value: 'german' },
]

export const CourseLanguage = () => {
    const [selectedLanguages, setSelectedLanguages] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const filtersContainerRef = useRef(null)
    const params = useSearchParams()

    // Handle selecting languages and updating URL params
    const handleSelectLanguage = (value) => {
        setSelectedLanguages((prev) => {
            const newCourseLanguage = prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]

            const url = new URL(window.location)
            const params = new URLSearchParams(url.search)

            if (newCourseLanguage.length === 0) {
                params.delete('courseLanguage')
            } else {
                params.set('courseLanguage', newCourseLanguage.join(','))
            }

            window.history.pushState(
                {},
                '',
                `${url.pathname}?${params.toString()}`
            )

            return newCourseLanguage
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

    // Sync selected languages with URL params on page load
    useEffect(() => {
        const url = new URL(window.location)
        const params = new URLSearchParams(url.search)
        const courseLanguageParam = params.get('courseLanguage')

        if (courseLanguageParam) {
            setSelectedLanguages(courseLanguageParam.split(','))
        }
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
                        : 'Выберите тип курса'}
                    <ChevronDown size={20} />
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {languageTypes.map(({ label, value }) => (
                            <label
                                key={value}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedLanguages.includes(value)}
                                    onChange={() => handleSelectLanguage(value)}
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

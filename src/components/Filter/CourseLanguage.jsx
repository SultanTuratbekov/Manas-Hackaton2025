import { ChevronDown } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const languageTypes = [
    { label: 'English', value: 'english' },
    { label: 'Russian', value: 'russian' },
    { label: 'German', value: 'german' },
    { label: 'French', value: 'french' },
    { label: 'Spanish', value: 'spanish' },
    { label: 'Italian', value: 'italian' },
    { label: 'Chinese', value: 'chinese' },
    { label: 'Japanese', value: 'japanese' },
    { label: 'Korean', value: 'korean' },
]

export const CourseLanguage = () => {
    const [selectedLanguages, setSelectedLanguages] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const filtersContainerRef = useRef(null)

    const handleSelectLanguage = (value) => {
        setSelectedLanguages((prev) =>
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
                        {languageTypes.map(({ label, value, count }) => (
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

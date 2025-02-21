import { ChevronDown } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'

const englishTestLevels = [
    {
        label: 'IELTS (International English Language Testing System)',
        value: 'ielts',
        short: 'IELTS',
    },
    {
        label: 'TOEFL (Test of English as a Foreign Language)',
        value: 'toefl',
        short: 'TOEFL',
    },
    {
        label: 'CERF (Common European Framework of Reference for Languages)',
        value: 'cerf',
        short: 'CERF',
    },
]

export const LanguageDegrees = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedLanguageDegrees, setSelectedLanguageDegrees] = useState(null)
    const [score, setScore] = useState('')
    const filtersContainerRef = useRef(null)

    const handleSelectLanguageDegrees = (value, short) => {
        setSelectedLanguageDegrees({ label: value, short: short })
        setIsOpen(false)
        setScore('')
    }

    const toggleFilter = () => {
        setIsOpen(!isOpen)
    }

    const handleScoreChange = (e) => {
        setScore(e.target.value)
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
                <label className="block mb-2 font-medium">
                    Уровень владения языка
                </label>
                <button
                    onClick={toggleFilter}
                    className="w-full border rounded-lg px-4 py-2 flex justify-between items-center"
                >
                    {selectedLanguageDegrees
                        ? selectedLanguageDegrees.label
                        : 'Выберите уровень языка'}
                    <ChevronDown size={20} />
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {englishTestLevels.map(({ label, value, short }) => (
                            <label
                                key={value}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() =>
                                    handleSelectLanguageDegrees(label, short)
                                }
                            >
                                {label}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {selectedLanguageDegrees && (
                <div className="mt-4">
                    <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-lg">
                            {selectedLanguageDegrees.short}:
                        </span>
                        <input
                            type="number"
                            value={score}
                            onChange={handleScoreChange}
                            placeholder="Введите балл"
                            className="border rounded-lg p-2"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

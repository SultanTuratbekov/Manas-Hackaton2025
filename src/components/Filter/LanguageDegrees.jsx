'use client'

import { ChevronDown } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

const englishTestLevels = [
    { label: 'IELTS', value: 'ielts' },
    { label: 'TOEFL IBT', value: 'toefl_ibt' },
    { label: 'TOEFL PBT', value: 'toefl_pbt' },
    { label: 'CERF', value: 'cerf' },
]

const cerfLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export const LanguageDegrees = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedLanguageDegrees, setSelectedLanguageDegrees] = useState(null)
    const [score, setScore] = useState('')
    const [selectedCerfLevel, setSelectedCerfLevel] = useState('')
    const filtersContainerRef = useRef(null)
    const searchParams = useSearchParams()

    const handleSelectLanguageDegrees = (value, label) => {
        setSelectedLanguageDegrees({ value, label })
        setIsOpen(false)
        setScore('')
        setSelectedCerfLevel('')

        const url = new URL(window.location)
        const params = new URLSearchParams(url.search)

        params.delete('ielts')
        params.delete('toefl_ibt')
        params.delete('toefl_pbt')
        params.delete('cerf')

        window.history.pushState({}, '', `${url.pathname}?${params.toString()}`)
    }

    const handleScoreChange = (e) => {
        const newScore = e.target.value
        setScore(newScore)

        const url = new URL(window.location)
        const params = new URLSearchParams(url.search)

        params.delete('ielts')
        params.delete('toefl_ibt')
        params.delete('toefl_pbt')
        params.delete('cerf')

        if (selectedLanguageDegrees) {
            params.set(selectedLanguageDegrees.value, newScore)
        }

        window.history.pushState({}, '', `${url.pathname}?${params.toString()}`)
    }

    const handleCerfLevelSelect = (level) => {
        setSelectedCerfLevel(level)

        const url = new URL(window.location)
        const params = new URLSearchParams(url.search)

        params.delete('ielts')
        params.delete('toefl_ibt')
        params.delete('toefl_pbt')
        params.delete('cerf')

        params.set('cerf', level.toLowerCase())

        window.history.pushState({}, '', `${url.pathname}?${params.toString()}`)
    }

    useEffect(() => {
        const url = new URL(window.location)
        const params = new URLSearchParams(url.search)

        const languageParam = params.get('ielts')
            ? 'ielts'
            : params.get('toefl_ibt')
              ? 'toefl_ibt'
              : params.get('toefl_pbt')
                ? 'toefl_pbt'
                : params.get('cerf')
                  ? 'cerf'
                  : null

        const scoreParam = languageParam ? params.get(languageParam) : ''

        if (languageParam) {
            const selectedTest = englishTestLevels.find(
                (level) => level.value === languageParam
            )
            if (selectedTest) {
                setSelectedLanguageDegrees(selectedTest)
                if (
                    languageParam === 'cerf' &&
                    cerfLevels.includes(scoreParam.toUpperCase())
                ) {
                    setSelectedCerfLevel(scoreParam.toUpperCase())
                } else {
                    setScore(scoreParam || '')
                }
            }
        }

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
    }, [searchParams])

    return (
        <div ref={filtersContainerRef}>
            <div className="relative mb-4">
                <label className="block mb-2 font-medium">
                    Уровень владения языка
                </label>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full border rounded-lg px-4 py-2 flex justify-between items-center"
                >
                    {selectedLanguageDegrees
                        ? selectedLanguageDegrees.label
                        : 'Выберите уровень языка'}
                    <ChevronDown size={20} />
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                        {englishTestLevels.map(({ label, value }) => (
                            <div
                                key={value}
                                onClick={() =>
                                    handleSelectLanguageDegrees(value, label)
                                }
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {label}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedLanguageDegrees?.value === 'cerf' && (
                <div className="mt-4">
                    <label className="block mb-2 font-medium">
                        Выберите уровень CERF:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {cerfLevels.map((level) => (
                            <button
                                key={level}
                                onClick={() => handleCerfLevelSelect(level)}
                                className={`px-3 py-2 border rounded-lg text-center ${
                                    selectedCerfLevel === level
                                        ? 'bg-blue-500 text-white'
                                        : 'hover:bg-gray-100'
                                }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {selectedLanguageDegrees &&
                selectedLanguageDegrees.value !== 'cerf' && (
                    <div className="mt-4">
                        <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-lg">
                                {selectedLanguageDegrees.label}:
                            </span>
                            <input
                                type="number"
                                value={score}
                                onChange={handleScoreChange}
                                placeholder="Введите балл"
                                className="border rounded-lg p-2 w-32"
                            />
                        </div>
                    </div>
                )}
        </div>
    )
}

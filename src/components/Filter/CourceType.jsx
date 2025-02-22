'use client'
import { ChevronDown } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'

// Сопоставление типа курса с соответствующим значением degree
const courseTypes = [
    {
        label: "Bachelor's degree",
        value: 'bachelor',
        degreeValue: '1',
        count: 342,
    },
    {
        label: "Master's degree",
        value: 'master',
        degreeValue: '2',
        count: 1588,
    },
    { label: 'PhD / Doctorate', value: 'phd', degreeValue: '3', count: 175 },
    {
        label: 'Cross-faculty graduate and research school',
        value: 'cross-faculty',
        degreeValue: '4',
        count: 26,
    },
    { label: 'Prep course', value: 'prep', degreeValue: '5', count: 34 },
    {
        label: 'Language course',
        value: 'language',
        degreeValue: '6',
        count: 135,
    },
    { label: 'Short course', value: 'short', degreeValue: '7', count: 120 },
]

export const CourceType = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedCourseType, setSelectedCourseType] = useState([])
    const filtersContainerRef = useRef(null)
    const params = useSearchParams()

    // Выбор/отмена выбора типа курса и обновление URL с параметром degree[]
    const handleSelectCourseType = (value, degreeValue) => {
        setSelectedCourseType((prev) => {
            const isSelected = prev.includes(value)
            const updatedSelected = isSelected
                ? prev.filter((item) => item !== value)
                : [...prev, value]

            const url = new URL(window.location)
            const searchParams = new URLSearchParams(url.search)

            // Удаляем все существующие degree[] перед добавлением новых
            searchParams.delete('degree[]')

            // Определяем новые degree[] на основе выбранных курсов
            const updatedDegrees = courseTypes
                .filter(({ value }) => updatedSelected.includes(value))
                .map(({ degreeValue }) => degreeValue)

            // Добавляем обновленные значения degree[]
            updatedDegrees.forEach((deg) =>
                searchParams.append('degree[]', deg)
            )

            // Обновляем URL без перезагрузки
            window.history.pushState(
                {},
                '',
                `${url.pathname}?${searchParams.toString()}`
            )

            return updatedSelected
        })
    }

    // Открытие/закрытие выпадающего списка
    const toggleFilter = () => {
        setIsOpen((prev) => !prev)
    }

    // Закрытие выпадающего списка при клике вне его области
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

    // Синхронизация выбранных курсов с параметрами URL при загрузке страницы
    useEffect(() => {
        const url = new URL(window.location)
        const searchParams = new URLSearchParams(url.search)
        const degreeParams = searchParams.getAll('degree[]')

        if (degreeParams.length > 0) {
            const selected = courseTypes
                .filter(({ degreeValue }) => degreeParams.includes(degreeValue))
                .map(({ value }) => value)

            setSelectedCourseType(selected)
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
                        {courseTypes.map(
                            ({ label, value, degreeValue, count }) => (
                                <label
                                    key={value}
                                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedCourseType.includes(
                                            value
                                        )}
                                        onChange={() =>
                                            handleSelectCourseType(
                                                value,
                                                degreeValue
                                            )
                                        }
                                        className="mr-2"
                                    />
                                    {label}
                                    <span className="ml-auto text-gray-500">
                                        ({count})
                                    </span>
                                </label>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

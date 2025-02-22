'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export const AverageScore = () => {
    const [maxScore, setMaxScore] = useState('4.0') // Значение по умолчанию - максимальный балл 4.0
    const [score, setScore] = useState('') // Средний балл
    const searchParams = useSearchParams()

    const handleMaxScoreChange = (e) => {
        setMaxScore(e.target.value)
        setScore('') // Сбросить введенный балл при смене максимального значения
    }

    const handleScoreChange = (e) => {
        setScore(e.target.value)
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)

        // Извлекаем параметр GPA из URL и устанавливаем состояния
        const gpa = params.get('GPA')
        if (gpa) {
            const [max, userScore] = gpa.split(',')
            setMaxScore(max) // Восстанавливаем максимальный балл
            setScore(userScore) // Восстанавливаем введенный балл
        }
    }, [searchParams])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)

        // Обновляем GPA в URL, если выбраны оба значения
        if (maxScore && score) {
            params.set('GPA', `${maxScore},${score}`)
        } else {
            params.delete('GPA') // Удаляем параметр, если нет значения
        }

        // Обновляем URL с новыми параметрами
        window.history.replaceState(null, '', '?' + params.toString())
    }, [maxScore, score])

    return (
        <div className="mb-4">
            <label className="block mb-2 font-medium">
                Выберите максимальный балл
            </label>
            <select
                value={maxScore}
                onChange={handleMaxScoreChange}
                className="border rounded-lg px-4 py-2 w-full"
            >
                <option value="1.0">1.0</option>
                <option value="2.0">2.0</option>
                <option value="3.0">3.0</option>
                <option value="4.0">4.0</option>
                <option value="5.0">5.0</option>
            </select>

            <div className="mt-4">
                <label htmlFor="score" className="block mb-2 font-medium">
                    Введите ваш средний балл ({maxScore})
                </label>
                <input
                    type="number"
                    id="score"
                    value={score}
                    onChange={handleScoreChange}
                    className="border rounded-lg px-4 py-2 w-full"
                    placeholder={`Введите балл (макс. ${maxScore})`}
                />
            </div>
        </div>
    )
}

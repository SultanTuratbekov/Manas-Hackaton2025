'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const ExamSelection = () => {
    const searchParams = useSearchParams()

    const [examType, setExamType] = useState('none') // 'none', 'gmat', 'gre'
    const [score, setScore] = useState('')

    // ✅ Инициализируем состояние из URL при загрузке
    useEffect(() => {
        const examFromUrl = searchParams.get('exam')
        const gmatScore = searchParams.get('gmat')
        const greScore = searchParams.get('gre')

        if (examFromUrl === 'none') {
            setExamType('none')
            setScore('')
        } else if (gmatScore) {
            setExamType('gmat')
            setScore(gmatScore)
        } else if (greScore) {
            setExamType('gre')
            setScore(greScore)
        }
    }, [searchParams])

    const handleExamChange = (e) => {
        setExamType(e.target.value)
        setScore('') // Сброс балла при смене экзамена
    }

    const handleScoreChange = (e) => {
        setScore(e.target.value)
    }

    // ✅ Обновляем URL только после ввода балла
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())

        params.delete('exam')
        params.delete('gmat')
        params.delete('gre')

        if (examType === 'none') {
            params.set('exam', 'none')
        } else if (score) {
            params.set(examType, score)
        }

        window.history.replaceState(null, '', `?${params.toString()}`)
    }, [examType, score])

    return (
        <div className="mb-4">
            <label className="block mb-2 font-medium">Выберите экзамен</label>
            <div className="flex items-center gap-4">
                {['none', 'gmat', 'gre'].map((type) => (
                    <div className="flex items-center" key={type}>
                        <input
                            type="radio"
                            id={type}
                            name="exam_type"
                            value={type}
                            checked={examType === type}
                            onChange={handleExamChange}
                            className="mr-2 cursor-pointer"
                        />
                        <label htmlFor={type}>
                            {type === 'none'
                                ? 'Без экзамена'
                                : type.toUpperCase()}
                        </label>
                    </div>
                ))}
            </div>

            {examType !== 'none' && (
                <div className="mt-4">
                    <label htmlFor="score" className="block mb-2 font-medium">
                        Введите балл {examType.toUpperCase()}
                    </label>
                    <input
                        type="number"
                        id="score"
                        value={score}
                        onChange={handleScoreChange}
                        placeholder={`Введите балл ${examType.toUpperCase()}`}
                        className="border rounded-lg px-4 py-2 w-full"
                    />
                </div>
            )}
        </div>
    )
}

export default ExamSelection

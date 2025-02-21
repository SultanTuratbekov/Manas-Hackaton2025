import React, { useState } from 'react'

export const AverageScore = () => {
    const [maxScore, setMaxScore] = useState('1.0') // Значение по умолчанию - ACTS с максимальным баллом 4.0
    const [score, setScore] = useState('') // Средний балл

    const handleMaxScoreChange = (e) => {
        setMaxScore(e.target.value)
        setScore('') // Сбросить введенный балл при смене максимального значения
    }

    const handleScoreChange = (e) => {
        setScore(e.target.value)
    }

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
                <option value="4.0">1.0</option>
                <option value="5.0">2.0</option>
                <option value="10.0">3.0</option>
                <option value="10.0">4.0</option>
                <option value="10.0">5.0</option>
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

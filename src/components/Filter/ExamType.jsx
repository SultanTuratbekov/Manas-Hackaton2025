import React, { useState } from 'react'

const ExamSelection = () => {
    const [examType, setExamType] = useState('none') // значения: 'none', 'gmat', 'gre'

    const handleExamChange = (e) => {
        setExamType(e.target.value)
    }

    return (
        <div className="mb-4">
            <label className="block mb-2 font-medium">Выберите экзамен</label>
            <div className="flex items-center gap-4">
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="none"
                        name="exam_type"
                        value="none"
                        checked={examType === 'none'}
                        onChange={handleExamChange}
                        className="mr-2 cursor-pointer"
                    />
                    <label htmlFor="none">Без экзамена</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="gmat"
                        name="exam_type"
                        value="gmat"
                        checked={examType === 'gmat'}
                        onChange={handleExamChange}
                        className="mr-2 cursor-pointer"
                    />
                    <label htmlFor="gmat">GMAT</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="gre"
                        name="exam_type"
                        value="gre"
                        checked={examType === 'gre'}
                        onChange={handleExamChange}
                        className="mr-2 cursor-pointer"
                    />
                    <label htmlFor="gre">GRE</label>
                </div>
            </div>

            {examType !== 'none' && (
                <div className="mt-4">
                    <label htmlFor="score" className="block mb-2 font-medium">
                        Введите балл экзамена
                    </label>
                    <input
                        type="number"
                        id="score"
                        placeholder={`Введите балл ${examType.toUpperCase()}`}
                        className="border rounded-lg px-4 py-2 w-full"
                    />
                </div>
            )}
        </div>
    )
}

export default ExamSelection

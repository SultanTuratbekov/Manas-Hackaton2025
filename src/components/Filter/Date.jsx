'use client'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const Date = () => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const handleStartDateChange = (date) => {
        setStartDate(date)
    }

    const handleEndDateChange = (date) => {
        setEndDate(date)
    }

    return (
        <div className="flex items-center justify-between gap-4">
            <div className={'text-center'}>
                <label className="block text-sm font-medium">
                    Дата начала поступления
                </label>
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="dd/MM/yyyy"
                    className="w-full border rounded-lg px-4 py-2 mt-2"
                    placeholderText="Выберите дату начала"
                />
            </div>

            <div className={'text-center'}>
                <label className="block text-sm font-medium">
                    Дата конца поступления
                </label>
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="dd/MM/yyyy"
                    className="w-full border rounded-lg px-4 py-2 mt-2"
                    placeholderText="Выберите дату конца"
                    minDate={startDate} // Чтобы дата конца не была раньше даты начала
                />
            </div>
        </div>
    )
}

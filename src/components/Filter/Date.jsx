'use client'
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useSearchParams } from 'next/navigation'

export const DateFilter = () => {
    // Изменено с Date на DateFilter
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const searchParams = useSearchParams()

    const handleStartDateChange = (date) => {
        setStartDate(date)
    }

    const handleEndDateChange = (date) => {
        setEndDate(date)
    }

    // Update the URL with the selected start and end dates
    useEffect(() => {
        const url = new URL(window.location)
        const params = new URLSearchParams(url.search)

        // Get start and end dates from the URL and set them in state
        const startParam = params.get('start')
        const endParam = params.get('end')

        if (startParam) {
            setStartDate(
                new window.Date(startParam.split('/').reverse().join('-'))
            ) // Convert dd/MM/yyyy to Date
        }

        if (endParam) {
            setEndDate(new window.Date(endParam.split('/').reverse().join('-'))) // Convert dd/MM/yyyy to Date
        }
    }, [])

    useEffect(() => {
        const url = new URL(window.location)
        const params = new URLSearchParams(url.search)

        if (startDate) {
            params.set('start', startDate.toLocaleDateString('en-GB')) // Format date as dd/MM/yyyy
        } else {
            params.delete('start')
        }

        if (endDate) {
            params.set('end', endDate.toLocaleDateString('en-GB')) // Format date as dd/MM/yyyy
        } else {
            params.delete('end')
        }

        window.history.pushState({}, '', `${url.pathname}?${params.toString()}`)
    }, [startDate, endDate])

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

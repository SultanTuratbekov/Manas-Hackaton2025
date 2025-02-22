'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const ApplicationType = () => {
    const [isUniAssist, setIsUniAssist] = useState(false)
    const [uniAssistId, setUniAssistId] = useState('')
    const searchParams = useSearchParams()

    const handleUniAssistChange = (e) => {
        setIsUniAssist(e.target.checked)
        if (!e.target.checked) {
            setUniAssistId('') // Reset Uni Assist ID if unchecked
        }
    }

    const handleUniAssistIdChange = (e) => {
        setUniAssistId(e.target.value)
    }

    // Set initial values based on URL parameters
    useEffect(() => {
        const url = new URL(window.location)
        const params = new URLSearchParams(url.search)

        const uniAssistParam = params.get('uni_assist')
        if (uniAssistParam === 'true') {
            setIsUniAssist(true)
        } else {
            setIsUniAssist(false)
        }

        const uniAssistIdParam = params.get('uni_assist_id')
        if (uniAssistIdParam) {
            setUniAssistId(uniAssistIdParam)
        }
    }, [searchParams])

    // Update URL with uni-assist parameter
    useEffect(() => {
        const url = new URL(window.location)
        const params = new URLSearchParams(url.search)

        // Add or remove the 'uni-assist' parameter based on the selection
        if (isUniAssist) {
            params.set('uni_assist', 'true')
        } else {
            params.set('uni_assist', 'false')
        }

        // Also update the 'uni-assist-id' if Uni-Assist is selected and has an ID
        if (isUniAssist && uniAssistId) {
            params.set('uni_assist_id', uniAssistId)
        } else {
            params.delete('uni_assist_id') // Remove the ID if not needed
        }

        window.history.pushState({}, '', `${url.pathname}?${params.toString()}`)
    }, [isUniAssist, uniAssistId])

    return (
        <div className="mb-4">
            <label className="block mb-2 font-medium">Тип подачи заявки</label>
            <div className="gap-4">
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="direct"
                        name="application_type"
                        value="direct"
                        checked={!isUniAssist}
                        onChange={() => setIsUniAssist(false)}
                        className="mr-2"
                    />
                    <label htmlFor="direct">Прямая подача</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="uni-assist"
                        name="application_type"
                        value="uni-assist"
                        checked={isUniAssist}
                        onChange={handleUniAssistChange}
                        className="mr-2"
                    />
                    <label htmlFor="uni-assist">Подача через Uni-Assist</label>
                </div>
            </div>

            {isUniAssist && (
                <div className="mt-4">
                    <label
                        htmlFor="uniAssistId"
                        className="block mb-2 font-medium"
                    >
                        ID Uni-Assist
                    </label>
                    <input
                        type="text"
                        id="uniAssistId"
                        value={uniAssistId}
                        onChange={handleUniAssistIdChange}
                        placeholder="Введите ID Uni-Assist"
                        className="border rounded-lg px-4 py-2 w-full"
                    />
                </div>
            )}
        </div>
    )
}

export default ApplicationType

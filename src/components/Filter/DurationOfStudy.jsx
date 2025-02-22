'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const durationOptions = [
    '1 неделя',
    '2 недели',
    '1 месяц',
    '3 месяца',
    '6 месяцев',
    '1 год',
    '2 года',
    '3 года',
    '4 года',
]

const DurationSlider = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const initialDur = searchParams.get('dur')?.split('-').map(Number) || [1, 9]
    const [duration, setDuration] = useState(initialDur)

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('dur', `${duration[0]}-${duration[1]}`)
        router.push(`?${params.toString()}`, { scroll: false })
    }, [duration, router, searchParams])

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), duration[1] - 1)
        setDuration([value, duration[1]])
    }

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), duration[0] + 1)
        setDuration([duration[0], value])
    }

    return (
        <div className="relative mb-4">
            <label className="block mb-2 font-medium">Период обучения</label>
            <div className="flex justify-between gap-5">
                <div>
                    <label className="block text-sm">Минимум</label>
                    <select
                        value={duration[0]}
                        onChange={handleMinChange}
                        className="border rounded px-3 py-2"
                    >
                        {durationOptions.map((option, index) => (
                            <option key={index} value={index + 1}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={''}>
                    <label className="block text-sm">Максимум</label>
                    <select
                        value={duration[1]}
                        onChange={handleMaxChange}
                        className="border rounded px-3 py-2"
                    >
                        {durationOptions.map((option, index) => (
                            <option key={index} value={index + 1}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex justify-between text-sm mt-5">
                <span>{durationOptions[duration[0] - 1]}</span>
                <span>{durationOptions[duration[1] - 1]}</span>
            </div>
        </div>
    )
}

export default DurationSlider

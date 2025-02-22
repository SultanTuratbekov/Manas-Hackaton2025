'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Slider from 'react-slider'

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

    return (
        <div className="relative mb-4">
            <label className="block mb-2 font-medium">Период обучения</label>
            <Slider
                className="slider"
                value={duration}
                onChange={setDuration}
                min={1}
                max={9}
                step={1}
                renderTrack={(props) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            backgroundColor: 'gray',
                            height: '6px',
                            borderRadius: '4px',
                        }}
                    />
                )}
                renderThumb={(props) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            backgroundColor: '#1D4ED8',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            top: '50%',
                            transform: 'translateY(-40%)',
                        }}
                    />
                )}
            />
            <div className="flex justify-between text-sm mt-5">
                <span>{durationOptions[duration[0] - 1]}</span>
                <span>{durationOptions[duration[1] - 1]}</span>
            </div>
        </div>
    )
}

export default DurationSlider

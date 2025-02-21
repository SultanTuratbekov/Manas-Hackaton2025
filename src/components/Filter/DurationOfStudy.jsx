import React, { useEffect, useState } from 'react'
import Slider from 'react-slider'

const DurationSlider = () => {
    const [duration, setDuration] = useState([1, 48]) // Значения по умолчанию: 1

    const formatDuration = (value) => {
        if (value < 12) {
            return `${value} мес`
        } else {
            const years = Math.floor(value / 12)
            const months = value % 12
            return months === 0
                ? `${years} год`
                : years === 1
                  ? `${years} год ${months} мес`
                  : `${years} года ${months} мес`
        }
    }

    return (
        <div className="relative mb-4">
            <label className="block mb-2 font-medium">Период обучения</label>
            <Slider
                className="slider"
                value={duration}
                onChange={setDuration}
                min={1} // минимальный месяц
                max={48} // максимальный 4 года (48 месяцев)
                step={1}
                renderTrack={(props, state) => (
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
                renderThumb={(props, state) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            backgroundColor: '#1D4ED8',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            top: '50%', // Поднятие круга
                            transform: 'translateY(-40%)', // Центрирует круг по вертикали
                        }}
                    />
                )}
            />
            <div className="flex justify-between text-sm mt-5">
                <span>{formatDuration(duration[0])}</span>
                <span>{formatDuration(duration[1])}</span>
            </div>
        </div>
    )
}

export default DurationSlider

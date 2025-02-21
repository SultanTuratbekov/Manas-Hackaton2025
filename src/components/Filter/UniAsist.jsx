import React, { useState } from 'react'

const ApplicationType = () => {
    const [isUniAssist, setIsUniAssist] = useState(false)
    const [uniAssistId, setUniAssistId] = useState('')

    const handleUniAssistChange = (e) => {
        setIsUniAssist(e.target.checked)
        if (!e.target.checked) {
            setUniAssistId('') // Reset Uni Assist ID if unchecked
        }
    }

    const handleUniAssistIdChange = (e) => {
        setUniAssistId(e.target.value)
    }

    return (
        <div className="mb-4">
            <label className="block mb-2 font-medium">Тип подачи заявки</label>
            <div className=" gap-4">
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

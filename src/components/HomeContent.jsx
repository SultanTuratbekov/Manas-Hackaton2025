'use client'
import Filters from '@/components/Filter/Filters'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { api } from '@/service/axios'
import UniversitiesList from '@/components/UniversitiesList'

export const HomeContent = () => {
    const searchParams = useSearchParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [limit, setLimit] = useState(25)

    const fetchData = async (query) => {
        try {
            setLoading(true)
            const response = await api.get(`search?limit=${limit}&${query}`)
            if (response?.data) {
                setData(response.data)
                console.log('response:', response.data)
            } else {
                setData([])
                console.log('No data')
            }
        } catch (error) {
            console.error('Error fetching data:', error)
            setData([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        console.log('All query parameters:', params.toString())
        fetchData(params.toString())
    }, [searchParams, limit])

    return (
        <div className="flex gap-10 items-start justify-between">
            <Filters />
            <div className="w-3/4">
                <div className="bg-white rounded-[7px] p-4">
                    <h2 className="text-4xl font-semibold">Каталог</h2>
                    <div className="flex gap-3 items-center text-lg">
                        <span>Количество найденных ВУЗов:</span>
                        <span>{data.length}</span>
                    </div>
                </div>
                <div>
                    {loading ? (
                        <p className="text-center py-10">Загрузка...</p>
                    ) : data.length > 0 ? (
                        <UniversitiesList data={data} />
                    ) : (
                        <p className="text-center py-10">Нет результатов</p>
                    )}
                </div>
            </div>
        </div>
    )
}

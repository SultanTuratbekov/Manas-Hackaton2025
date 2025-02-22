'use client'
import Filters from '@/components/Filter/Filters'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { api } from '@/service/axios'
import UniversitiesList from '@/components/UniversitiesList'
import { Search } from 'lucide-react'
import { gpt } from '@/service/gpt'

export const HomeContent = () => {
    const searchParams = useSearchParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [limit, setLimit] = useState(25)

    const [searchText, setSearchText] = useState('')

    const handleText = (e) => {
        setSearchText(e.target.value)
    }

    const handleSend = async () => {
        setLoading(true)
        const response = await gpt.post('gpt/', { text: searchText })
        if (response) {
            setLoading(false)
            console.log('res: ', response?.data)
            setData(response?.data)
        } else {
            console.log('error')
            setLoading(false)
        }
    }

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
                    <div className="relative flex gap-2 mb-5">
                        <input
                            type="text"
                            value={searchText}
                            onChange={handleText}
                            className="w-full px-3 pr-10 py-1 border rounded-[6px] focus:border-red-300 focus:outline-red-300"
                            placeholder="умный поиск"
                        />
                        <Search className="absolute right-[85px] top-1/2 -translate-y-1/2 text-slate-600" />
                        <button
                            onClick={handleSend}
                            className={
                                'bg-foreground rounded-[4px] px-2 py-0.5 text-white font-medium md:hover:bg-inherit md:hover:outline-[2px] md:hover:outline outline-foreground duration-500 md:hover:text-gray-800'
                            }
                        >
                            Поиск
                        </button>
                    </div>
                    <div className="flex gap-5 items-center justify-between">
                        <h2 className="text-4xl font-semibold">Каталог</h2>
                        <div className="flex gap-3 items-center text-lg">
                            <span>Количество найденных ВУЗов:</span>
                            <span>{data.length || 0}</span>
                        </div>
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

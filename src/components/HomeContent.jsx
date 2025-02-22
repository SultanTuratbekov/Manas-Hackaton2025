'use client'
import Filters from '@/components/Filter/Filters'
import { universityList } from '@/data/universityList'
import UniversitiesList from '@/components/UniversitiesList'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { api } from '@/service/axios'

export const HomeContent = () => {
    const searchParams = useSearchParams()
    const [data, setData] = useState([])

    const fetchData = async () => {
        const response = await api.get(`search?limit=10`)
        if (response) {
            console.log('response: ', response)
        } else {
            console.log('No data')
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        console.log('All query parameters:', params.toString())
        fetchData()
    }, [searchParams])
    return (
        <div className={'flex gap-10 items-start justify-betweens'}>
            <Filters />
            <div className={'w-3/4'}>
                <div className={'bg-white rounded-[7px] p-4'}>
                    <div>
                        <h2 className={'text-4xl font-semibold'}>Каталог</h2>
                    </div>
                    <div className="flex gap-3 items-center text-lg">
                        <span className={''}>
                            Количество найденных ВУЗов :{' '}
                        </span>
                        <span>{universityList.length}</span>
                    </div>
                </div>
                <div>
                    <UniversitiesList data={universityList} />
                </div>
            </div>
        </div>
    )
}

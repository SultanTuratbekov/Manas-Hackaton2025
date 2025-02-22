'use client'

import React from 'react'
import { Filter, GraduationCap, MapPin, RotateCcw } from 'lucide-react'
import { CourceType } from '@/components/Filter/CourceType'
import { FieldOfStudy } from '@/components/Filter/FieldOfStudy'
import { CourseLanguage } from '@/components/Filter/CourseLanguage'
import { MetodOfStudy } from '@/components/Filter/MetodOfStudy'
import DurationOfStudy from '@/components/Filter/DurationOfStudy'
import { City } from '@/components/Filter/City'
import { StudyPrice } from '@/components/Filter/StudyPrice'
import { Begining } from '@/components/Filter/Begining'
import { LanguageDegrees } from '@/components/Filter/LanguageDegrees'
import { DateFilter } from '@/components/Filter/Date'
import UniAsist from '@/components/Filter/UniAsist'
import ExamType from '@/components/Filter/ExamType'
import { AverageScore } from '@/components/Filter/AverageScore'
import { usePathname, useRouter } from 'next/navigation'

const Filters = () => {
    const router = useRouter()
    const pathname = usePathname()
    const handleReset = () => {
        router.push(pathname)
    }
    return (
        <div className="w-1/4 bg-white p-4 rounded-[4px]">
            <div>
                <h1 className="my-2 flex justify-items-start gap-3 items-center text-2xl">
                    <span className={'font-semibold'}>Фильтры</span>
                    <Filter />
                    <RotateCcw
                        onClick={handleReset}
                        className={'ml-auto cursor-pointer'}
                    />
                </h1>

                <div className={'space-y-5'}>
                    <CourceType />
                    <FieldOfStudy />
                    <CourseLanguage />
                    <MetodOfStudy />
                    <DurationOfStudy />
                    <div className={'flex items-center gap-4'}>
                        <MapPin />
                        Локация
                    </div>
                    <City />

                    <div className={'flex items-center gap-4'}>
                        <GraduationCap />
                        Специфические типы обучения
                    </div>
                    <StudyPrice />
                    <Begining />
                    <LanguageDegrees />
                    <DateFilter />
                    <UniAsist />
                    <ExamType />
                    <AverageScore />
                </div>
            </div>
        </div>
    )
}

export default Filters

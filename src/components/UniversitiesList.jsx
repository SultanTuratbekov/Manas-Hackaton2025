'use client'
import React from 'react'
import { HeartOff } from 'lucide-react'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useRouter } from 'next/navigation'

const formatDate = (dateStr, formatStr = 'd MMMM') => {
    return dateStr ? format(new Date(dateStr), formatStr, { locale: enUS }) : ''
}

const UniversitiesList = ({ data }) => {
    const router = useRouter()
    return (
        <div>
            <div className="flex flex-col gap-6 my-6">
                {data?.map((item) => {
                    const startDate = formatDate(item.date[0]?.start)
                    const endDate = formatDate(item.date[0]?.end)
                    const endYear = formatDate(item.date[0]?.end, 'yyyy')
                    const registrationDeadline = formatDate(
                        item.date[0]?.registrationDeadline
                    )

                    return (
                        <div
                            key={item.id}
                            className="relative bg-white rounded-[8px] p-5 cursor-pointer outline-white hover:outline hover:outline-[10px] duration-300 group"
                            onClick={() =>
                                router.push(`https://www2.daad.de${item?.link}`)
                            }
                        >
                            <div className="text-xl font-semibold w-[90%] flex items-center flex-wrap">
                                <span className="group-hover:text-foreground duration-300">
                                    {item.courseName}
                                </span>
                                <span className="mx-3 font-black">•</span>
                                <span>{item.academy}</span>
                                <span className="mx-3 font-black">•</span>
                                <span>{item.city}</span>
                            </div>

                            <div className="flex items-start justify-between gap-5 mt-5">
                                <div className="w-1/5">
                                    <img
                                        src={`https://www2.daad.de${item.image}`}
                                        alt="university_image"
                                        className="aspect-[4/3] object-cover max-w-52 rounded-[7px]"
                                    />
                                </div>

                                <div className="ml-4 w-4/5 grid grid-cols-2 gap-5">
                                    <div className={'space-y-2'}>
                                        <h3 className="border-b inline font-semibold">
                                            Subject
                                        </h3>
                                        <p>{item.subject || 'N/A'}</p>
                                    </div>

                                    <div className={'space-y-2'}>
                                        <h3 className="border-b inline font-semibold">
                                            Language
                                        </h3>
                                        <p>
                                            {item.languages?.join(', ') ||
                                                'N/A'}
                                        </p>
                                    </div>

                                    <div className={'space-y-2'}>
                                        <h3 className="border-b inline font-semibold">
                                            Tuition Fee
                                        </h3>
                                        <p>
                                            {item?.date[0]?.costs
                                                ? `${item.date[0].costs} €`
                                                : 'N/A'}
                                        </p>
                                    </div>

                                    <div className={'space-y-2'}>
                                        <h3 className="border-b inline font-semibold">
                                            Language Levels
                                        </h3>
                                        <p className="flex gap-2 flex-wrap">
                                            {item?.languageLevelGerman?.length
                                                ? item.languageLevelGerman.map(
                                                      (level) => (
                                                          <span
                                                              key={level}
                                                              className="bg-gray-200 px-2 py-0.5 rounded"
                                                          >
                                                              {level}
                                                          </span>
                                                      )
                                                  )
                                                : 'N/A'}
                                        </p>
                                    </div>

                                    <div className="col-span-2">
                                        <h3 className="border-b inline font-semibold">
                                            Date(s)
                                        </h3>
                                        <p>
                                            {startDate && endDate
                                                ? `${startDate} - ${endDate}, ${endYear} (Registration Deadline ${registrationDeadline})`
                                                : 'Dates not available'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button className="absolute top-3 right-3 hover:bg-slate-300 duration-500 p-2 rounded-full">
                                <HeartOff />
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UniversitiesList

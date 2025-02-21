'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { HeartIcon, HeartOff } from 'lucide-react'

const UniversitiesList = ({ data }) => {
    const router = useRouter()

    const handleListClick = (id) => {
        router.push(`/home/${id}`)
    }

    const handleClickHeart = (event, id) => {
        event.stopPropagation()
        console.log(id)
    }

    return (
        <div>
            <div className="flex flex-col gap-6 my-6">
                {data?.map((item) => (
                    <div
                        key={item.id}
                        className="relative bg-white rounded-[8px] p-5 flex justify-between items-start cursor-pointer outline-white hover:outline hover:outline-[10px] duration-300 group"
                        onClick={() => handleListClick(item.id)}
                    >
                        <div className="w-1/5">
                            <img
                                src={item.image}
                                alt="university_image"
                                className="aspect-square max-w-52 rounded-[7px]"
                            />
                        </div>
                        <div className="w-1/2 space-y-3">
                            <h2 className="font-semibold text-3xl group-hover:text-foreground duration-300 hover:underline inline">
                                {item.title}
                            </h2>
                            <h5 className="font-normal text-lg">
                                {item.place}
                            </h5>
                        </div>
                        <div className="w-1/4 space-y-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-secondary">
                                    Программа
                                </span>
                                <span>{item.program}</span>
                            </div>
                            <div className="w-full h-[1px] bg-secondary"></div>
                            <div className="flex flex-col gap-2">
                                <span className="text-secondary">
                                    Стоимость за год
                                </span>
                                <span>{item.cost} &euro;</span>
                            </div>
                        </div>
                        <button
                            className={
                                'absolute top-3 right-3 hover:bg-slate-300 duration-500 p-2 rounded-full'
                            }
                            onClick={(event) =>
                                handleClickHeart(event, item.id)
                            }
                        >
                            <HeartOff />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UniversitiesList

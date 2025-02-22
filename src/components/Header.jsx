'use client' // ДОЛЖЕН быть на самой первой строке

import React, { useState } from 'react'
import { Heart, Search, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { gpt } from '@/service/gpt'

const Header = () => {
    const [searchText, setSearchText] = useState('')
    const router = useRouter()

    const handleText = (e) => {
        setSearchText(e.target.value)
    }

    const handleSend = async () => {
        const response = await gpt.post('gpt/', { text: searchText })
        if (response) {
            console.log('res: ', response)
        } else {
            console.log('error')
        }
    }

    return (
        <div className="w-full h-full">
            <div
                className="w-full h-full py-32 px-10"
                style={{
                    backgroundImage:
                        "url('https://www.studylab.ru/upload/SimplePage/image/1440/44716a443cba43f7c0e61735bb35f24c.jpg')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <div className="w-1/2 space-y-10">
                    <h1 className="w-1/2 text-white text-5xl font-medium">
                        Высшее образование за рубежом
                    </h1>
                    <h3 className="text-xl text-white">
                        Образовательные <br /> и кураторские услуги <br /> для
                        создания вашей личной истории успеха
                    </h3>
                </div>
            </div>
            <div className="bg-white rounded-[7px] mt-2 w-full flex items-center justify-between p-2">
                <div
                    onClick={() => router.push('/home')}
                    className="w-1/4 flex cursor-pointer gap-5 justify-start items-center"
                >
                    <div className="ml-5">
                        <img
                            src="/magisterGO.png"
                            alt="logo"
                            className="max-h-14"
                        />
                    </div>
                    <h1 className="text-2xl font-bold">magisterGO</h1>
                </div>

                <div className="w-1/2 pl-7">
                    {/*<div className="relative flex gap-2">*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        value={searchText}*/}
                    {/*        onChange={handleText}*/}
                    {/*        className="w-full px-3 pr-10 py-1 border rounded-[6px] focus:border-red-300 focus:outline-red-300"*/}
                    {/*        placeholder="умный поиск"*/}
                    {/*    />*/}
                    {/*    <Search className="absolute right-[85px] top-1/2 -translate-y-1/2 text-slate-600" />*/}
                    {/*    <button*/}
                    {/*        onClick={handleSend}*/}
                    {/*        className={*/}
                    {/*            'bg-foreground rounded-[4px] px-2 py-0.5 text-white font-medium md:hover:bg-inherit md:hover:outline-[2px] md:hover:outline outline-foreground duration-500 md:hover:text-gray-800'*/}
                    {/*        }*/}
                    {/*    >*/}
                    {/*        Поиск*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>

                <div className="w-1/4 flex gap-1 items-center justify-end">
                    <div
                        className="cursor-pointer duration-300 md:hover:bg-slate-200 rounded-full p-2"
                        onClick={() => router.push('/favorites')}
                    >
                        <Heart />
                    </div>
                    <div
                        className="cursor-pointer duration-300 md:hover:bg-slate-200 rounded-full p-2"
                        onClick={() => router.push('/login')}
                    >
                        <User />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header

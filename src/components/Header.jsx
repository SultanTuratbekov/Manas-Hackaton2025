'use client'
import React, { useState } from 'react'
import { Heart, Search, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { api } from '@/service/axios'

const Header = () => {
    const [searchText, setSearchText] = useState('')
    const router = useRouter()
    const handleText = (e) => {
        setSearchText(e.target.value)
    }
    const handletest = async () => {
        const res = await api.get(
            'deutschland/studienangebote/international-programmes/api/solr/en/search.json?cert=&admReq=&langExamPC=&scholarshipLC=&langExamLC=&scholarshipSC=&langExamSC=&degree%5B%5D=1&fos=3&langDeAvailable=&langEnAvailable=&fee=&sort=4&dur=&q=&limit=10&offset=&display=list&isElearning=&isSep= '
        )
        if (res) {
            console.log('res: ', res)
        } else {
            console.log('no res')
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
            <div
                className={
                    'bg-white rounded-[7px] mt-2 w-full flex items-center justify-between p-2'
                }
            >
                <div
                    onClick={() => router.push('/home')}
                    className={'w-1/4 flex gap-5 justify-start items-center'}
                >
                    <div className={'ml-5'}>
                        <img
                            src="/magisterGO.png"
                            alt="logo"
                            className={' max-h-14'}
                        />
                    </div>
                    <h1 className={'text-2xl font-bold'}>magisterGO</h1>
                </div>
                <div className={'w-1/2 pl-7'}>
                    <div className={'relative'}>
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className={
                                'w-full px-3 py-1 border rounded-[6px] focus:border-red-300 focus:outline-red-300'
                            }
                            placeholder={'умный поиск'}
                        />
                        <Search
                            className={
                                'absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 '
                            }
                        />
                    </div>
                    <button onClick={handletest}>Click</button>
                </div>
                <div className={'w-1/4 flex gap-1 items-center justify-end'}>
                    <div
                        className={
                            'cursor-pointer duration-300 md:hover:bg-slate-200 rounded-full p-2'
                        }
                    >
                        <Heart />
                    </div>
                    <div
                        className={
                            'cursor-pointer duration-300 md:hover:bg-slate-200 rounded-full p-2'
                        }
                        onClick={() => router.push('/auth/login')}
                    >
                        <User />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header

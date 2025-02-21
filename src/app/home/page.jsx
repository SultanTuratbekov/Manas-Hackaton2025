import UniversitiesList from '@/components/UniversitiesList'
import { universityList } from '@/data/universityList'
import Header from '@/components/Header'
import Filters from '@/components/Filter/Filters'

export default function Home() {
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
                    <div>
                        {/* <div>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Сортировать" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="apple">По возрастанию цены</SelectItem>
                                    <SelectItem value="banana">
                                        По убыванию цены
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div> */}
                    </div>
                </div>
                <div>
                    <UniversitiesList data={universityList} />
                </div>
            </div>
        </div>
    )
}

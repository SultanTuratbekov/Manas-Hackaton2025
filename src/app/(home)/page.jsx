import { HomeContent } from '@/components/HomeContent'
import { Suspense } from 'react'

export default function HomePage() {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <HomeContent />
        </Suspense>
    )
}

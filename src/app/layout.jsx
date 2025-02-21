import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Filters from '@/components/Filter/Filters'

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800', '900'],
    display: 'swap',
})

export const metadata = {
    title: 'Manas2025',
    description: 'Manas2025',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={cn('bg-background', montserrat.className)}>
                {children}
            </body>
        </html>
    )
}

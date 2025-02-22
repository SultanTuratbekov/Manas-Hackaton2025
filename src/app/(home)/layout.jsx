import Header from '@/components/Header'

export default function RootLayout({ children }) {
    return (
        <div className={' max-w-screen-2xl mx-auto px-5 space-y-5'}>
            <Header />
            {children}
        </div>
    )
}

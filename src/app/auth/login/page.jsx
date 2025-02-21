'use client'
import { useState } from 'react'
import { Eye, EyeOff, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surename, setSurename] = useState('')

    const router = useRouter()

    const showPass = () => {
        setShowPassword((prev) => !prev)
    }

    const handleLogin = (e) => {
        e.preventDefault() // предотвращает перезагрузку страницы
        console.log({ email, name, surename, password })
    }

    return (
        <div
            style={{
                backgroundImage: 'url(/1.webp)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
            className="w-full h-screen flex justify-center items-center"
        >
            <div className="w-1/4 bg-white rounded-[8px] p-10 text-center relative">
                <span
                    className={
                        'text-sm flex items-center gap-2 md:hover:text-foreground cursor-pointer duration-500 justify-items-start absolute top-3 left-3'
                    }
                    onClick={() => router.replace('/home')}
                >
                    <Home className={'size-4'} /> <span>на главную</span>
                </span>
                <h1 className="text-3xl font-semibold mb-6">Войти</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                        className="w-full px-3 py-1 text-lg rounded-[5px] border border-gray-500"
                        required
                    />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Имя"
                        className="w-full px-3 py-1 text-lg rounded-[5px] border border-gray-500"
                        required
                    />
                    <input
                        type="text"
                        value={surename}
                        onChange={(e) => setSurename(e.target.value)}
                        placeholder="Фамилия"
                        className="w-full px-3 py-1 text-lg rounded-[5px] border border-gray-500"
                        required
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Пароль"
                            className="w-full px-3 py-1 text-lg rounded-[5px] border border-gray-500"
                            required
                        />
                        <span
                            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                            onClick={showPass}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="p-2 bg-foreground rounded-[7px] md:hover:bg-inherit md:hover:outline-[2px] md:hover:outline outline-foreground text-white md:hover:text-gray-800 text-xl font-medium duration-500"
                    >
                        Войти
                    </button>
                </form>
                <span>
                    Нет аккаунта?{' '}
                    <button
                        onClick={() => router.push('/auth/register')}
                        className={
                            'mt-2 underline text-foreground md:hover:text-blue-400 duration-500'
                        }
                    >
                        Зарегистрироваться
                    </button>
                </span>
            </div>
        </div>
    )
}

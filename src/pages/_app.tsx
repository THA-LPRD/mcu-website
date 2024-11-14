import type { AppProps } from 'next/app'
import { Inter_Tight } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'

const inter_tight = Inter_Tight({
    subsets: ['latin'],
    display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={inter_tight.className}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Navbar />
                <main>
                    <Component {...pageProps} />
                </main>
            </ThemeProvider>
        </div>
    )
}

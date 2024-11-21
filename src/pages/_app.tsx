import type {AppProps} from 'next/app'
import {Inter_Tight} from 'next/font/google'
import {ThemeProvider} from '@/components/ThemeProvider'
import Navbar from '@/components/Navbar'
import {Spinner} from '@/components/ui/spinner'
import {useState, useEffect} from 'react'
import '@/styles/globals.css'

const inter_tight = Inter_Tight({
    subsets: ['latin'],
    display: 'swap',
})

export default function App({Component, pageProps}: AppProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkPageLoad = () => {
            if (document.readyState === 'complete') {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        };

        checkPageLoad();
        document.addEventListener('readystatechange', checkPageLoad);

        return () => {
            document.removeEventListener('readystatechange', checkPageLoad);
        };
    }, []);

    return (
        <div className={inter_tight.className}>
            {isLoading && (
                <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="text-center">
                        <Spinner size="large" show={true}>
                            <span className="mt-4 text-lg font-medium">Loading...</span>
                        </Spinner>
                    </div>
                </div>
            )}
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Navbar/>
                <main>
                    <Component {...pageProps} />
                </main>
            </ThemeProvider>
        </div>
    )
}
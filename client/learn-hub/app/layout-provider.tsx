'use client'
import { Footer } from '@/components/footer';
import Navbar from '@/components/navbar';
import { usePathname } from 'next/navigation';

export const LayoutProvider = ({ children } : {
    children: React.ReactNode
}) => {
    const pathname = usePathname();
    
    if (pathname.startsWith('/dashboard') === false) {
        return (
            <div className='flex flex-col min-h-screen'>
                <Navbar />
                    <main className="flex-1 bg-page-gradient pt-navigation-height">
                        {children}
                    </main>
                <Footer />
            </div>
        )
    }

    return (
        <>
            <main className="bg-page-gradient pt-navigation-height">
                {children}
            </main>
        </>
    )
};
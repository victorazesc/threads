
import { Inter } from "next/font/google"
import "../globals.css"
import Providers from "../../providers/Providers"
import { ThemeProvider } from "@/providers/ThemeProvider"
export const metadata = {
    title: 'threads',
    description: 'descrição'
}

const inter = Inter({
    subsets: ['latin']
})

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <Providers>
            <html lang="en">
                <body className={`${inter.className} bg-custom-backgrounds-primary`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className=" w-full flex relative flex-col justify-center items-center container mx-auto min-h-[100vh] top-0">
                            {children}
                        </div>
                    </ThemeProvider>
                </body>
            </html>
        </Providers>
    )
}
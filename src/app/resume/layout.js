import '@/app/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Randy Lee's Resume",
  description: 'Browse through the resume of Randy Lee, a software engineer based in Toronto, ON with years of experience in the industry',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

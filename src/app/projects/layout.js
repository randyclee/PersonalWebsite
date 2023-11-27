import '@/app/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Projects Page",
  description: 'Browse through a list of projects made by Randy Lee, a developer from Toronto, ON with specialties in coding from data engineering, to website making and more. Come check out my projects',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

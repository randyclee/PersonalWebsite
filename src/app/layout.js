import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Randy Lee - Software Engineer",
  description: 'Randy Lee is a software engineer based in Toronto, ON with a few years of experience in the industry. This website contains apps coded for you to have fun and also contains information about my achievements',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

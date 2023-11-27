import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { fetchBlog } from '@/services/api/blogsApi';

const inter = Inter({ subsets: ['latin'] })

import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata({params}) {
  const component_item = await fetchBlog(params.name).then((res) => res);

  return {
    title: component_item.title,
    description: component_item.summary,
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

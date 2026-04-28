import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif'
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'Ishan Singh Thakuri | Original Artworks',
  description: 'Discover unique original artworks by Ishan Singh Thakuri. Browse the collection of paintings and find your next masterpiece.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/image-solid-full.svg', 
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/image-solid-full.svg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/image-solid-full.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/image-solid-full.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${cormorant.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

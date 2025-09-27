import { type ReactNode } from 'react'
import './globals.css'
import { Providers } from '@/components/providers'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`min-h-screen bg-background font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

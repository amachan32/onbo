import { type ReactNode } from 'react'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`min-h-screen bg-background font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}

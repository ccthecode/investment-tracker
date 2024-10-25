import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Investment Tracker',
  description: 'Investment Tracker is a web application that allows users to calculate and track their investments, supporting both simple and compound interest calculations. The app provides a user-friendly interface for adding investments, selecting currencies, and viewing a list of tracked investments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

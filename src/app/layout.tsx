import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vegas888',
  description: 'vegas888ph',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className={inter.className + "background-image-container"} style={{
          backgroundImage: "url(/playgame-bg4.png) ", 
          height: '100vh', 
          backgroundSize: '100% 100%',
          backgroundPosition: '0 0',
          margin: 0, 
          backgroundColor: '#4d4d4d',
        }}>{children}</body>
      {/* <body className={inter.className}>{children}</body> */}
    </html>
  )
}

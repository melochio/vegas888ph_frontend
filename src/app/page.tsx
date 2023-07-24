import React from 'react'
import { Button } from '@mui/material'
import Header from '@pComp/header'
import Footer from '@/publicComponents/footer'

export default function Home() {
  return (
    <div>
      <Header />
      <div style={{minHeight: '70vh'}}>
        test
      </div>
      <Footer />
    </div>
  )
}
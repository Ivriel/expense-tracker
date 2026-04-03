'use client'

import { UserButton } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import GlobalDateFilter from './GlobalDateFilter'

export default function DashboardHeader() {
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const tanggal = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const jam = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  return (
    <header className='p-4 flex justify-between items-center'>
      <div className='flex items-center gap-3 text-sm text-muted-foreground'>
        <span className='font-medium'>{tanggal}</span>
        <span className='hidden sm:inline text-muted-foreground/40'>|</span>
        <span className='hidden sm:inline font-mono'>{jam}</span>
      </div>
      <div className='flex items-center gap-4'>
        <GlobalDateFilter />
        <UserButton />
      </div>
    </header>
  )
}
import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function DashboardHeader() {
  return (
    <header className='p-5 shadow-sm border-b flex justify-between'>
        <div>
            Search Bar
        </div>
       <div>
         <UserButton />
       </div>
    </header>
  )
}

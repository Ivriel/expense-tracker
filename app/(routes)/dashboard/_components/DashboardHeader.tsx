import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function DashboardHeader() {
  return (
    <header className='p-4 flex justify-between items-center'>
        <div>
            Search Bar
        </div>
       <div>
         <UserButton />
       </div>
    </header>
  )
}

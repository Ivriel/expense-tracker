"use client"
import { useState } from 'react'
import { BudgetWithStats } from '@/server/budget'
import { PiggyBank, Receipt, Wallet, Eye, EyeOff } from 'lucide-react'
import { Income } from '@/db/schema';

export default function CardInfoDashboard({ budgetList, loading, incomeList }: {
  budgetList: BudgetWithStats[];
  loading: boolean;
  incomeList:Income[]
}) {
  const [show, setShow] = useState(true)

  const totalBudget = budgetList.reduce((sum, b) => sum + Number(b.amount), 0)
  const totalSpend = budgetList.reduce((sum, b) => sum + Number(b.totalSpend ?? 0), 0)
  const totalIncome = incomeList.reduce((sum, i) => sum + Number(i.amount), 0)

  const display = (value: string) => show ? value : "Rp ••••••"

  return (
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>

      <div className='p-7 border rounded-lg flex items-center justify-between'>
        <div>
          <div className='flex items-center gap-2'>
            <h2 className='text-sm'>Total Budget</h2>
            <button onClick={() => setShow(!show)}>
              {show
                ? <Eye className='w-4 h-4 text-gray-400 cursor-pointer' />
                : <EyeOff className='w-4 h-4 text-gray-400 cursor-pointer' />
              }
            </button>
          </div>
          <h2 className='font-bold text-2xl'>
            {loading ? "..." : display(`Rp ${totalBudget.toLocaleString("id-ID")}`)}
          </h2>
        </div>
        <PiggyBank className='bg-purple-500 p-3 h-12 w-12 rounded-full text-white' />
      </div>

      <div className='p-7 border rounded-lg flex items-center justify-between'>
        <div>
          <div className='flex items-center gap-2'>
            <h2 className='text-sm'>Total Spend</h2>
            <button onClick={() => setShow(!show)}>
              {show
                ? <Eye className='w-4 h-4 text-gray-400 cursor-pointer' />
                : <EyeOff className='w-4 h-4 text-gray-400 cursor-pointer' />
              }
            </button>
          </div>
          <h2 className='font-bold text-2xl'>
            {loading ? "..." : display(`Rp ${totalSpend.toLocaleString("id-ID")}`)}
          </h2>
        </div>
        <Receipt className='bg-purple-500 p-3 h-12 w-12 rounded-full text-white' />
      </div>

      <div className='p-7 border rounded-lg flex items-center justify-between'>
        <div>
          <div className='flex items-center gap-2'>
            {/* ganti jadi total income */}
            <h2 className='text-sm'>Total Income</h2> 
            <button onClick={() => setShow(!show)}>
              {show
                ? <Eye className='w-4 h-4 text-gray-400 cursor-pointer' />
                : <EyeOff className='w-4 h-4 text-gray-400 cursor-pointer' />
              }
            </button>
          </div>
          <h2 className='font-bold text-2xl'>
            {loading ? "..." : show ? `Rp ${totalIncome.toLocaleString("id-ID")}` : "••"}
          </h2>
        </div>
        <Wallet className='bg-purple-500 p-3 h-12 w-12 rounded-full text-white' />
      </div>

    </div>
  )
}
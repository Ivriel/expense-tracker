import React from 'react'
import { BudgetWithStats } from '@/server/budget'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Format angka jadi lebih pendek, misal 20.000.000 → 20Jt
const formatRupiah = (value: number) => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}M`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}Jt`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}Rb`;
  return `${value}`;
};

export default function BarchartDashboard({ budgetList }: { budgetList: BudgetWithStats[] }) {
  return (
    <div className='w-full border rounded-lg p-5'>
      {/* Judul chart — taruh di luar ResponsiveContainer */}
      <h2 className="text-left text-lg font-bold mb-2 text-purple-700">
        Budget & Spend Visualisation
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={budgetList}
          margin={{ top: 5, right: 8, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatRupiah} />
          <Tooltip 
            formatter={(value) => `Rp ${Number(value).toLocaleString('id-ID')}`}
            labelFormatter={(label) => `Budget: ${label}`}
          />
          <Legend />
          {/* Tambah prop name= supaya muncul di tooltip */}
          <Bar dataKey="totalSpend" name="Total Spend" fill="#8884d8" />
          <Bar dataKey="amount" name="Amount" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
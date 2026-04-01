'use client';

import React, { useState, useEffect, useRef } from 'react'
import { BudgetWithStats } from '@/server/budget'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend
} from 'recharts';

// Format angka jadi lebih pendek, misal 20.000.000 → 20Jt
const formatRupiah = (value: number) => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}M`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}Jt`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}Rb`;
  return `${value}`;
};

const CHART_HEIGHT = 300;

export default function BarchartDashboard({ budgetList }: { budgetList: BudgetWithStats[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Ukur width awal
    const rect = el.getBoundingClientRect();
    if (rect.width > 0) setChartWidth(rect.width);

    let debounceTimer: ReturnType<typeof setTimeout>;

    // ResizeObserver dengan debounce 300ms
    // Sidebar transition = 200ms, jadi chart TIDAK re-render selama animasi
    // Baru update width setelah animasi selesai
    const observer = new ResizeObserver((entries) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        for (const entry of entries) {
          const w = entry.contentRect.width;
          if (w > 0) setChartWidth(w);
        }
      }, 300);
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(debounceTimer);
    };
  }, []);

  return (
    <div className='w-full border rounded-lg p-5'>
      {/* Judul chart — taruh di luar container chart */}
      <h2 className="text-left text-lg font-bold mb-2 text-purple-700">
        Budget & Spend Visualisation
      </h2>
      <div ref={containerRef} style={{ width: '100%', height: CHART_HEIGHT }}>
        {chartWidth > 0 && (
          <BarChart
            width={chartWidth}
            height={CHART_HEIGHT}
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
        )}
      </div>
    </div>
  )
}
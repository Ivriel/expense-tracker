"use client";

import React, { useEffect } from 'react';
import { useFilterStore } from '@/store/useFilterStore';

export default function GlobalDateFilter() {
  const { timeRange, month, year, setTimeRange, setMonthYear } = useFilterStore();

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as any;
    if (value === 'specific_month') {
        // default to current month/year if choosing specific
        setMonthYear(new Date().getMonth() + 1, new Date().getFullYear());
    } else {
        setTimeRange(value);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonthYear(parseInt(e.target.value), year);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonthYear(month, parseInt(e.target.value));
  };

  return (
    <div className="flex items-center space-x-2 md:space-x-4">
      <select 
        value={timeRange} 
        onChange={handleRangeChange}
        className="p-2 text-sm border rounded-md bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
      >
        <option value="all">All Time</option>
        <option value="this_month">This Month</option>
        <option value="this_year">This Year</option>
        <option value="specific_month">Specific Month</option>
      </select>

      {timeRange === 'specific_month' && (
        <div className="flex items-center space-x-2">
            <select 
                value={month} 
                onChange={handleMonthChange}
                className="p-2 text-sm border rounded-md bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
                {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i+1} value={i+1}>
                        {new Date(0, i).toLocaleString('default', { month: 'long' })}
                    </option>
                ))}
            </select>
            <select 
                value={year} 
                onChange={handleYearChange}
                className="p-2 text-sm border rounded-md bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
                {Array.from({ length: 5 }).map((_, i) => {
                    const y = new Date().getFullYear() - i;
                    return <option key={y} value={y}>{y}</option>;
                })}
            </select>
        </div>
      )}
    </div>
  );
}

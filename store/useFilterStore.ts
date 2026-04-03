import { create } from 'zustand';

export type TimeRangeType = 'this_month' | 'this_year' | 'specific_month' | 'all';

interface FilterState {
    timeRange: TimeRangeType;
    month: number;
    year: number;
    setTimeRange: (range: TimeRangeType) => void;
    setMonthYear: (month: number, year: number) => void;
    getFilterParams: () => { month?: number, year?: number, type: TimeRangeType };
}

export const useFilterStore = create<FilterState>((set, get) => ({
    timeRange: 'all',
    month: new Date().getMonth() + 1, // 1-12
    year: new Date().getFullYear(),
    
    setTimeRange: (range) => set({ timeRange: range }),
    setMonthYear: (month, year) => set({ month, year, timeRange: 'specific_month' }),
    
    getFilterParams: () => {
        const state = get();
        return {
            month: state.month,
            year: state.year,
            type: state.timeRange
        };
    }
}));

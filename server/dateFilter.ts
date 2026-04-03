import { and, gte, lte } from 'drizzle-orm';
import { TimeRangeType } from '@/store/useFilterStore';

export const buildDateFilter = (
    params: { month?: number; year?: number; type: TimeRangeType } | undefined,
    dateColumn: any
) => {
    if (!params || params.type === 'all') return undefined;

    let startDate: Date, endDate: Date;
    const now = new Date();

    if (params.type === 'this_year') {
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
    } else {
        // this_month or specific_month
        const m = params.month ? params.month - 1 : now.getMonth();
        const y = params.year || now.getFullYear();
        startDate = new Date(y, m, 1);
        endDate = new Date(y, m + 1, 0, 23, 59, 59, 999);
    }

    return and(gte(dateColumn, startDate), lte(dateColumn, endDate));
};

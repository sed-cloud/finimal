
export type TimeRangeEnum = 'week' | 'month' | 'year' | 'all time' | 'none'

function weekAgo() {
    const date = new Date()
    const week = date.getDate() - 7
    date.setDate(week)
    return date
}

function monthAgo() {
    const date = new Date()
    const month = date.getMonth() - 1
    date.setMonth(month)
    return date
}

function yearAgo() {
    const date = new Date()
    const year = date.getFullYear() - 1
    date.setFullYear(year)
    return date
}

function allTime() {
    const date = new Date()
    const year = date.getFullYear() - 2
    date.setFullYear(year)
    return date
}

export const TimeRange: { [key in TimeRangeEnum]: Date } = {
    week: weekAgo(),
    month: monthAgo(),
    year: yearAgo(),
    'all time': allTime(),
    none: allTime(),
}
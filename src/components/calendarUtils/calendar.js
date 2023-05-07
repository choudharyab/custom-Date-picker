import { dayjs } from './date-utils'
import { getCalendarPage } from './calendar-page.js'

function buildDaySelectionValidator (start, end, selectableCallback) {
  return date => {
    const isInRange = date.isSameOrAfter(start, 'day') && date.isSameOrBefore(end, 'day')
    return {
      isInRange,
      selectable: isInRange && (!selectableCallback || selectableCallback(date.toDate())),
      isToday: date.isSame(dayjs(), 'day')
    }
  }
}

function getMonths (config) {
  const { start, end, selectableCallback } = config
  const startCalendarDay = new Date(1970, 0, 1)
  const endCalendarDay = new Date(2100, 11, 31)

  const months = []
  const validator = buildDaySelectionValidator(start, end, selectableCallback)
  let date = dayjs(startCalendarDay)
  const lastMonth = dayjs(endCalendarDay)
  while (date.isSameOrBefore(lastMonth)) {
    months.push(getCalendarPage(date, validator))
    date = date.add(1, 'month')
  }
  return months
}

export {
  getMonths
}

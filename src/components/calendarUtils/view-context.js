'use strict'

import DateView from '../view/date-view/DateView.svelte'
import { derived } from 'svelte/store'

function createMonthView (months, displayedDate) {
  return derived([ displayedDate ], ([ $displayedDate ]) => {
    let monthIndex = 0

    const month = $displayedDate.month()
    const year = $displayedDate.year()
    for (let i = 0; i < months.length; i += 1) {
      if (months[i].month === month && months[i].year === year) {
        monthIndex = i
      }
    }

    return {
      monthIndex,
      visibleMonth: months[monthIndex]
    }
  })
}

function createViewContext (isStart, mainContext) {
  const { months, leftCalendarDate, rightCalendarDate, selectedStartDate, selectedEndDate } = mainContext
  const [ date, displayedDate ] = isStart ? [ selectedStartDate, leftCalendarDate ] : [ selectedEndDate, rightCalendarDate ]

  return {
    isStart,
    date,
    view: DateView,
    displayedDate,
    monthView: createMonthView(months, displayedDate)
  }
}

export {
  createViewContext
}

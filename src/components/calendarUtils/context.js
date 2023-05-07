import { writable, derived } from 'svelte/store'
import { getMonths } from './calendar.js'
import { sanitizeInitialValue } from './sanitization.js'
import { dayjs } from './date-utils.js'
import { ensureFutureMonth } from './date-manipulation.js'

const contextKey = {}
function createFormatter (selectedStartDate, selectedEndDate, config) {
  const formatter = derived([ selectedStartDate, selectedEndDate ], ([ $selectedStartDate, $selectedEndDate ]) => {
    const formattedSelected = $selectedStartDate && $selectedStartDate.format(config.format)
    const formattedSelectedEnd = config.isRangePicker && $selectedEndDate && $selectedEndDate.format(config.format)

    return {
      formattedSelected,
      formattedSelectedEnd,
      formattedCombined: config.isRangePicker ? `${formattedSelected} - ${formattedSelectedEnd}` : formattedSelected
    }
  })

  return { formatter }
}

function setup (given, config) {
  const today = dayjs().startOf('day')

  const { isDateChosen, chosen: [ preSelectedStart, preSelectedEnd ] } = sanitizeInitialValue(given, config)
  const selectedStartDate = writable(preSelectedStart)
  const selectedEndDate = writable(preSelectedEnd)
  const { formatter } = createFormatter(selectedStartDate, selectedEndDate, config)
  const component = writable('date-view')

  const leftDate = preSelectedStart.subtract(
    config.isRangePicker && preSelectedStart.isSame(config.end, 'month') ? 1 : 0, 'month'
  ).startOf('month')
  const rightDate = config.isRangePicker ? ensureFutureMonth(leftDate, preSelectedEnd).startOf('month') : null

  return {
    months: getMonths(config),
    component,
    today,
    selectedStartDate,
    selectedEndDate,
    leftCalendarDate: writable(leftDate),
    rightCalendarDate: writable(rightDate),
    config,
    shouldShakeDate: writable(false),
    isOpen: writable(false),
    isClosing: writable(false),
    highlighted: writable(today),
    formatter,
    isDateChosen: writable(isDateChosen),
    resetView: () => {
      component.set('date-view')
    },
    isSelectingFirstDate: writable(true)
  }
}

export {
  contextKey,
  setup
}

'use strict'

class CalendarStyle {
  constructor (overrides = {}) {
    this.style = ''
    this.buttonBackgroundColor = '#fff'
    this.buttonBorderColor = '#eee'
    this.buttonTextColor = '#333'
    this.buttonWidth = '300px'
    this.highlightColor = '#e40046'
    this.passiveHighlightColor = '#ffe4ec'

    this.dayHighlightedBackgroundColor = '#ffe4ec'
    this.dayHighlightedTextColor = '#4a4a4a'

    this.currentDayTextColor = '#000'
    this.selectedDayTextColor = 'white'

    this.toolbarBorderColor = '#eeeeee'

    this.contentBackground = 'white'

    this.monthYearTextColor = '#3d4548'
    this.legendTextColor = '#4a4a4a'

    this.datepickerWidth = 'auto'

    this.modalButtonBackgroundColor = "#333333";
    this.modalButtonTextColor = "#ffffff";

    Object.entries(overrides).forEach(([ prop, value ]) => {
      this[prop] = value
    })
  }

  toWrapperStyle () {
    return `
      --button-background-color: ${this.buttonBackgroundColor};
      --button-border-color: ${this.buttonBorderColor};
      --button-text-color: ${this.buttonTextColor};
      --button-width: ${this.buttonWidth};
      --highlight-color: ${this.highlightColor};
      --passive-highlight-color: ${this.passiveHighlightColor};

      --day-highlighted-background-color: ${this.dayHighlightedBackgroundColor};
      --day-highlighted-text-color: ${this.dayHighlightedTextColor};

      --current-day-text-color: ${this.currentDayTextColor};
      --selected-day-text-color: ${this.selectedDayTextColor};

      
      
      --toolbar-border-color: ${this.toolbarBorderColor};

      --content-background: ${this.contentBackground};

      --month-year-text-color: ${this.monthYearTextColor};
      --legend-text-color: ${this.legendTextColor};
      --datepicker-width: ${this.datepickerWidth};
      --modal-background-button-color :${this.modalButtonBackgroundColor};
      --modal-button-text-color : ${this.modalButtonTextColor};

      ${this.style}
    `
  }
}

export {
  CalendarStyle
}

import moment from 'moment-jalaali';

/**
 * Persian Date Utilities
 * مجموعه ابزارهای کار با تاریخ شمسی
 */

// Persian month names
export const PERSIAN_MONTHS = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

// Persian week day names
export const PERSIAN_WEEK_DAYS = [
    'شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'
];

// Persian week day short names
export const PERSIAN_WEEK_DAYS_SHORT = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

/**
 * Format Persian date to readable string
 * @param {string|moment} date - Date to format
 * @param {string} format - Format string (default: 'jYYYY/jMM/jDD')
 * @returns {string} Formatted date string
 */
export const formatPersianDate = (date, format = 'jYYYY/jMM/jDD') => {
    if (!date) return '';
    
    const momentDate = moment(date, 'jYYYY/jMM/jDD');
    if (!momentDate.isValid()) return '';
    
    return momentDate.format(format);
};

/**
 * Format Persian date to readable Persian text
 * @param {string|moment} date - Date to format
 * @returns {string} Formatted date in Persian
 */
export const formatPersianDateToText = (date) => {
    if (!date) return '';
    
    const momentDate = moment(date, 'jYYYY/jMM/jDD');
    if (!momentDate.isValid()) return '';
    
    const year = momentDate.jYear();
    const month = PERSIAN_MONTHS[momentDate.jMonth()];
    const day = momentDate.jDate();
    const weekDay = PERSIAN_WEEK_DAYS[momentDate.day()];
    
    return `${weekDay}، ${day} ${month} ${year}`;
};

/**
 * Validate Persian date string
 * @param {string} dateString - Date string to validate
 * @returns {boolean} True if valid
 */
export const isValidPersianDate = (dateString) => {
    if (!dateString) return false;
    
    const momentDate = moment(dateString, 'jYYYY/jMM/jDD');
    return momentDate.isValid();
};

/**
 * Get today's date in Persian format
 * @returns {string} Today's date in jYYYY/jMM/jDD format
 */
export const getTodayPersian = () => {
    return moment().format('jYYYY/jMM/jDD');
};

/**
 * Add days to a Persian date
 * @param {string} dateString - Base date
 * @param {number} days - Number of days to add
 * @returns {string} New date in jYYYY/jMM/jDD format
 */
export const addDaysToPersianDate = (dateString, days) => {
    const momentDate = moment(dateString, 'jYYYY/jMM/jDD');
    if (!momentDate.isValid()) return '';
    
    return momentDate.add(days, 'days').format('jYYYY/jMM/jDD');
};

/**
 * Subtract days from a Persian date
 * @param {string} dateString - Base date
 * @param {number} days - Number of days to subtract
 * @returns {string} New date in jYYYY/jMM/jDD format
 */
export const subtractDaysFromPersianDate = (dateString, days) => {
    const momentDate = moment(dateString, 'jYYYY/jMM/jDD');
    if (!momentDate.isValid()) return '';
    
    return momentDate.subtract(days, 'days').format('jYYYY/jMM/jDD');
};

/**
 * Convert Gregorian date to Persian
 * @param {string|Date} gregorianDate - Gregorian date
 * @returns {string} Persian date in jYYYY/jMM/jDD format
 */
export const gregorianToPersian = (gregorianDate) => {
    const momentDate = moment(gregorianDate);
    if (!momentDate.isValid()) return '';
    
    return momentDate.format('jYYYY/jMM/jDD');
};

/**
 * Convert Persian date to Gregorian
 * @param {string} persianDate - Persian date in jYYYY/jMM/jDD format
 * @returns {string} Gregorian date in YYYY-MM-DD format
 */
export const persianToGregorian = (persianDate) => {
    const momentDate = moment(persianDate, 'jYYYY/jMM/jDD');
    if (!momentDate.isValid()) return '';
    
    return momentDate.format('YYYY-MM-DD');
};

/**
 * Get Persian date range (start and end of month)
 * @param {string} dateString - Date in the month to get range for
 * @returns {object} Object with start and end dates
 */
export const getPersianMonthRange = (dateString) => {
    const momentDate = moment(dateString, 'jYYYY/jMM/jDD');
    if (!momentDate.isValid()) return { start: '', end: '' };
    
    const startOfMonth = momentDate.clone().startOf('jMonth');
    const endOfMonth = momentDate.clone().endOf('jMonth');
    
    return {
        start: startOfMonth.format('jYYYY/jMM/jDD'),
        end: endOfMonth.format('jYYYY/jMM/jDD')
    };
};

/**
 * Get Persian date range (start and end of year)
 * @param {string} dateString - Date in the year to get range for
 * @returns {object} Object with start and end dates
 */
export const getPersianYearRange = (dateString) => {
    const momentDate = moment(dateString, 'jYYYY/jMM/jDD');
    if (!momentDate.isValid()) return { start: '', end: '' };
    
    const startOfYear = momentDate.clone().startOf('jYear');
    const endOfYear = momentDate.clone().endOf('jYear');
    
    return {
        start: startOfYear.format('jYYYY/jMM/jDD'),
        end: endOfYear.format('jYYYY/jMM/jDD')
    };
};

/**
 * Compare two Persian dates
 * @param {string} date1 - First date
 * @param {string} date2 - Second date
 * @returns {number} -1 if date1 < date2, 0 if equal, 1 if date1 > date2
 */
export const comparePersianDates = (date1, date2) => {
    const momentDate1 = moment(date1, 'jYYYY/jMM/jDD');
    const momentDate2 = moment(date2, 'jYYYY/jMM/jDD');
    
    if (!momentDate1.isValid() || !momentDate2.isValid()) return 0;
    
    if (momentDate1.isBefore(momentDate2)) return -1;
    if (momentDate1.isAfter(momentDate2)) return 1;
    return 0;
};

/**
 * Get age from Persian birth date
 * @param {string} birthDate - Birth date in jYYYY/jMM/jDD format
 * @returns {number} Age in years
 */
export const getAgeFromPersianDate = (birthDate) => {
    const birthMoment = moment(birthDate, 'jYYYY/jMM/jDD');
    const now = moment();
    
    if (!birthMoment.isValid()) return 0;
    
    return now.diff(birthMoment, 'years');
};

export default {
    PERSIAN_MONTHS,
    PERSIAN_WEEK_DAYS,
    PERSIAN_WEEK_DAYS_SHORT,
    formatPersianDate,
    formatPersianDateToText,
    isValidPersianDate,
    getTodayPersian,
    addDaysToPersianDate,
    subtractDaysFromPersianDate,
    gregorianToPersian,
    persianToGregorian,
    getPersianMonthRange,
    getPersianYearRange,
    comparePersianDates,
    getAgeFromPersianDate
};

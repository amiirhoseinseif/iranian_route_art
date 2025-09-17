import { useState, useRef, useEffect } from 'react';
import moment from 'moment-jalaali';

// Calendar Icon Component
const CalendarIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

// Chevron Icon Component
const ChevronIcon = ({ direction = "left", className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {direction === "left" ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        )}
    </svg>
);

const PersianDatePicker = ({ 
    value = null, 
    onChange = () => {}, 
    placeholder = "انتخاب تاریخ",
    className = "",
    disabled = false,
    name = "",
    ...props 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value ? moment(value, 'jYYYY/jMM/jDD') : null);
    const [currentMonth, setCurrentMonth] = useState(selectedDate || moment());
    const dropdownRef = useRef(null);

    const persianMonths = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];

    const persianWeekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const generateCalendarDays = () => {
        const startOfMonth = currentMonth.clone().startOf('jMonth');
        const endOfMonth = currentMonth.clone().endOf('jMonth');
        const startDate = startOfMonth.clone().subtract(startOfMonth.day(), 'days');
        const endDate = endOfMonth.clone().add(6 - endOfMonth.day(), 'days');
        
        const days = [];
        let current = startDate.clone();

        while (current.isSameOrBefore(endDate, 'day')) {
            days.push(current.clone());
            current.add(1, 'day');
        }

        return days;
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        onChange(date.format('jYYYY/jMM/jDD'));
        setIsOpen(false);
    };

    const navigateMonth = (direction) => {
        setCurrentMonth(prev => prev.clone().add(direction, 'jMonth'));
    };

    const handleMonthChange = (monthIndex) => {
        setCurrentMonth(prev => prev.clone().jMonth(monthIndex));
    };

    const handleYearChange = (year) => {
        setCurrentMonth(prev => prev.clone().jYear(year));
    };

    const generateYearOptions = () => {
        const currentYear = moment().jYear();
        const years = [];
        for (let year = currentYear - 50; year <= currentYear + 10; year++) {
            years.push(year);
        }
        return years;
    };

    const goToToday = () => {
        const today = moment();
        setCurrentMonth(today);
        setSelectedDate(today);
        onChange(today.format('jYYYY/jMM/jDD'));
        setIsOpen(false);
    };

    const formatDisplayValue = () => {
        if (selectedDate) {
            return selectedDate.format('jYYYY/jMM/jDD');
        }
        return '';
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Input Field */}
            <div className="relative">
                <input
                    type="text"
                    value={formatDisplayValue()}
                    placeholder={placeholder}
                    readOnly
                    disabled={disabled}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    className={`
                        w-full px-4 py-3 pr-12 text-right text-sm font-medium
                        bg-white border-2 border-gray-200 rounded-xl
                        transition-all duration-200 ease-in-out
                        focus:ring-4 focus:ring-blue-100 focus:border-blue-500
                        hover:border-gray-300 hover:shadow-sm
                        disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
                        ${isOpen ? 'border-blue-500 ring-4 ring-blue-100' : ''}
                        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                        ${selectedDate ? 'text-gray-900' : 'text-gray-500'}
                    `}
                    {...props}
                />
                
                {/* Calendar Icon */}
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <CalendarIcon className={`w-5 h-5 transition-colors duration-200 ${
                        isOpen ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                </div>

                {/* Clear Button */}
                {selectedDate && !disabled && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDate(null);
                            onChange('');
                        }}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Calendar Dropdown */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden animate-slide-in-from-top sm:w-80">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-100">
                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => navigateMonth(-1)}
                                className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 group"
                            >
                                <ChevronIcon direction="left" className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                            </button>
                            
                            <button
                                onClick={() => navigateMonth(1)}
                                className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 group"
                            >
                                <ChevronIcon direction="right" className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                            </button>
                        </div>
                        
                        {/* Month and Year Selectors */}
                        <div className="flex items-center justify-center space-x-3 space-x-reverse">
                            <select
                                value={currentMonth.jMonth()}
                                onChange={(e) => handleMonthChange(parseInt(e.target.value))}
                                className="px-3 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            >
                                {persianMonths.map((month, index) => (
                                    <option key={index} value={index}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                            
                            <select
                                value={currentMonth.jYear()}
                                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                                className="px-3 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            >
                                {generateYearOptions().map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Week Days Header */}
                    <div className="grid grid-cols-7 gap-1 p-3 bg-gray-50">
                        {persianWeekDays.map((day, index) => (
                            <div key={index} className="text-center text-xs font-semibold text-gray-600 py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 p-2 sm:p-3">
                        {generateCalendarDays().map((day, index) => {
                            const isCurrentMonth = day.jMonth() === currentMonth.jMonth();
                            const isSelected = selectedDate && day.isSame(selectedDate, 'day');
                            const isToday = day.isSame(moment(), 'day');

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleDateSelect(day)}
                                    className={`
                                        w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200
                                        ${!isCurrentMonth 
                                            ? 'text-gray-300 cursor-not-allowed' 
                                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer'
                                        }
                                        ${isSelected 
                                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:from-blue-600 hover:to-indigo-600' 
                                            : ''
                                        }
                                        ${isToday && !isSelected 
                                            ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300 hover:bg-yellow-200' 
                                            : ''
                                        }
                                        ${!isCurrentMonth ? 'hover:bg-transparent' : ''}
                                    `}
                                    disabled={!isCurrentMonth}
                                >
                                    {day.jDate()}
                                </button>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 border-t border-gray-100">
                        <button
                            onClick={goToToday}
                            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
                        >
                            امروز
                        </button>
                        
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-all duration-200"
                        >
                            بستن
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersianDatePicker;

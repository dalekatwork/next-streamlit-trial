"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DateRangePickerProps {
  onRangeChange: (range: { from: Date; to: Date }) => void;
}

export default function DateRangePicker({
  onRangeChange,
}: DateRangePickerProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [tempRange, setTempRange] = useState<DateRange | undefined>(
    selectedRange,
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (range: DateRange | undefined) => {
    setTempRange(range);
  };

  const handleApply = () => {
    if (tempRange?.from && tempRange?.to) {
      setSelectedRange(tempRange);
      // Ensure we pass a valid range object with non-null from/to dates
      onRangeChange({
        from: tempRange.from,
        to: tempRange.to,
      });
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setTempRange(selectedRange);
    setIsOpen(false);
  };

  const formatDateRange = (range: DateRange) => {
    if (!range.from || !range.to) return "";
    return `${format(range.from, "MMM dd, yyyy")} - ${format(range.to, "MMM dd, yyyy")}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
      >
        <span>{formatDateRange(selectedRange)}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 rounded-lg shadow-lg z-50 bg-gray-900">
          <DayPicker
            mode="range"
            defaultMonth={selectedRange.from}
            selected={tempRange}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={{ after: new Date() }}
            modifiers={{
              highlighted: new Date(),
            }}
            showOutsideDays={false}
          />
          <div className="p-4 border-t border-gray-700 flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={!tempRange?.from || !tempRange?.to}
              className={`px-4 py-2 rounded transition-colors ${
                !tempRange?.from || !tempRange?.to
                  ? "bg-blue-600/50 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

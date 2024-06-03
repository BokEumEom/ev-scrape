// src/components/ev_registration/DateRegionPicker.tsx
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addYears, subYears } from 'date-fns';
import PropTypes from 'prop-types';

interface DateRegionPickerProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
  handleFetchData: () => void;
  regions: string[];
}

const DateRegionPicker: React.FC<DateRegionPickerProps> = ({
  selectedDate,
  setSelectedDate,
  selectedRegion,
  setSelectedRegion,
  handleFetchData,
  regions,
}) => {
  return (
    <form className="mb-4 flex flex-col md:flex-row gap-4">
      <div className="flex-grow">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
          Select Year and Month
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
          dateFormat="yyyy-MM"
          showMonthYearPicker
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          minDate={subYears(new Date(), 10)}
          maxDate={addYears(new Date(), 1)}
        />
      </div>
      <div className="flex-grow">
        <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
          Select Region
        </label>
        <select
          id="region"
          name="region"
          value={selectedRegion || ''}
          onChange={(e) => setSelectedRegion(e.target.value || null)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={handleFetchData}
        className="self-end py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:self-auto"
      >
        Search
      </button>
    </form>
  );
};

DateRegionPicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  setSelectedDate: PropTypes.func.isRequired,
  selectedRegion: PropTypes.string,
  setSelectedRegion: PropTypes.func.isRequired,
  handleFetchData: PropTypes.func.isRequired,
  regions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default DateRegionPicker;

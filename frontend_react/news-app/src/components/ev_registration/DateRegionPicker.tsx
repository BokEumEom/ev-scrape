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
    <form>
      <div className="mb-2 flex md:flex-row gap-1"> {/* [J]0604 수정 */}
        <div className="basis-2/4">
          <label htmlFor="date" className="block text-xs font-xs text-gray-500 mb-1"> {/* [J]0604 수정 */}
            Select Year and Month
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            dateFormat="yyyy-MM"
            showMonthYearPicker
            className="mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            minDate={subYears(new Date(), 10)}
            maxDate={addYears(new Date(), 1)}
          />
        </div>
        <div className="basis-2/4">
          <label htmlFor="region" className="block text-sm text-xs text-gray-500 mb-1"> {/* [J]0604 수정 */}
            Select Region
          </label>
          <select
            id="region"
            name="region"
            value={selectedRegion || ''}
            onChange={(e) => setSelectedRegion(e.target.value || null)}
            className="mt-1 h-[42px] w-full px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

    
      </div>
      <div className="flex">
        <button
          type="button"
          onClick={handleFetchData}
          className="w-full h-[42px] text-cneter border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:self-auto"
        >
        SEARCH
        </button>
      </div>
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

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react"; // optional calendar icon

interface InputProps {
  label: string;
  size: "sm" | "md";
}

const sizeClass = {
  sm: "w-[343px] h-[52px]",
  md: "w-[399px] h-[59px]",
};

export const DateInput = ({ label, size }: InputProps) => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className="relative">
      <DatePicker
        selected={date}
        onChange={(d) => setDate(d)}
        dateFormat="dd MMMM yyyy" // 30 August 2025
        placeholderText="Select your date"
        className={`peer ${sizeClass[size]} p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
      <label className="absolute left-3 top-2.5 text-gray-400 peer-focus:text-blue-500 bg-white px-1">
        {label}
      </label>
    </div>
  );
};

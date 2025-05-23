import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

interface FilterDropdownProps {
  label: string;
  options: string[];
  badge?: string | number;
  selected?: string;
  onSelect: (value: string) => void;
}

export function FilterDropdown({
  label,
  options,
  selected,
  onSelect,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 shadow-sm rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span className="text-gray-700 text-sm sm:text-[16px]">{label}</span>
        <IoChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-40 sm:w-48 bg-white border rounded-lg shadow-lg">
          <div className="py-2">
            {options.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className={`text-sm sm:text-[15px] w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                  selected === option
                    ? "text-blue-600 bg-blue-50 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

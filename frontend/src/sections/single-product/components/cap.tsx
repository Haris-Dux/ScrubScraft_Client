import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";

export default function CapForm({
  setCap,
}: {
  setCap: (value: boolean) => void;
}) {
  const [selectedOption, setSelectedOption] = useState(false);
  const { pricing } = useAppSelector((state) => state.orders);

  const handleOptionChange = (value: boolean) => {
    setSelectedOption(value);
    setCap(value);
  };

  return (
    <div className="max-w-xl space-y-4">
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-1">
          <span className="text-gray-900">
            Do you want a Matching Surgical Cap?
          </span>
          <span className="text-red-500">*</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="cap-yes"
              name="cap"
              value="yes"
              checked={selectedOption === true}
              onChange={() => handleOptionChange(true)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="cap-yes" className="text-gray-900">
              Yes (+ Rs.{pricing[2]?.amount} PKR)
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="cap-no"
              name="cap"
              value="no"
              checked={selectedOption === false}
              onChange={() => handleOptionChange(false)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="cap-no" className="text-gray-900">
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
